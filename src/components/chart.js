import React from 'react';

import { Card, CardHeader, CardContent, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';

var textColor = '#606060';
var bacgroundED = '#ededed';

const useStyle = makeStyles(theme=> ({
    calenderCard: {
        width: theme.spacing(70),
        height: theme.spacing(44),
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
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
    },
    chart: {
        
    },
    titles: {
        marginTop: theme.spacing(5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerOne: {
        height: theme.spacing(1.5),
        marginTop: theme.spacing(0.4),
        width: theme.spacing(1.5),
        backgroundColor: 'steelblue',
        borderRadius: '50%',
        marginRight: theme.spacing(1)
    },
    markerTwo: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        marginTop: theme.spacing(0.4),
        backgroundColor: '#75CA9F',
        borderRadius: '50%',
        marginRight: theme.spacing(1)
    },
    name: {
        display: 'flex'
    },
    description: {
        fontStyle: 'italic'
    },
    titleOne: {
        marginRight: theme.spacing(20)
    }
}));


export function chartDraw(data) {
    
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 550 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.x_val); })
        .y(function(d) { return y(d.y_val); })
        .curve(d3.curveMonotoneX); // smooth effect

    var valueline2 = d3.line()
        .x(function(d) { return x(d.x_val); })
        .y(function(d) { return y(d.y_val); })
        .curve(d3.curveMonotoneX);
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("div#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    function draw(data) {
        
        var data1 = data[0].data;
        var data2 = data[1].data;
        // sort years ascending
        data1.sort(function(a, b){
            return a.x_val-b.x_val;
        });
        data2.sort(function(a, b){
            return a.x_val-b.x_val;
        });
        
        // Scale the range of the data
        x.domain([0, Math.max(d3.max(data1, function(d) {
            return Math.max(d.x_val); }), 
            d3.max(data2, function(d) {
                return Math.max(d.x_val);}))]);

        y.domain([0, Math.max(d3.max(data1, function(d) {
            return Math.max(d.y_val); }), 
            d3.max(data2, function(d) {
                return Math.max(d.y_val);}))]);
        
        // Add the valueline path.
        svg.append("path")
            .data([data1])
            .attr("class", "line")
            .attr("stroke", "steelblue")
            .attr("stroke-width", "2px")
            .attr("fill", "none")
            .attr("d", valueline);

        svg.append("path")
            .data([data2])
            .attr("stroke", "#75CA9F")
            .attr("fill", "none")
            .attr("stroke-width", "2px")
            .attr("class", "line")
            .attr("d", valueline2);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }
    // Get the data
    draw(data);

}

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
                    <div className={classes.titles}>
                        {/* First Task or something */}
                        <div className={classes.titleOne}>
                            <div className={classes.name}>
                                <div className={classes.markerOne} />
                                <b>{props.data[0].name}</b>
                            </div>
                            <div className={classes.description}>
                                {props.data[0].description}
                            </div>
                        </div>
                        {/* Second Task or something */}
                        <div className={classes.titleTwo}>
                            <div className={classes.name}>
                                <div className={classes.markerTwo} />
                                <b>{props.data[1].name}</b>
                            </div>
                            <div className={classes.description}>
                                {props.data[1].description}
                            </div>
                        </div>
                    </div>
                    <div id="chart" className={classes.chart} />
                </CardContent>
            </Card>
        </div>
    );
}

export default Chart;