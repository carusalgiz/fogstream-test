import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import {Divider, ThemeProvider} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

interface IProps {
    classes: any,
    theme?: any
}

export class Help extends React.Component<IProps>{
    render(){
        const { classes } = this.props;
        return(
            <ThemeProvider theme={this.props?.theme}>
                <CssBaseline />
                <Box bgcolor="paper" color="secondary.main" className={classes.wrapper}>
                    <Typography gutterBottom variant="h2" component="h2" color="inherit">FAQ</Typography>
                    <Typography gutterBottom variant="h5" component="h5">
                        Как открыть новость?
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Кликнуть на кнопку "Подробнее" в карточке новости.
                    </Typography>
                    <Divider  className={classes.divider}/>
                    <Typography gutterBottom variant="h5" component="h5">
                        Как открыть фотографию новости в полном размере?
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Вы можете кликнуть на миниатюру, чтобы открыть фотографию с полном размере, а для закрытия кликнуть в любом месте открытой фотографии.
                    </Typography>
                    <Divider  className={classes.divider}/>
                    <Typography gutterBottom variant="h5" component="h5">
                        Как отфильтровать новости по дате?
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        В верхней части главной странице расположены для поля для выбора даты, где вы можете либо напечатать нужную дату в поле вручную, либо выбрать из окна с календарем.
                        Для открытия календаря нужно кликнуть на иконку в правой части поля выбора даты.
                    </Typography>
                </Box>
            </ThemeProvider>
        );
    }
}

export default withStyles({
    wrapper: {
        maxWidth: 1100,
        padding: 30
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#d81134'
    },
    divider: {
        margin: '20px 0'
    }
})(Help)
