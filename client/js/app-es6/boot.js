import {currentInstance} from './controllers/NegociacaoController';
import {} from './pollyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apagaListaNegociacoes.bind(negociacaoController);
