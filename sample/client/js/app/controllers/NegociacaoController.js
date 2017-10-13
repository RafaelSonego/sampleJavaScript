class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#divTableNegociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                        this._negociacoesView,
                                        'adiciona','esvazia');

        this._mensagemView = new MensagemView($('#divMensagemAlerta'));
        this._mensagem = new Bind(new Mensagem(),
                                  this._mensagemView,
                                  'texto');
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso!';
        
        this._limpaFormulario();
    }

    apagaListaNegociacoes(){
        this._listaNegociacoes.esvazia();
        
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
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