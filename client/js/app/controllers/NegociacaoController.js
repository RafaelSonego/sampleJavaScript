class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                         new NegociacoesView($('#divTableNegociacoesView')),
                                        'adiciona','esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#divMensagemAlerta')),
                                  'texto');

        this._ordemAtual = '';
        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init(){
        this._negociacaoService
            .listar()
            .then(listaNegociacoes => //Recupero a lista de negociacoes
                listaNegociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => {
                this._mensagem.texto = error;
            });

        // setInterval recebe uma funçao e o tempo que ficará sendo chamado 3000 milesegundos
        setInterval(() => {
        this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._negociacaoService
            .cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error);
    }

    importaNegociacoes(){
        this._negociacaoService
                .importarNegociacoes(this._listaNegociacoes.negociacoes)
                .then(listaNegociacoes => 
                        listaNegociacoes.forEach(negociacao => {
                            this._negociacaoService.cadastrar(negociacao);
                            this._listaNegociacoes.adiciona(negociacao);
                            this._mensagem.texto = 'Negociações importadas com sucesso!';
                        })
                    )
                .catch((error) => this._mensagem.texto = error);
    }

    apagaListaNegociacoes(){
        this._negociacaoService
                .apagarNegociacoes()
                .then(mensagem => {
                    this._mensagem.texto = mensagem;
                    this._listaNegociacoes.esvazia();
                })
                .catch(error => {
                    this._mensagem.texto = error;
                });
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
                parseInt(this._inputQuantidade.value),
                parseFloat(this._inputValor.value));
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}