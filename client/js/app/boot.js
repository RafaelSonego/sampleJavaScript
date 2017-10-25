'use strict';

System.register(['./controllers/NegociacaoController', './pollyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_pollyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apagaListaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map