class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                         new NegociacoesView($('#divTableNegociacoesView')),
                                        'adiciona','esvazia');

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#divMensagemAlerta')),
                                  'texto');
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso!';
        
        this._limpaFormulario();
    }

    importaNegociacoes(){

        let negociacaoService = new NegociacaoService();

        //Promise.all recebe um array de Promises que será executada na ordem em que esta no array
        Promise.all([
                    negociacaoService.obterNegociacaoDaSemana(), 
                    negociacaoService.obterNegociacaoDaAnterior(),
                    negociacaoService.obterNegociacaoDaRetrasada()
                ]).then((arrayListaNegociacoes) => { 
                    //arrayListaNegociacoes: Como cada promise retorna um array, o retorno do Promise.all será um array de array de negociacoes
                    //Utiliza o reduce para criar um unico array de negociacoes
                    arrayListaNegociacoes
                        //reduce recebe dois parametros, uma funcao e o valor de inicializacao do novo array neste caso
                        .reduce((newArray, array) => newArray.concat(array), [])
                        .forEach(negociacao => {
                            return this._listaNegociacoes.adiciona(negociacao);
                        });
                        this._mensagem.texto = 'Negociações importadas com sucesso!';
                })
                .catch((error) =>{
                    this._mensagem.texto = error;
                });

        /*
            //then irá chamar a funcao resolve do promise
            negociacaoService.obterNegociacaoDaSemana().then(listaNegociacoes => {
                listaNegociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana importadas com sucesso!';
            })
            //catch irá chamar a funcao reject do promise
            .catch(error => this._mensagem.texto = error);

            //then irá chamar a funcao resolve do promise
            negociacaoService.obterNegociacaoDaAnterior().then(listaNegociacoes => {
                listaNegociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana anterior importadas com sucesso!';
            })
            //catch irá chamar a funcao reject do promise
            .catch(error => this._mensagem.texto = error);

            //then irá chamar a funcao resolve do promise
            negociacaoService.obterNegociacaoDaRetrasada().then(listaNegociacoes => {
                listaNegociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso!';
            })
            //catch irá chamar a funcao reject do promise
            .catch(error => this._mensagem.texto = error);
        */
    }

    apagaListaNegociacoes(){
        this._listaNegociacoes.esvazia();
        
        this._mensagem.texto = '*** Negociações apagadas com sucesso! ***';
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    _criaNegociacao(){
        return new Negociacao(
                DateHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value);    
    }
}