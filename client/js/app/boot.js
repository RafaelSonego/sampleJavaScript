'use strict';

System.register(['./controllers/NegociacaoController', './pollyfill/fetch'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }, function (_pollyfillFetch) {}],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apagaListaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map