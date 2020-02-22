import React from 'react';

import { Card, CardHeader, CardContent, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

var textColor = '#606060';
var bacgroundED = '#ededed';

const useStyle = makeStyles(theme=> ({
    calenderCard: {
        width: theme.spacing(70),
        height: theme.spacing(65.5),
        color: textColor,
        marginBottom: 24,
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
    taskName: {
        // fontWeight: 700,
        paddingBottom: 9
    },
    taskDescription: {
        fontSize: 16,
        textIndent: 20,
        fontStyle: 'italic',
    },
    contentLayout: {
        display: 'block',
    },
    date: {
        width: theme.spacing(70),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    cellDateThis: {
        width: theme.spacing(7),
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
    },
    cellDay: {
        backgroundColor: bacgroundED,
        width: theme.spacing(7),
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBut: {
        height: theme.spacing(4),
        width: theme.spacing(4),
        backgroundColor: bacgroundED,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerDate: {
        height: theme.spacing(4),
        backgroundColor: bacgroundED,
        fontSize: 20,
        width: theme.spacing(26),
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    dataPicker: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
    },

    sheet: {
        width: theme.spacing(49),
        height: theme.spacing(30),
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: bacgroundED,
        boxSizing: 'border-box',
        gridTemplateColumns: 'auto auto auto auto auto auto auto',
    },
    cellDateNotThis: {
        color: bacgroundED,
        width: theme.spacing(7),
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellDateToday: {
        color: '#ffffff',
        width: theme.spacing(7),
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d287bb',
    },
}));

function Calendar(props) {

    var curDate = new Date();
    var originalDate = new Date();

    const classes = useStyle();

    const [state, setState] = React.useState({
        day: curDate.getDate(),
        month: curDate.getMonth(),
        year: curDate.getFullYear()
    });

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function monthChange(data, where) {
        switch(where) {
            case 'forward':
                if (state.month != 11) {
                    setState({
                        day: state.day,
                        month: state.month + 1,
                        year: state.year
                    });
                }
                else {
                    setState({
                        day: state.day,
                        month: 0,
                        year: state.year + 1
                    });
                }
                break;
            case 'back':
                if (state.month != 0) {
                    setState({
                        day: state.day,
                        month: state.month - 1,
                        year: state.year
                    });
                }
                else {
                    setState({
                        day: state.day,
                        month: 11,
                        year: state.year - 1
                    });
                }
                break;
            
        }
    }

    if (originalDate.getFullYear() !== state.year || originalDate.getDate() !== state.day || originalDate.getMonth() !== state.month) {
        curDate = new Date(state.year, state.month, state.day);
    }

    var q = 0;
    if (state.month < 11) {
        q = new Date(state.year, state.month + 1, 0).getDate();
    }
    else {
        q = new Date(state.year + 1, 0, 0).getDate();
    }
    var z = 0;

    z = (new Date(state.year, state.month, 0)).getDate();
    let count = 0;
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
                    <div className={classes.contentLayout}>
                        <div className={classes.date}>
                            <div className={classes.headerBut} onClick={() => monthChange(state, "back")}>
                                <NavigateBeforeIcon />
                            </div>
                            <div className={classes.headerDate}>
                                {`${months[state.month]} ${state.day}, ${state.year}`}
                            </div>
                            <div className={classes.headerBut} onClick={() => monthChange(state, "forward")}>
                                <NavigateNextIcon />
                            </div>
                        </div>
                        <div className={classes.dataPicker}>
                            <div className={classes.row}>
                                {days.map((day, index) => {
                                    return(
                                    <div className={classes.cellDay} key={index}>
                                        {day}
                                    </div>
                                    )
                                })}
                            </div>
                            <div className={classes.sheet}>
                                { 
                                ((new Array(35)).fill('0')).map((item, index) => {
                                    if (index - curDate.getDay() < 0) {
                                        count++;
                                        return (<div className={classes.cellDateNotThis} key={index}>
                                            {z + index - curDate.getDay() + 1}
                                        </div>);
                                    }
                                    else {
                                        if (index - count - q < 0) {
                                            if (originalDate.getFullYear() === state.year && originalDate.getDate() === index + 1 - count && originalDate.getMonth() === state.month) {
                                                return (<div className={classes.cellDateToday} key={index}>
                                                    {index + 1 - curDate.getDay()}
                                                </div>);
                                            } else {
                                                return (<div className={classes.cellDateThis} key={index}>
                                                    {index + 1 - curDate.getDay()}
                                                </div>);
                                            }
                                        }
                                        else {
                                            return (<div className={classes.cellDateNotThis} key={index}>
                                                {index + 1 - count - q}
                                            </div>);
                                        }
                                    }
                                } )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Calendar;