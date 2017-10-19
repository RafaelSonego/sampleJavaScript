var connectionFactory = (function (){ //Funcao anonima
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'sonegoTeste';

    var connection = null;
    var close;
    return class ConnectionFactory {
    
        constructor(){
            throw Error('Nao é possivel criar instancias de ConnectionFactory');
        }
    
        static getConnection(){
    
            return new Promise((resolve, reject) =>{
                let openRequest = window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = e => {
                    //e.target.result: Retorna uma connection
                    ConnectionFactory._createStores(e.target.result);
                }
    
                openRequest.onsuccess = e => {
                    if(!connection){
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Nao é possível fechar a conexao diretamente!');
                        }
                    }
                    resolve(connection);
                }
    
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
    
    
    
            });
        }
    
        static _createStores(connection){
            stores.forEach(store =>{
                if(connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }
    }
})();//será carregada e logo depois executada!


