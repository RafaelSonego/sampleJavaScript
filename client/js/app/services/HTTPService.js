class HTTPService {

    _handleErrors(res){
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url){
        //fetch é uma promise
        return fetch(url)
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }

    post(url, dado){
        //para o post, iremos passar a url e um objeto contendo as informacoes para o POST
        return fetch(url, {
            headers: { 'content-type' : 'application/json' },
            method : 'post', //método que estou chamando do HTTP
            body: JSON.stringify(dado) //meu obj que será passado no post como String
        })
        .then(res => this._handleErrors(res));
    }

    getOld(url){
        return new Promise((resolve, reject) => {
            /*
                xhr.readyState = 
                    0: requisiçao ainda nao iniciada
                    1: conexao com o servidor estabelecida
                    2: requisicao recebida
                    3: processando requisicao
                    4: requisicao concluida e a resposta esta pronta
            */
            let xhr = new XMLHttpRequest();
            //Passa o metodo HTTP e qual é o endereço do serviço, Neste caso esta no mesmo servidor
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        /*
                            xhr.responseText: recupera um Texto
                            JSON.parse(xhr.responseText): Converte uma String para um array de objetos
                            .map itera a lista de objetos recebendo uma funcao que para cada objeto irá criar um objeto de negociacao
                            resolve(
                                JSON.parse(xhr.responseText).map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ) 
                               );
                        */
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        console.log('Ocorreu um erro!' + xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }

    postOld(url, dado) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
        });

    }    

}