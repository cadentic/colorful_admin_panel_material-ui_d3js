import React from 'react';

import { Card, CardHeader, CardContent, Divider, LinearProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

var textColor = '#606060';
var bacgroundED = '#ededed';

const useStyle = makeStyles(theme=> ({
    calenderCard: {
        width: theme.spacing(81),
        height: theme.spacing(44),
        color: textColor,
        marginBottom: 24,
        borderRadius: 10,
        // marginLeft: 12,
    },
    cardHeaderTitle: {
        fontSize: 18,
        color: textColor,
    },
    cardContent: {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBar: {
        height: theme.spacing(3),
    },
    progressBlock: {
        marginBottom: theme.spacing(2)
    },
    taskName: {
        fontWeight: 700,
        flex: '1 1 auto'
    },
    numbersVal: {
        // float: 'right'
    },
    header: {
        display: 'flex'
    }
}));

function ProgressBar(props) {
    
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
                  {(new Array(4)).fill('0').map((item, index) => {
                      if (index < props.data.length) {
                          let d = props.data[index].data;
                          return (
                              <div className={classes.progressBlock} key={index}>
                                    <div className={classes.header}>
                                        <div className={classes.taskName}>
                                            {props.data[index].name}
                                        </div>
                                        <div className={classes.numbersVal}>
                                            <b>{d.current}</b>/{d.all}
                                        </div>
                                    </div>
                                  <LinearProgress
                                  variant="determinate"
                                  className={classes.progressBar}
                                  value={100 * d.current / d.all}
                                  />
                              </div>
                          );
                      }
                  })}
                </CardContent>
            </Card>
        </div>
    );
}

export default ProgressBar;