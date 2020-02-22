import React from 'react';

import { Card, CardHeader, CardContent, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

var textColor = '#606060';
var bacgroundED = '#ededed';

const useStyle = makeStyles(theme=> ({
    calenderCard: {
        width: theme.spacing(70),
        height: theme.spacing(44),
        color: textColor,
        // marginBottom: 24,
        borderRadius: 10,
        marginLeft: 12,
    },
    cardHeaderTitle: {
        fontSize: 18,
        color: textColor,
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
    },

}));

function Chart(props) {
    
    const classes = useStyle();



    return(
        <div>
            <Card elevation={5} className={classes.calenderCard}>
                <CardHeader
                classes={{
                    title: classes.cardHeaderTitle
                }}
                title={props.name} />
                <Divider />
                <CardContent className={classes.cardContent}>
                  
                </CardContent>
            </Card>
        </div>
    );
}

export default Chart;