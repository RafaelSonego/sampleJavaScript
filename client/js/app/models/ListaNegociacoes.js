class ListaNegociacoes {
    
        constructor(executor){
            this._negociacoes = [];
        }
    
        adiciona(negociacao){
            this._negociacoes.push(negociacao);
        }
    
        get negociacoes(){
            return [].concat(this._negociacoes);
        }
    
        esvazia(){
            this._negociacoes = [];
        }

        get volumeTotal(){
            return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0.0);
        }

        ordena(criterio){
            this._negociacoes.sort(criterio);
        }

        inverteOrdem(){
            this._negociacoes.reverse();
        }
    
    }