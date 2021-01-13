# NODE-JS-CHARTS-FLUTTER-MONGODB

Back-end escrito em **TypeScript** com **NodeJS** da aplicação CHARTS APP FLUTTER, com o MongoDB como banco de dados e jwt para autenticação. Total 2 Models. User e Chart.

Num geral, o banco de dados está hospedado no localhost, rodando isoladamente dentro de um container docker com a imagem do MongoDB, a conexão se dá pelo mongoose, e o **express** foi usado para a criação de rodas API dentro do back-end. Como: GET, POST, PATCH/PUT, DELETE.

Houve também o fator de autenticação, usando o **JsonWebToken** para gerar tokens e também servir como middlewares para rotas que dependem de autenticação.

Há dois Models.

**User**, armazena atributos como: email e password.

**Chart**, armazena atributos como: title, type, values e owner. 

<i> Em **Chart**, o atributo owner é relacionado com os ID's no model **User**, da mesma forma que em User há uma relação com o model Chart, que futuramente pode ser dar o acesso dos dados através do populate <i/>
  
  
 
