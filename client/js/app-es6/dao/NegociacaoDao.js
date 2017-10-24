class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject)=>{
             //Abre uma transacao de leitura e escrita para o objeto negociacoes
             let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

                request.onsuccess = e => {
                    resolve();//Neste caso nao esta retornando nada dentro do resolve
                };

                request.onerror = e => {
                    console.log(e.target.error);
                    reject('Nao foi possivel adicionar a negociacao!');
                };
        });
    }

    listarTodos(){
        return new Promise((resolve, reject) =>{
            let cursor = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .openCursor();

            let listaNegociacoes = [];

            cursor.onsuccess = e =>{
                //Aponta para o primeiro elemento que esta gravado
                let atual = e.target.result;
                if(atual){
                    //Retorna as propridades que foram guardadas
                    var dado = atual.value;   
                    listaNegociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    //Aponta para o proximo elemento gravado
                    //e chama novamente o evento onsuccess
                    atual.continue();
                }else {
                    resolve(listaNegociacoes);
                }
            };

            cursor.onerror = e =>{
                console.log(e.target.error);
                reject('Nao foi possivel listar as negociacoes');
            };
        });
    }

    apagaTodos(){
        return new Promise((resolve, reject) =>{
            let request = this._connection
                    .transaction([this._store], 'readwrite')
                    .objectStore(this._store)
                    .clear();
            request.onsuccess = e => {
                resolve('Banco de dados foi limpo');
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Nao foi possivel limpar o banco de dados');
            }
        });
    }


}