import {NegociacaoController} from './controllers/NegociacaoController';
import {} from './pollyfill/fetch';

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apagaListaNegociacoes.bind(negociacaoController);
