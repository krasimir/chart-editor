var Counter = function(label, defaultValue, onChangeCallback) {

    var self = this,
        api;

    var getValue = function() {        
        return value;
    }
    var appendTo = function(obj) {
        obj.append(el);
        return api;
    }
    var onUp = function() {    
        value += 1;
        input.val(value);
        callCallback();
    }
    var onDown = function() {
        value -= 1;
        input.val(value);
        callCallback();
    }
    var update = function() {
        value = parseInt(input.val());
        callCallback();
    }
    var callCallback = function() {
        if(_.isArray(onChangeCallback)) {
            _.each(onChangeCallback, function(c) {
                c();
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