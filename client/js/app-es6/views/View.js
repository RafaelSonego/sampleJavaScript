export class View{

    constructor(element){
        this._element = element;
    }

    update(model){
        this._element.innerHTML = this.template(model);
    }

    template(model){
        throw new Error('O metodo template precisa ser implementado');
    }

}