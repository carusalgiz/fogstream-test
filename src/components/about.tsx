import * as React from "react";
import {ThemeProvider, withStyles} from "@material-ui/core";
import { YMaps, Map, Placemark  } from 'react-yandex-maps';
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

interface IProps {
    classes: any,
    theme?: any
}

class About extends React.Component<IProps>{
    mapData = {
        center: [48.463289, 135.084215],
        zoom: 17,
    };
    coordinates = [
        [48.463289,135.084215]
    ];
    options = {
        iconColor: "#562500"
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            classes: false
        }
    }
    render(){
        const { classes } = this.props;

        return(
            <ThemeProvider theme={this.props?.theme}>
                <CssBaseline />
                <Box bgcolor="paper" color="secondary.main" className={classes.wrapper}>
                    <div className={classes.title}>Офис с кофе и печеньками находится вот здесь:</div>
                    <YMaps>
                        <Map className={classes.map} defaultState={this.mapData}>
                            {this.coordinates.map(coordinate => <Placemark geometry={coordinate} options={this.options} />)}
                        </Map>
                    </YMaps>
                </Box>
            </ThemeProvider>
        );
    }
}
export default withStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    title: {
        fontSize: '1.8em',
        fontWeight: 'bold',
        padding: '40px 0',
        width: 'fit-content'
    },
    map: {
        width: '60%',
        height: '50vh',
        minWidth: 300,
        minHeight: 200,
    }
})(About);
