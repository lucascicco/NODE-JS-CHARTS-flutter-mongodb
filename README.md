# NODE-JS-CHARTS-FLUTTER-MONGODB

Back-end escrito em **TypeScript** com **NodeJS** da aplicação CHARTS APP FLUTTER, com o MongoDB como banco de dados e jwt para autenticação. Total 2 Models. User e Chart.

Num geral, o banco de dados está hospedado no localhost, rodando isoladamente dentro de um container docker com a imagem do MongoDB, a conexão se dá pelo mongoose, e o **express** foi usado para a criação de rodas API dentro do back-end. Como: GET, POST, PATCH/PUT, DELETE.

Houve também o fator de autenticação, usando o **JsonWebToken** para gerar tokens e também servir como middlewares para rotas que dependem de autenticação.

Há dois Models.

**User**, armazena atributos como: email e password.

**Chart**, armazena atributos como: title, type, values e owner. 

<i> Em **Chart**, o atributo owner é relacionado com os ID's no model **User**, da mesma forma que em User há uma relação com o model Chart, que futuramente pode ser dar o acesso dos dados através do populate <i/>
  
<hr/>
  
Back-end written in **TypeScript** with **NodeJS** of the CHARTS APP FLUTTER application, with MongoDB as a database and jwt for authentication. Total 2 Models. User and Chart.

In general, the database is hosted on localhost, running in isolation inside a docker container with the MongoDB image, the connection is through the mongoose, and **express** was used to create API wheels inside the back-end. Like: GET, POST, PATCH / PUT, DELETE.

There was also the authentication factor, using **JsonWebToken** to generate tokens and also serve as middleware for routes that depend on authentication.

There are two Models.

**User**, stores attributes such as: email and password.

**Chart**, stores attributes such as: title, type, values and owner.

<i> In **Chart**, the owner attribute is related to the ID's in the **User** model, in the same way that in User there is a relationship with the Chart model, which in the future may be giving access to the data through of the populate <i/>


Bibliotecas/Libraries: 

 - express
 - express-validator
 - helmet
 - jsonwebtoken
 - mongoose
 - nodemon
 - dotenv
 - body-parser

<hr/>

Desenvolvido por,
 
Developed by,

Lucascicco.
 
 
