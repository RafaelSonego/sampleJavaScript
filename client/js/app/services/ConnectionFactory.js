var connectonFactory = (function (){ //Funcao anonima
    var stores = ['negociacoes'];
    var version = 4;
    var dbName = 'sonegoTeste';
    var connection = null;
    
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
    }
})();//será carregada e logo depois executada!


