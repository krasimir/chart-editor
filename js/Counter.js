var Counter = function(label, defaultValue, onChangeCallback, staticValue) {

    var self = this,
        api;

    var getValue = function(newValue) {
        if(newValue != null) {
            value = newValue;
            input.val(parseFloat(newValue));
        }
        return parseFloat(value);
    }
    var appendTo = function(obj) {
        obj.append(el);
        return api;
    }
    var onUp = function() {
        if(!staticValue) {
            value += 1;
        }
        input.val(value);
        callCallback(1);
    }
    var onDown = function() {
        if(!staticValue) {
            value -= 1;
        }
        input.val(value);
        callCallback(-1);
    }
    var update = function() {
        value = parseInt(input.val());
        callCallback(0);
    }
    var callCallback = function(direction) {
        if(_.isArray(onChangeCallback)) {
            _.each(onChangeCallback, function(c) {
                c(direction);
            })
        } else {
            onChangeCallback();
        }
    }

    var value = defaultValue || 0;
    var el = $('<div class="counter"></div>');
    var label = $('<span>' + label + ': </span>');
    var up = $('<a href="javascript:void(0);" class="btn counter-control">+</a>').click(onUp);
    var down = $('<a href="javascript:void(0);" class="btn counter-control">-</a>').click(onDown);
    var input = $('<input type="text" value="' + value + '" size="2" class="counter-input"/>').blur(update);
    el.append(label).append(input).append(up).append(down);    

    return api = {
        el: el,
        val: getValue,
        appendTo: appendTo
    }

}