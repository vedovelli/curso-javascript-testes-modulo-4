## API REST com Express

![Arquitetura](https://github.com/vedovelli/curso-javascript-testes-modulo-4/blob/master/support/Architecture.jpg?raw=true)

Este projeto é parte integrate do curso **Aprenda a Testar Aplicações Javascript** (https://javascript.tv.br) e dá suporte ao módulo 4: _desenvolvimento e testes server side com Node.js e Express_.

### Ferramentas Base

O projeto utiliza **Express.js** (https://expressjs.com/en/starter/installing.html) para roteamento e controle de requisições HTTP e **Sequelize ORM** (https://sequelize.org/master/) para interface com o banco de dados. Para manter a configuração o mais simples possível, o banco de dados escolhido foi o **SQLite** porém, como explicado em [`/src/database/models/index.js`](https://github.com/vedovelli/curso-javascript-testes-modulo-4/blob/master/src/database/models/index.js) a troca de banco de dados é muito simples, tendo como único pré-requisito o suporte dentro do ORM (Sequelize).

### Testes

O projeto já conta com o **Jest** como test runner e 3 scripts npm estão a disposição para executar os testes em modo _watch_ ou com a geração do relatório de _coverage_.

O branch `master` não contém qualquer teste pois é o ponto de partida para as aulas. Você pode no entanto escrever seus testes e nomear os arquivos com `.spec.js` ou `.test.js` e o Jest fará seu trabalho.

### Logs

O gerenciamento de logs está a cargo do **Winston** e dois de seus transportes estão habilitados: **console** e **file**. Mais transportes podem ser adicionados sob demanda.

### Instalação e execução

Pré-requisito: **Node versão 12+**.

1. Faça o clone do repositório e utilizando o Terminal execute `npm install` ou `yarn`;
2. Copie o `.env.example` para `.env` e mantenha seu conteúdo;
   - Este arquivo faz parte do .gitignore e não deve ser enviado para o controle de versão, pois contém informações pertinentes ao seu ambiente local e, possivelmente, dados sensíveis.
3. Execute `npm run dev` ou `yarn dev` para executar o servidor, que estará disponível na porta 3000. Caso deseje mudar a porta faça isso no arquivo `.env`;
4. Utilize o arquivo encontrado em [`/support`](https://github.com/vedovelli/curso-javascript-testes-modulo-4/blob/master/support/) para carregar as requisições HTTP usadas para testar manualmente a API. O arquivo funciona no aplicativo **Insomnia** (https://insomnia.rest/), **Paw** (https://paw.cloud/) ou **Postman** (https://www.postman.com/).
