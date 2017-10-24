"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    Prop: Propriedade chamada
    Target: Objeto Original
    Receiver: Referencia ao proxy
    Executado quando acontecer alguma leitura de propriedade
    get: function(target, prop, receiver) {
        console.log(`prop: "${prop}"`);
            return Reflect.get(target, prop, receiver); 
    }
*/
var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",

        /*
            Obj = Objeto que será criado a proxy
            props = array de propriedades
            action = acao que será executada
        */
        value: function create(obj, props, action) {
            return new Proxy(obj, {
                get: function get(target, prop, receiver) {
                    /*
                        Caso a propriedade exista dentro da lista de propriedades passada por parametro e seja uma funçao
                    */
                    if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                        return function () {
                            console.log("" + prop);
                            var result = Reflect.apply(target[prop], target, arguments);
                            action(target);
                            return result;
                        };
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set: function set(target, prop, value, receiver) {
                    var result = Reflect.set(target, prop, value, receiver);
                    if (props.includes(prop)) {
                        target[prop] = value;
                        action(target);
                    }
                    return result;
                }
            });
        }
    }, {
        key: "_isFunction",
        value: function _isFunction(func) {
            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map