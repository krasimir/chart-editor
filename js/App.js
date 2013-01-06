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

        $("#initalize").click(function() {
            var initX = $("#initX").val();
            var initY = $("#initY").val();
            if(initX != "") {
                initX = initX.split(",");
                for(var i=0; i<initX.length; i++) {
                    settings.xValuesCounters[i].val(initX[i]);
                }
            }
            if(initY != "") {
                initY = initY.split(",");
                for(var i=0; i<initY.length; i++) {
                    settings.yValuesCounters[i].val(initY[i]);
                }
            }
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
        xValuesHolder.append("<hr />");
        yValuesHolder.append("<hr />");
        settings.xValuesAll = new Counter("All:", 1, [manageAll, drawGraph], true).appendTo(xValuesHolder);
        settings.yValuesAll = new Counter("All:", 1, [manageAll, drawGraph], true).appendTo(yValuesHolder);
    }
    var manageAll = function(direction) {
        for(var i=0; i<settings.numberOfPoints.val(); i++) {                    
            settings.xValuesCounters[i].val(settings.xValuesCounters[i].val() + (settings.xValuesAll.val()*direction));
            settings.yValuesCounters[i].val(settings.yValuesCounters[i].val() + (settings.yValuesAll.val()*direction));
        }
    }
    var drawGraph = function() {
        var data = [];
        var result = {x: "", y: ""};
        for(var i=0; i<settings.numberOfPoints.val(); i++) {
            data.push([settings.xValuesCounters[i].val(), settings.yValuesCounters[i].val()]);
            result.x += settings.xValuesCounters[i].val().toFixed(2);
            result.y += settings.yValuesCounters[i].val().toFixed(2);
            if(i < settings.numberOfPoints.val() - 1) {
                result.x += ",";
                result.y += ",";
            }
            $("#resultX").val(result.x);
            $("#resultY").val(result.y);
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