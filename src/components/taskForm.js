import React from 'react';
import { Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as d3 from 'd3';

var textColor = '#606060';

export function fillPercentage(taskID, endPercent) {
    var colors = {
        'pink': '#E1499A',
        'yellow': '#f0ff08',
        'green': '#47e495'
    };
    
    var color = colors.pink;
    
    var radius = 60;
    var border = 5;
    var padding = 20;
    
    
    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var boxSize = (radius + padding) * 2;
    
    
    var arc = d3.arc()
        .startAngle(0)
        .innerRadius(radius)
        .outerRadius(radius - border);
    
    var parent = d3.select(`div#${taskID}`);
    
    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);
    
    var defs = svg.append('defs');
    
    var filter = defs.append('filter')
        .attr('id', 'blur');
    
    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '7');
    
    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
    
    var meter = g.append('g')
        .attr('class', 'progress-meter');
    
    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));

    
    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);
    
    var numberText = meter.append('text')
        .attr('fill', '#606060')
        .attr('font-weight', 600)
        .attr('font-size', 20)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');
    var progress = endPercent;

    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(formatPercent(progress));

    return arc;
}

const useStyle = makeStyles({
    cardHeaderTitle: {
        fontSize: 18,
        color: textColor,
    },
    taskCard: {
        width: 400,
        height: 250,
        color: textColor,
        marginBottom: 24,
        borderRadius: 10,
        marginLeft: 12,
    },
    cardContent: {
        display: 'flex',
    },
    taskName: {
        fontWeight: 700,
        paddingBottom: 9
    },
    taskDescription: {
        fontSize: 16,
        textIndent: 20,
        fontStyle: 'italic',
    }
});

function TaskForm(props) {

    const classes = useStyle();

    // window.onload = () => fillPercentage(props.taskID, props.doneRate / 100 + 0.3);
    return (
    <div>
        <Card elevation={5} className={classes.taskCard}>
            <CardHeader
            classes={{
                title: classes.cardHeaderTitle
            }}
            title={props.name} />
            <Divider />
            <CardContent className={
                classes.cardContent
            }>
                <div id={`${props.taskID}`}></div>
                <div >
                 <Typography className={classes.taskName}>
                    {props.name}
                 </Typography>
                 <Typography className={classes.taskDescription}>
                    {props.description}
                 </Typography>
                </div>
            </CardContent>
        </Card>
    </div>);
}

export default TaskForm;