import React from 'react';
import './App.css';
import NewsList from './components/news-list';
import NewsPage from './components/news-page';
import About from './components/about';
import Help from './components/help';
import {
    BrowserRouter as Router,
    Switch as SwitchRouter,
    Route,
    Link
} from "react-router-dom";
import { withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {Drawer} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';

let darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            paper: '#1b1d1f'
        },
        common: {
            black: '#1b1d1f',
            white: '#f6f6f6'
        },
    },
});

let lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            paper: '#f6f6f6'
        },
        common: {
            black: '#1b1d1f',
            white: '#f6f6f6'
        },
    },
});




interface IProps {
    classes?: any;
}

interface IState {
    current?: any,
    status?: string,
    settingsOpen?: boolean,
    fontSize: string,
    pageSize: number,
    lightTheme?: any,
    drawer: boolean,
    mobile: boolean
}

class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            status: 'empty',
            settingsOpen: false,
            lightTheme: true,
            fontSize: '16px',
            pageSize: 10,
            drawer: true,
            mobile: false
        };
    }

    selectArticle = (article: any) => {
        this.setState({current: article, status: 'filled'});
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.mobile) {
            this.setState({mobile: currentHideNav, drawer: false});
        }
    }

    render() {
        const {classes} = this.props;

        return (

            <Router>
                <ThemeProvider theme={this.state.lightTheme ? lightTheme : darkTheme}>
                    <CssBaseline />
                    {this.state.mobile &&
                    <ThemeProvider theme={this.state.lightTheme ? lightTheme : darkTheme}>
                        <AppBar position="fixed" color="default" style={{backgroundColor: this.state.lightTheme ? '#f6f6f6' : '#3a091b'}}>
                            <Toolbar style={{height: 'fit-content'}}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => {this.setState({drawer: !this.state.drawer})}}
                                    edge="start"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </ThemeProvider>
                    }
                    <Box color="text.disabled" style={{display: 'flex', minHeight: '100vh'}}>

                        <ThemeProvider theme={this.state.lightTheme ? lightTheme : darkTheme}>
                        <Drawer
                            color="text.disabled"
                            className={classes.drawer}
                            style={{width: this.state.mobile ? 'auto' : 280}}
                            variant={this.state.mobile ? "persistent" : "permanent"}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            open={this.state.drawer}
                            >
                            <List>
                                {this.state.mobile &&
                                <IconButton
                                    style={{marginLeft: 185}}
                                    color="inherit"
                                    aria-label="close drawer"
                                    onClick={() => {this.setState({drawer: !this.state.drawer})}}
                                    edge="start"
                                >
                                    <CloseIcon/>
                                </IconButton>
                                }
                                <Link className={classes.link} to="/" onClick={() => {this.setState({drawer: false})}}>
                                    <ListItem button key={'Главная'}>
                                        <ListItemText classes={{primary: classes.primary}} primary={'Главная'}/>
                                    </ListItem>
                                </Link>
                                <ListItem button key={'Настройки'} onClick={() => {
                                    this.setState({settingsOpen: !this.state.settingsOpen})
                                }}>
                                    <ListItemText className={classes.link} classes={{primary: classes.primary}}
                                                  primary={'Настройки'}/>
                                    {this.state.settingsOpen ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={this.state.settingsOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem>
                                            <FormControl className={classes.formControl} color="secondary">
                                                <ThemeProvider theme={this.state.lightTheme ? lightTheme : darkTheme}>
                                                    <InputLabel  classes={{root: classes.root}} id="demo-simple-select-label">Размер шрифта</InputLabel>
                                                    <Select  classes={{root: classes.root}}
                                                        labelId="font-size-select-label"
                                                        id="font-size-select"
                                                        value={this.state.fontSize}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            this.setState({fontSize: event.target.value as string});
                                                            document.documentElement.style.setProperty('font-size', event.target.value as string);
                                                        }}
                                                    >
                                                        <MenuItem value={'12px'}>Мелкий</MenuItem>
                                                        <MenuItem value={'16px'}>Средний</MenuItem>
                                                        <MenuItem value={'20px'}>Большой</MenuItem>
                                                    </Select>
                                                </ThemeProvider>
                                            </FormControl>
                                        </ListItem>
                                        <ListItem>
                                            <FormControl className={classes.formControl}>
                                                <ThemeProvider theme={this.state.lightTheme ? lightTheme : darkTheme}>
                                                    <InputLabel  classes={{root: classes.root}} id="page-size-select-label">Количество
                                                        новостей</InputLabel>
                                                    <Select   classes={{root: classes.root}}
                                                            color="primary"
                                                        labelId="page-size-select-label"
                                                        id="page-size-select"
                                                        value={this.state.pageSize}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            this.setState({pageSize: event.target.value as number})
                                                        }}
                                                    >
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={20}>20</MenuItem>
                                                        <MenuItem value={30}>30</MenuItem>
                                                        <MenuItem value={40}>40</MenuItem>
                                                    </Select>
                                                </ThemeProvider>
                                            </FormControl>
                                        </ListItem>
                                        <ListItem>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.lightTheme}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            this.setState({lightTheme: event.target.checked})
                                                        }}
                                                        name="theme"
                                                        color="secondary"
                                                    />
                                                }
                                                label={this.state.lightTheme ? 'Светлая тема' : 'Темная тема'}
                                            />
                                        </ListItem>
                                    </List>
                                </Collapse>
                                <Link className={classes.link} to="/help" onClick={() => {this.setState({drawer: false})}}>
                                    <ListItem button key={'Помощь'}>
                                        <ListItemText classes={{primary: classes.primary}} primary={'Помощь'}/>
                                    </ListItem>
                                </Link>
                                <Link className={classes.link} to="/about" onClick={() => {this.setState({drawer: false})}}>
                                    <ListItem button key={'О нас'}>
                                        <ListItemText classes={{primary: classes.primary}} primary={'О нас'}/>
                                    </ListItem>
                                </Link>
                            </List>
                        </Drawer>
                        </ThemeProvider>
                        <Box style={{marginTop: this.state.mobile ? 50 : 0, width: this.state.mobile ?  '100vw' : 'calc(100vw - 280px)' }}>
                            <SwitchRouter>
                                <Route path="/help">
                                    <Help theme={this.state.lightTheme ? lightTheme : darkTheme}/>
                                </Route>
                                <Route path="/about">
                                    <About theme={this.state.lightTheme ? lightTheme : darkTheme}/>
                                </Route>
                                <Route path="/article">
                                    {this.state.status === 'filled' &&
                                    <NewsPage mode="full" article={this.state.current} mobile={this.state.mobile}
                                              theme={this.state.lightTheme ? lightTheme : darkTheme}/>
                                    }
                                </Route>
                                <Route path="/">
                                    <NewsList mobile={this.state.mobile} fontSize={this.state.fontSize}
                                              theme={this.state.lightTheme ? lightTheme : darkTheme}
                                              themeType={this.state.lightTheme ? 'light' : 'dark'}
                                              pageSize={this.state.pageSize}
                                              selectArticle={this.selectArticle}/>
                                </Route>
                            </SwitchRouter>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Router>

        );
    }

}

export default withStyles({
    formControl: {
        minWidth: 210
    },
    drawer: {
        height: '100vh',
        flexShrink: 0,
    },
    drawerPaper: {
        width: 280,
        padding: 20,
    },
    root: {
        color: 'inherit !important'
    },
    primary: {
        letterSpacing: '0.06em',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
})(App);
