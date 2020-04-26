import * as React from "react";
import Box from '@material-ui/core/Box';
import NewsPage from './news-page';
import {ThemeProvider, withStyles} from "@material-ui/core/styles";
import loading from '../assets/loading.gif';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

interface News {
    author?: string,
    title?: string,
    description?: string,
    url?: string,
    urlToImage?: string,
    publishedAt: string,
    content?: string
}

interface IProps {
    classes?: any,
    selectArticle?: any,
    theme?: any,
    themeType?: any,
    fontSize: string,
    pageSize: number,
    mobile: boolean
}

interface IState {
    news: Array<News>,
    page: number,
    scrolled: boolean,
    error?: string,
    fromDate?: any,
    toDate?: any
}

class NewsList extends React.Component<IProps, IState> {
    isScrolled: any;
    fromDate: any;
    fromDateVar: any;
    toDate: any;
    toDateVar: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            news: [],
            page: 1,
            scrolled: true,
            error: ''
        };
        this.fromDateVar = '';
        this.toDateVar = '';
    }


    onScrollList() {
        console.log(document.documentElement.scrollHeight, document.documentElement.scrollTop);
        const scrollBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight < 300;

        if (scrollBottom && this.state.error === '') {
            this.setState({page: this.state.page + 1});
            this.componentDidMount();
        }
    }

    fetchNews() {
        fetch("https://newsapi.org/v2/everything?q=playstation&page=" + this.state.page + this.fromDateVar + this.toDateVar + "&pageSize=" + this.props.pageSize + "&apiKey=a2d1c38fd9b240d0a16e7c50d4d63b2d")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.articles) {
                        this.setState({
                            news: this.state.news.concat(result.articles),
                            scrolled: result.articles.length === this.props.pageSize,
                            error: ''
                        });
                    } else {
                        let errMsg = result.code === 'maximumResultsReached' ? 'Достигнут конец списка' : result.message;
                        this.setState({
                            error: errMsg
                        });
                    }
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            );
    }

    componentDidMount() {
        this.fetchNews();
        window.addEventListener('scroll', () => {
            window.clearTimeout(this.isScrolled);
            this.isScrolled = setTimeout(() => {
                this.onScrollList()
            }, 200);
        });
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (prevProps.pageSize !== this.props.pageSize) {
            this.setState({
                page: 1,
                news: []
            });
            this.fetchNews();
        }
    }


    render() {
        const {classes} = this.props;

        const changeFromDate = (date: Date | null) => {
            let dateStr = date ? "&from=" + date.toISOString() : "";
            console.log(dateStr);
            this.fromDateVar = dateStr;
            this.fromDate = date;
            this.setState({news: []});
            this.componentDidMount();
        };
        const changeToDate = (date: Date | null) => {
            let dateStr = date ? "&to=" + date.toISOString() : "";
            console.log(dateStr);
            this.toDateVar = dateStr;
            this.toDate = date;
            this.setState({news: []});
            this.componentDidMount();
        };

        return (
            <ThemeProvider theme={this.props?.theme}>
                <CssBaseline/>
                <Box bgcolor="paper" color="text.primary" className={classes.wrapper}>
                    <div className={classes.header}
                         style={{backgroundColor: this.props?.themeType === 'light' ? '#d3d5d6' : '#4e4244', padding: '0 10px', top: this.props?.mobile ? 56 : 0}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Box style={{marginRight: 10}}>От</Box><KeyboardDatePicker format="dd-MM-yyyy"
                                                                                       value={this.fromDate}
                                                                                       onChange={changeFromDate}/>
                            <Box style={{margin: '0 10px'}}>До</Box> <KeyboardDatePicker format="dd-MM-yyyy"
                                                                                         value={this.toDate}
                                                                                         onChange={changeToDate}/>
                        </MuiPickersUtilsProvider>
                    </div>
                    {this.state?.news?.map((article) => (
                        <NewsPage mode="list" article={article} mobile={this.props?.mobile}
                                  theme={this.props?.theme} selectArticle={() => {this.props.selectArticle(article)}}/>
                    ))}
                    {((this.state?.scrolled || this.state.news.length === 0) && this.state.error === '') &&
                    <div className={classes.bottomWrapper}><img className={classes.loading} src={loading}
                                                                alt="loading"/></div>
                    }
                    {this.state?.error !== '' &&
                    <div className={classes.bottomWrapper + ' ' + classes.message}>{this.state?.error}</div>
                    }
                </Box>
            </ThemeProvider>
        );
    }
}

export default withStyles(
    {
        header: {
            position: 'sticky',
            top: 0,
            height: 50,
            width: '100%',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'inherit',
            marginBottom: 30
        },
        bottomWrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 60
        },
        message: {
            fontSize: '1.7em',
            color: 'gray'
        },
        loading: {
            width: 120,
            height: 120,
        },
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
        }
    }
)(NewsList);
