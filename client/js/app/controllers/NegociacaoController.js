'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#divTableNegociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#divMensagemAlerta')), 'texto');

        this._ordemAtual = '';
        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._negociacaoService.listar().then(function (listaNegociacoes) {
                return (//Recupero a lista de negociacoes
                    listaNegociacoes.forEach(function (negociacao) {
                        return _this._listaNegociacoes.adiciona(negociacao);
                    })
                );
            }).catch(function (error) {
                _this._mensagem.texto = error;
            });

            // setInterval recebe uma funçao e o tempo que ficará sendo chamado 3000 milesegundos
            setInterval(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();
            this._negociacaoService.cadastrar(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (error) {
                return _this2._mensagem.texto = error;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._negociacaoService.importarNegociacoes(this._listaNegociacoes.negociacoes).then(function (listaNegociacoes) {
                return listaNegociacoes.forEach(function (negociacao) {
                    _this3._negociacaoService.cadastrar(negociacao);
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações importadas com sucesso!';
                });
            }).catch(function (error) {
                return _this3._mensagem.texto = error;
            });
        }
    }, {
        key: 'apagaListaNegociacoes',
        value: function apagaListaNegociacoes() {
            var _this4 = this;

            this._negociacaoService.apagarNegociacoes().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (error) {
                _this4._mensagem.texto = error;
            });
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map