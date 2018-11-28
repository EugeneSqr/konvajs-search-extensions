(function(Konva) {
    "use strict";

    var attributeNames = ["id", "name"];

    var _getId = Konva.Node.prototype.getId;
    Konva.Node.prototype.getId = function() {
        return decodeSpaces(_getId.call(this));
    };

    var _setId = Konva.Node.prototype.setId;
    Konva.Node.prototype.setId = function(id) {
        return _setId.call(this, encodeSpaces(id));
    };

    var _getAttrs = Konva.Node.prototype.getAttrs;
    Konva.Node.prototype.getAttrs = function() {
        var attrs = _getAttrs.call(this);
        if (attrs) {
            attributeNames.forEach(function(attributeName) {
                if (attrs.hasOwnProperty(attributeName)) {
                    attrs[attributeName] = decodeSpaces(attrs[attributeName]);
                }
            });
        }

        return attrs;
    };

    var _setAttrs = Konva.Node.prototype.setAttrs;
    Konva.Node.prototype.setAttrs = function(attrs) {
        if (attrs) {
            attributeNames.forEach(function(attributeName) {
                if (attrs.hasOwnProperty(attributeName)) {
                    attrs[attributeName] = encodeSpaces(attrs[attributeName]);
                }
            });
        }

        return _setAttrs.call(this, attrs);
    };

    var _find = Konva.Container.prototype.find;
    Konva.Container.prototype.find = function(selector) {
        return _find.call(this, encodeSpaces(selector));
    };

    var _findOne = Konva.Container.prototype.findOne;
    Konva.Container.prototype.findOne = function(selector) {
        return _findOne.call(this, encodeSpaces(selector));
    };

    function encodeSpaces(original) {
        return (original) ? original.replace(" ", "%20") : original;
    }

    function decodeSpaces(encoded) {
        return (encoded) ? encoded.replace("%20", " ") : encoded;
    }
})(Konva);
