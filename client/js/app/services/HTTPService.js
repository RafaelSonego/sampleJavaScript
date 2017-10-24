'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HTTPService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('HTTPService', HTTPService = function () {
                function HTTPService() {
                    _classCallCheck(this, HTTPService);
                }

                _createClass(HTTPService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(res) {
                        if (!res.ok) throw new Error(res.statusText);
                        return res;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        //fetch é uma promise
                        return fetch(url).then(function (res) {
                            return _this._handleErrors(res);
                        }).then(function (res) {
                            return res.json();
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, dado) {
                        var _this2 = this;

                        //para o post, iremos passar a url e um objeto contendo as informacoes para o POST
                        return fetch(url, {
                            headers: { 'content-type': 'application/json' },
                            method: 'post', //método que estou chamando do HTTP
                            body: JSON.stringify(dado) //meu obj que será passado no post como String
                        }).then(function (res) {
                            return _this2._handleErrors(res);
                        });
                    }
                }, {
                    key: 'getOld',
                    value: function getOld(url) {
                        return new Promise(function (resolve, reject) {
                            /*
                                xhr.readyState = 
                                    0: requisiçao ainda nao iniciada
                                    1: conexao com o servidor estabelecida
                                    2: requisicao recebida
                                    3: processando requisicao
                                    4: requisicao concluida e a resposta esta pronta
                            */
                            var xhr = new XMLHttpRequest();
                            //Passa o metodo HTTP e qual é o endereço do serviço, Neste caso esta no mesmo servidor
                            xhr.open('GET', url);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        /*
                                            xhr.responseText: recupera um Texto
                                            JSON.parse(xhr.responseText): Converte uma String para um array de objetos
                                            .map itera a lista de objetos recebendo uma funcao que para cada objeto irá criar um objeto de negociacao
                                            resolve(
                                                JSON.parse(xhr.responseText).map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ) 
                                               );
                                        */
                                        resolve(JSON.parse(xhr.responseText));
                                    } else {
                                        console.log('Ocorreu um erro!' + xhr.responseText);
                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send();
                        });
                    }
                }, {
                    key: 'postOld',
                    value: function postOld(url, dado) {
                        return new Promise(function (resolve, reject) {

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = function () {

                                if (xhr.readyState == 4) {

                                    if (xhr.status == 200) {

                                        resolve(JSON.parse(xhr.responseText));
                                    } else {

                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
                        });
                    }
                }]);

                return HTTPService;
            }());

            _export('HTTPService', HTTPService);
        }
    };
});
//# sourceMappingURL=HTTPService.js.map