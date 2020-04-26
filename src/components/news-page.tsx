import * as React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {CardMedia, ThemeProvider} from '@material-ui/core';
import { Container } from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {isMobile} from 'react-device-detect';
import noImage from '../assets/noImage.png'
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card/Card";

interface IProps {
    article: any,
    theme: any,
    classes: any,
    mobile: boolean,
    mode: string,
    selectArticle?: any,
}

interface IState {
    gallery: boolean
}
class NewsPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            gallery: false
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={this.props?.theme}>
                <CssBaseline />
                {this.props.mode === 'full' &&
                    <Box bgcolor="paper" color="text.primary" className={classes.wrapper} >
                        <Container className={classes.photo}>
                            <CardMedia style={{width: this.props.mobile ? 150 : 300, height: this.props.mobile ? 150 : 300, minWidth: this.props.mobile ? 150 : 300}}
                                       className={classes.media}
                                       image={this.props?.article?.urlToImage ? this.props.article.urlToImage : noImage}
                                       onClick={() => {this.setState({gallery: true})}}
                            />
                        </Container>
                        <Container maxWidth="md">
                            <Typography variant="h4" component="h4" align="center">{this.props?.article?.title}</Typography>
                            <Typography variant="body2" component="p" className={classes.description}>{this.props?.article?.content}</Typography>
                        </Container>
                        {this.state.gallery &&
                        <Container style={{ height: isMobile ? 'calc(100vh - 56px)' : '100vh',
                            top: isMobile ? '56px' : 0,
                            left: isMobile ? 0 : 280,
                            width: isMobile ? '100vw' : 'calc(100vw - 280px)'}} className={classes.fullPhotoBlock} onClick={() => {this.setState({gallery: false})}}>
                            <CardMedia
                                className={classes.fullPhoto}
                                image={this.props?.article?.urlToImage ? this.props.article.urlToImage : noImage}
                            />
                        </Container>
                        }
                    </Box>
                }
                {this.props.mode === 'list' &&
                    <Card className={classes.cardRoot} style={{marginRight: this.props.mobile ? 0 : 20}}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={this.props?.article?.urlToImage ? this.props?.article.urlToImage : noImage}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Опубликовано {new Date(this.props?.article?.publishedAt).getDate()}.{new Date(this.props?.article?.publishedAt).getMonth()}.{new Date(this.props?.article?.publishedAt).getFullYear()}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h6">
                                {this.props?.article?.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {this.props?.article?.description}
                            </Typography>
                        </CardContent>
                        <CardActions classes={{
                            root: classes.cardActionRoot
                        }}>
                            <Link className={classes.link} to="/article"><Button size="small" onClick={() => {
                                this.props.selectArticle(this.props?.article)
                            }}>
                                Подробнее
                            </Button></Link>
                        </CardActions>
                    </Card>
                }

            </ThemeProvider>
        );
    }
}

export default withStyles({
    fullPhotoBlock: {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        padding: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 'unset'
    },
    fullPhoto: {
        width: 'inherit',
        height: 'inherit',
        backgroundSize: 'contain'
    },
    wrapper: {
        padding: 30,
        width: '100%'
    },
    photo: {
        maxWidth: 300,
        display: 'flex',
        justifyContent: 'center'
    },
    media: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginBottom: 30,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    description: {
        marginTop: 20
    },

    link: {
        textDecoration: 'none'
    },
    cardRoot: {
        maxWidth: 400,
        minWidth: 300,
        width: '25%',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        height: 200,
    },
    cardActionRoot: {
        justifyContent: 'flex-end',
        flexGrow: 1,
        alignItems: 'flex-end'
    }
})(NewsPage);
