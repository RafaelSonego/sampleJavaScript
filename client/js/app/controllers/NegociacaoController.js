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

        // Na programacao funcional , sabemos que se tiver uma linha, nao precisamos colocar o return
        ConnectionFactory
                        .getConnection() // minha getConnection retorna uma connection que precisamos saber para utilizar o then
                        .then(connection => new NegociacaoDao(connection)) // com a connection, instancio o NegociacaoDao passando a connection como parametro
                        .then(dao => dao.listarTodos()) // resolve esta retornando uma lista de negociacoes que poderei pegar no then
                        .then(listaNegociacoes => { //Recupero a lista de negociacoes
                            listaNegociacoes.forEach(negociacao => {
                                this._listaNegociacoes.adiciona(negociacao);
                            });
                        })
                        .catch(error => {
                            this._mensagem.texto = error;
                        });

        /* Maneira mais verbosa
        ConnectionFactory
                    .getConnection()
                    .then(connection => {
                        new NegociacaoDao(connection)
                            .listarTodos()
                            .then(listaNegociacoes => {
                                listaNegociacoes.forEach(negociacao => {
                                    this._listaNegociacoes.adiciona(negociacao);
                                });
                            });
        });
        */
    }

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)//Persiste no banco indexeddb
                        .then(() => {
                            this._listaNegociacoes.adiciona(this._criaNegociacao());
                            this._mensagem.texto = 'Negociacao adicionada com sucesso!';
                            this._limpaFormulario();
                        });
                        
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            });
    }

    importaNegociacoes(){

        let negociacaoService = new NegociacaoService();
        negociacaoService.obterTodasAsNegociacoes()
                         .then(listaNegociacoes => {
                             listaNegociacoes.forEach(negociacao => {
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
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
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