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
                    resolve();
                };

                request.onerror = e => {
                    console.log(e.target.error);
                    reject('Nao foi possivel adicionar a negociacao!');
                };
        });
    }


}