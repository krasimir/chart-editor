var Graph = function(container, legendContainer, graphData) {

    var globalGraphOptions = {
        grid: {
            show: true
        },
        series: {
            curvedLines: {
                active: true,
                show: true,
                fit: false,
                lineWidth: 3
            },
            points: {
                show: true
            }
        },
        xaxis: {
            tickFormatter: function (val, axis) {
                if(val < 10) {
                    return "0" + val + ":00";
                } else {
                    return val + ":00";
                }
            },
            tickSize: 4,
            tickLength: 0
        },
        yaxis: {
            max: 100,
            min: 0
        }
    }
    var options = _.extend({ legend: { container: legendContainer } }, globalGraphOptions);

    var drawGraph = function(graph) {
        var data = [];
        for(var i=0; i<graph.values.length; i++) {
            var value = graph.values[i];
            data.push(getDataObject(value.points, value.label, value.color, value.showDots));
        }
        $.plot(container, data, options);
    }

    var getDataObject = function(yValues, label, color, points) {
        var data = [];
        var xDiv = 24 / yValues.length;
        for(var i=0; i<yValues.length; i++) {
            data.push([
                xDiv * i,
                yValues[i]
            ]);
        }
        return {
            data: data,
            label: label,
            color: color,
            shadowSize: 0,
            points: { show: points },
            lines: { show: false }
        };
    }

    drawGraph(graphData);

}