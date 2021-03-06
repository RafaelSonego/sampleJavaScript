import {HTTPService} from './HTTPService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{
    constructor(){
        this._httpService = new HTTPService();
    }

    obterNegociacaoDaSemana(){
        return this._httpService
            .get('negociacoes/semana') //get irá retornar um Promise
            .then(listaNegociacoes => {
                return listaNegociacoes.map(obj => {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            })
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociacoes da semana');
            });
    }

    obterNegociacaoDaAnterior(){
        return this._httpService
            .get('negociacoes/anterior') //get irá retornar um Promise
            .then(listaNegociacoes => {
                return listaNegociacoes.map(obj => {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            })
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociacoes da semana anterior');
            });
    }

    obterNegociacaoDaRetrasada(){
        return this._httpService
            .get('negociacoes/retrasada') //get irá retornar um Promise
            .then(listaNegociacoes => {
                return listaNegociacoes.map(obj => {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            })
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociacoes da semana retrasada');
            });
    }

    obterTodasAsNegociacoes(){
        return Promise
                .all([
                        this.obterNegociacaoDaSemana(), 
                        this.obterNegociacaoDaAnterior(),
                        this.obterNegociacaoDaRetrasada()
                    ])
                .then((arrayTodasNegociacoesPorPeriodo) => {
                    //arrayListaNegociacoes: Como cada promise retorna um array, o retorno do Promise.all será um array de array de negociacoes
                    //Utiliza o reduce para criar um unico array de negociacoes
                    let listaNegociacoes = arrayTodasNegociacoesPorPeriodo
                        //reduce recebe dois parametros, uma funcao e o valor de inicializacao do novo array neste caso                        
                        .reduce((newArray, array) => newArray.concat(array), []);
                    return listaNegociacoes;
                })
                .catch(error => {
                    throw new Error(error);
                });
    }

    cadastrar(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection)) //retorna um dao
            .then(dao => dao.adiciona(negociacao)) //Persiste no banco indexeddb
            .then(() => 'Negociacao adicionada com sucesso!')
            .catch(() => {
                throw new Error('Nao foi possivel adicionar a negociacao');
            });
    }

    listar(){
        //Chamando o metodo listartodos do dado que esta no DAO e para cada um que recuperar ja estou adicionando na lista para carregar assim que a pagina for aberta
        // Na programacao funcional , sabemos que se tiver uma linha, nao precisamos colocar o return
        return ConnectionFactory
            .getConnection() // minha getConnection retorna uma connection que precisamos saber para utilizar o then
                .then(connection => new NegociacaoDao(connection)) // com a connection, instancio o NegociacaoDao passando a connection como parametro
                .then(dao => dao.listarTodos()) // resolve esta retornando uma lista de negociacoes que poderei pegar no then
                .catch(error => {
                    throw new Error('Nao foi possivel listar as negociacoes');
                });
    }

    apagarNegociacoes(){
        return ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.apagaTodos())
                .then(mensagem => {
                    return mensagem;
                })
                .catch(error => {
                    return error;
                });
    }

    importarNegociacoes(listaAtual){
        //É um for dentro de um for neste caso, 
        //No filter, cada elemento (negociacao) será comparado com o Negociacao existente de uma lista já existente
        return this.obterTodasAsNegociacoes()
                .then(listaNegociacoes => //Recupera as novas negociacoes que serão importadas
                    listaNegociacoes.filter(negociacao => //Para cada uma, através do metodo some, será comparado com uma lista já existente verificando se está duplicada
                        !listaAtual.some(negociacaoExistente => //Resultado do some é um boolean que caso seja verdadeiro é pq o item já está na lista
                            negociacao.equals(negociacaoExistente) //equals nao existe no JS, implementei na mao utilizando o JSON.stringigy
                        ))
                )
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível importar as negociações');
                });
    }

}