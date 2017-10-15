class DateHelper {

    constructor() {
        throw new Error('Esta classe nao pode ser instanciada - Metodos estaticos');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() - 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error('Formato da data precisa ser yyyy-mm-dd');
        }
        return new Date(...texto.split('-').map((item, indice) => item - item % 2));
    }

}