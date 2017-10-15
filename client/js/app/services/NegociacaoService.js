class NegociacaoService{
    /*
    cb = callback
    */
    obterNegociacaoDaSemana(cb){
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
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    /*
                        xhr.responseText: recupera um Texto
                        JSON.parse(xhr.responseText): Converte uma String para um array de objetos

                    */
                    cb(null, JSON.parse(xhr.responseText)
                    .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ) );
                    
                }else{
                    console.log('Ocorreu um erro!' + xhr.responseText);
                    cb('Nao foi possível importar as negociaçoes', null);
                }
            }
        }
        xhr.send();
    }
}