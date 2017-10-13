/*
    Prop: Propriedade chamada
    Target: Objeto Original
    Receiver: Referencia ao proxy
    Executado quando acontecer alguma leitura de propriedade
    get: function(target, prop, receiver) {
        console.log(`prop: "${prop}"`);
            return Reflect.get(target, prop, receiver); 
    }
*/
class ProxyFactory{
    /*
        Obj = Objeto que será criado a proxy
        props = array de propriedades
        action = acao que será executada
    */
    static create(obj, props, action){
        return new Proxy(obj, {
            get(target, prop, receiver) {
                /*
                    Caso a propriedade exista dentro da lista de propriedades passada por parametro e seja uma funçao
                */
                if(props.includes(prop) && ProxyFactory._isFunction(prop)){
                    return function(){
                        console.log(`${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if(props.includes(prop)){
                    target[prop] = value;
                    action(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(func){
        return typeof(func) == typeof(Function);
    }
}