import React from 'react';
import { Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { makeStyles } from '@material-ui/core/styles';

var numberColor = '#606060';
var textColor = '#ffffff';

const useStyle = makeStyles(theme => ({
    taskCard: {
        width: 220,
        height: 250,
        color: textColor,
        marginBottom: 24,
        borderRadius: 10
    },
    cardContent: {
        display: 'block',
    },
    taskName: {
        fontWeight: 700,
        paddingBottom: 9
    },
    taskDescription: {
        fontSize: 16,
        textIndent: 20,
        fontStyle: 'italic',
    },
    iconUser: {
        marginLeft: 47,
        marginTop: 15,
        backgroundColor: '#31B4E6',
        fontSize: 93,
        color: '#ffffff',
        borderRadius: '50%',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#ffffff',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.19), 0 0 20px 0 rgba(0, 0, 0, 0.19)',
        marginBottom: 10,
    },
    iconShop: {
        marginLeft: 47,
        marginTop: 15,
        backgroundColor: '#75CA9F',
        fontSize: 93,
        color: '#ffffff',
        borderRadius: '50%',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#ffffff',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.19), 0 0 20px 0 rgba(0, 0, 0, 0.19)',
        marginBottom: 10,
    },
    userFooter: {
        backgroundColor: '#31B4E6',
        height: '100%',
    },
    shopFooter: {
        backgroundColor: '#75CA9F',
        height: '100%',
    },
    data: {
        textAlign: 'center',
        fontSize: 24,
        color: numberColor,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        color: textColor,
    }
}));

function DataForm(props) {

    const classes = useStyle();

    let icon = null;
    let footer = null;

    if (props.isShop) {
        icon = <ShoppingBasketOutlinedIcon className={
            classes.iconShop
        } />;
        footer = classes.shopFooter;
    }
    else {
        icon = <PersonOutlineOutlinedIcon className={
            classes.iconUser
        } />;
        footer = classes.userFooter;
    }

    return (
    <div>
        <Card elevation={5} className={classes.taskCard}>
            <CardContent className={classes.cardContent}>
                {icon}
                <Typography className={classes.data}>
                    {props.data}
                </Typography>
            </CardContent>
            <CardContent className={footer}>
                <Typography className={classes.text}>
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    </div>);
}

export default DataForm;