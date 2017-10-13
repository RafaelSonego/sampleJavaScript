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
    
    }