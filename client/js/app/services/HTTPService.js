class HTTPService {

    get(url){
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

    post(url, dado) {
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