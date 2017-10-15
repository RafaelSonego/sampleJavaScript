class NegociacaoService{
    constructor(){
        this._httpService = new HTTPService();
    }

    obterNegociacaoDaSemana(){
        return new Promise((resolve, reject) => {
            //get irá retornar um Promise
            this._httpService
                .get('negociacoes/semana')
                .then(listaNegociacoes => {
                    console.log(listaNegociacoes);
                    resolve(listaNegociacoes.map(obj => {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociacoes da semana');
                });
        });
    }

    obterNegociacaoDaAnterior(){
        return new Promise((resolve, reject) => {
            //get irá retornar um Promise
            this._httpService
                .get('negociacoes/anterior')
                .then(listaNegociacoes => {
                    console.log(listaNegociacoes);
                    resolve(listaNegociacoes.map(obj => {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociacoes da semana anterior');
                });
        });        
    }

    obterNegociacaoDaRetrasada(){
        return new Promise((resolve, reject) => {
            //get irá retornar um Promise
            this._httpService
                .get('negociacoes/retrasada')
                .then(listaNegociacoes => {
                    console.log(listaNegociacoes);
                    resolve(listaNegociacoes.map(obj => {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociacoes da semana retrasada');
                });
        });        
    }

}