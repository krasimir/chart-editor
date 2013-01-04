var App = (function() {

    var container,
        legend,
        editor,
        xaxisNPoints,
        xValuesHolder,
        yValuesHolder,
        xValues,
        yValues,
        showPoints,
        showPointsFlag = true;

    var init = function() {

        container = $(".graph-holder");
        legend = $(".legend-holder");
        editor = $(".editor");

        // editor
        axisNPoints = new Counter("number of points", defaultSettings.numOfPoints, addValueCounters);
        axisNPoints.appendTo(editor);
        editor.find("#x-values").append($('<h4>X</h4>'));
        editor.find("#x-values").append(xValuesHolder = $('<div></div>'));
        editor.find("#y-values").append($('<h4>y</h4>'));
        editor.find("#y-values").append(yValuesHolder = $('<div></div>'));
        editor.append($("<hr />")).append(showPoints = $('<a href="javascript:void(0);">turn points on/off</a>'));

        showPoints.click(function() {
            showPointsFlag = !showPointsFlag;
            drawGraph();
        });

        addValueCounters();
        drawGraph();

    }
    var addValueCounters = function() {
        xValuesHolder.empty();
        yValuesHolder.empty();
        xValues = [];
        yValues = [];
        var xStep = (defaultSettings.x[1] - defaultSettings.x[0]) / (axisNPoints.val()-1);
        var yStep = (defaultSettings.y[1] - defaultSettings.y[0]) / (axisNPoints.val()-1);
        for(var i=0; i<axisNPoints.val(); i++) {                    
            xValues.push(new Counter("p" + (i+1), xStep * i, drawGraph).appendTo(xValuesHolder));
            yValues.push(new Counter("p" + (i+1), yStep * i, drawGraph).appendTo(yValuesHolder));
        }
    }
    var drawGraph = function() {
        var data = [];
        for(var i=0; i<axisNPoints.val(); i++) {
            data.push([xValues[i].val(), yValues[i].val()]);
        }
        container.empty();
        $.plot(container, [data], {
            series: {
                curvedLines: {
                    active: true,
                    show: true,
                    fit: false,
                    lineWidth: 3
                },
                points: {
                    show: showPointsFlag
                }
            },
            xaxis: {
                tickSize: defaultSettings.xTickSize || 1
            },
            yaxis: {
                tickSize: defaultSettings.yTickSize || 1
            }
        });
    }

    return {
        init: init
    }

})();