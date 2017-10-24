import {ProxyFactory} from '../services/ProxyFactory';
export class Bind {
    //No js o construtor pode ter return e devolver uma instancia de outro obj, neste caso esta devolvendo o proxy
    constructor(model, view, ...props){
        let proxy = ProxyFactory.create(model, props, (model) => view.update(model));
        view.update(model)
        return proxy;
    }

}   