'use strict';

System.register(['./HTTPService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HTTPService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HTTPService) {
            HTTPService = _HTTPService.HTTPService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._httpService = new HTTPService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obterNegociacaoDaSemana',
                    value: function obterNegociacaoDaSemana() {
                        return this._httpService.get('negociacoes/semana') //get irá retornar um Promise
                        .then(function (listaNegociacoes) {
                            return listaNegociacoes.map(function (obj) {
                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociacoes da semana');
                        });
                    }
                }, {
                    key: 'obterNegociacaoDaAnterior',
                    value: function obterNegociacaoDaAnterior() {
                        return this._httpService.get('negociacoes/anterior') //get irá retornar um Promise
                        .then(function (listaNegociacoes) {
                            return listaNegociacoes.map(function (obj) {
                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociacoes da semana anterior');
                        });
                    }
                }, {
                    key: 'obterNegociacaoDaRetrasada',
                    value: function obterNegociacaoDaRetrasada() {
                        return this._httpService.get('negociacoes/retrasada') //get irá retornar um Promise
                        .then(function (listaNegociacoes) {
                            return listaNegociacoes.map(function (obj) {
                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociacoes da semana retrasada');
                        });
                    }
                }, {
                    key: 'obterTodasAsNegociacoes',
                    value: function obterTodasAsNegociacoes() {
                        return Promise.all([this.obterNegociacaoDaSemana(), this.obterNegociacaoDaAnterior(), this.obterNegociacaoDaRetrasada()]).then(function (arrayTodasNegociacoesPorPeriodo) {
                            //arrayListaNegociacoes: Como cada promise retorna um array, o retorno do Promise.all será um array de array de negociacoes
                            //Utiliza o reduce para criar um unico array de negociacoes
                            var listaNegociacoes = arrayTodasNegociacoesPorPeriodo
                            //reduce recebe dois parametros, uma funcao e o valor de inicializacao do novo array neste caso                        
                            .reduce(function (newArray, array) {
                                return newArray.concat(array);
                            }, []);
                            return listaNegociacoes;
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: 'cadastrar',
                    value: function cadastrar(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }) //retorna um dao
                        .then(function (dao) {
                            return dao.adiciona(negociacao);
                        }) //Persiste no banco indexeddb
                        .then(function () {
                            return 'Negociacao adicionada com sucesso!';
                        }).catch(function () {
                            throw new Error('Nao foi possivel adicionar a negociacao');
                        });
                    }
                }, {
                    key: 'listar',
                    value: function listar() {
                        //Chamando o metodo listartodos do dado que esta no DAO e para cada um que recuperar ja estou adicionando na lista para carregar assim que a pagina for aberta
                        // Na programacao funcional , sabemos que se tiver uma linha, nao precisamos colocar o return
                        return ConnectionFactory.getConnection() // minha getConnection retorna uma connection que precisamos saber para utilizar o then
                        .then(function (connection) {
                            return new NegociacaoDao(connection);
                        }) // com a connection, instancio o NegociacaoDao passando a connection como parametro
                        .then(function (dao) {
                            return dao.listarTodos();
                        }) // resolve esta retornando uma lista de negociacoes que poderei pegar no then
                        .catch(function (error) {
                            throw new Error('Nao foi possivel listar as negociacoes');
                        });
                    }
                }, {
                    key: 'apagarNegociacoes',
                    value: function apagarNegociacoes() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function (mensagem) {
                            return mensagem;
                        }).catch(function (error) {
                            return error;
                        });
                    }
                }, {
                    key: 'importarNegociacoes',
                    value: function importarNegociacoes(listaAtual) {
                        //É um for dentro de um for neste caso, 
                        //No filter, cada elemento (negociacao) será comparado com o Negociacao existente de uma lista já existente
                        return this.obterTodasAsNegociacoes().then(function (listaNegociacoes) {
                            return (//Recupera as novas negociacoes que serão importadas
                                listaNegociacoes.filter(function (negociacao) {
                                    return (//Para cada uma, através do metodo some, será comparado com uma lista já existente verificando se está duplicada
                                        !listaAtual.some(function (negociacaoExistente) {
                                            return (//Resultado do some é um boolean que caso seja verdadeiro é pq o item já está na lista
                                                negociacao.equals(negociacaoExistente)
                                            );
                                        } //equals nao existe no JS, implementei na mao utilizando o JSON.stringigy
                                        )
                                    );
                                })
                            );
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Não foi possível importar as negociações');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map