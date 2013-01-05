var App = (function() {

    var container,
        legend,
        settingsHolder,
        xValuesHolder,
        yValuesHolder,
        showPointsFlag = true,
        settings = {};

    var init = function() {

        container = $(".graph-holder");
        legend = $(".legend-holder");
        settingsHolder = $(".settings");
        xValuesHolder = $(".x-values");
        yValuesHolder = $(".y-values");

        // settings
        settings.export = $('<a href="javascript:void(0);" class="btn btn-primary settings-button">Export</a>').appendTo(settingsHolder);
        settings.showPoints = $('<a href="javascript:void(0);" class="btn settings-button">Turn points on/off</a>').appendTo(settingsHolder);
        settingsHolder.append("<hr />");
        settings.numberOfPoints = new Counter("Number of points", defaultSettings.numOfPoints, [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settingsHolder.append("<hr />");
        settings.XRangeFrom = new Counter("X Range from: ", defaultSettings.x[0], [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settings.XRangeTo = new Counter("X Range to: ", defaultSettings.x[1], [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settingsHolder.append("<hr />");
        settings.YRangeFrom = new Counter("Y Range from: ", defaultSettings.y[0], [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settings.YRangeTo = new Counter("Y Range to: ", defaultSettings.y[1], [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settingsHolder.append("<hr />");
        settings.xTickSize = new Counter("X Tick size: ", defaultSettings.xTickSize, [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settings.yTickSize = new Counter("Y Tick size: ", defaultSettings.yTickSize, [addValueCounters, drawGraph]).appendTo(settingsHolder);
        settingsHolder.append("<hr />");

        settings.showPoints.click(function() {
            showPointsFlag = !showPointsFlag;
            drawGraph();
        });

        addValueCounters();
        drawGraph();

    }
    var addValueCounters = function() {
        xValuesHolder.empty();
        yValuesHolder.empty();
        settings.xValuesCounters = [];
        settings.yValuesCounters = [];
        var xStep = (settings.XRangeTo.val() - settings.XRangeFrom.val()) / (settings.numberOfPoints.val()-1);
        var yStep = (settings.YRangeTo.val() - settings.YRangeFrom.val()) / (settings.numberOfPoints.val()-1);
        for(var i=0; i<settings.numberOfPoints.val(); i++) {                    
            settings.xValuesCounters.push(new Counter("p" + ((i+1) < 10 ? "0" + (i+1) : (i+1)), xStep * i, drawGraph).appendTo(xValuesHolder));
            settings.yValuesCounters.push(new Counter("p" + ((i+1) < 10 ? "0" + (i+1) : (i+1)), yStep * i, drawGraph).appendTo(yValuesHolder));
        }
    }
    var drawGraph = function() {
        var data = [];
        for(var i=0; i<settings.numberOfPoints.val(); i++) {
            data.push([settings.xValuesCounters[i].val(), settings.yValuesCounters[i].val()]);
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
                tickSize: settings.xTickSize.val()
            },
            yaxis: {
                tickSize: settings.yTickSize.val()
            }
        });
    }

    return {
        init: init
    }

})();