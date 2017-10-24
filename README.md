# sampleJavaScript
Sample using JavaScript

Using Babel
Utilizando o babel
instalaçao por projeto:

1 - Pelo terminal, ir até o caminho onde estao os htmls, js etc;
2 - Babel é instalado pelo npm do node;
3 - npm init (irá criar o package.json)
4 - npm install babel-cli@6.10.1 --save-dev (--save-dev: vai salvar a depedencia no package.json)
5 - npm install babel-preset-es2015@6.9.0 --save-dev (o preset é o que vai "ensinar" como fazer a conversao do js para o babel utilizar)
6 - Precisa criar o arquivo .babelrc que é o arquivo de configuracao do babel que contém { "presets" : ["es2015"] }
7 - Este documento precisa estar na mesma estrutura onde foi instalado o babel;
8 - Após toda a instalação, será executado o babel;
9 - No arquivo package.json, precisa colocar dentro de "scripts" a propriedade "build": "babel js/app-es6 - d js/app"
10- js/app-es6 são os arquivos originais e o js/app é o arquivo gerado pelo babel que é onde as páginas estao importanto os js
11- No terminal, precisa executar o comando npm run build que irá executar o passo 9 que irá gerar os novos arquivos js
12- Para que seja feito um de-para dos arquivos novos com os originais, é preciso do source-maps. Para isso precisa alterar a propriedade build
13- "build": "babel js/app-es6 - d js/app --source-maps" (Com isso, cada arquivo js gerado tem mapeado o arquivo original)
14- Para que nao precise ficar rodando o build em cada alteraçao do js, existe um observador do babel que irá automaticamente gerar uma nova traduçao no arquivo que esta sendo alterado
15- "watch": "babel js/app-es6 - d js/app --source-maps --watch"
16- para executar, precisa no terminar executar npm run watch 
