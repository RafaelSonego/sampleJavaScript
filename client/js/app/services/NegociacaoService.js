class NegociacaoService{
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
                        .reduce((newArray, array) => newArray.concat(array), []);
                        //reduce recebe dois parametros, uma funcao e o valor de inicializacao do novo array neste caso                        
                    return listaNegociacoes;
                })
                .catch(error => {
                    throw new Error(error);
                });
    }

}