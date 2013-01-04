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
        render();
        onChangeCallback();
    }
    var onDown = function() {
        value -= 1;
        input.val(value);
        render();
        onChangeCallback();
    }
    var update = function() {
        value = parseInt(input.val());
        render();
        onChangeCallback();
    }
    var render = function() {
        valueHolder.text(Math.floor(value));
    }

    var value = defaultValue || 0;
    var el = $('<div class="counter"></div>');
    var label = $('<span>' + label + ': </span>');
    var valueHolder = $('<span class="value">' + Math.floor(value) + '</span>');
    var up = $('<a href="javascript:void(0);">[ + ]</a>').click(onUp);
    var down = $('<a href="javascript:void(0);">[ - ]</a>').click(onDown);
    var input = $('<input type="text" value="' + value + '" size="2"/>').blur(update);
    el.append(label).append(valueHolder).append(up).append(down).append(input);    

    return api = {
        el: el,
        val: getValue,
        appendTo: appendTo
    }

}