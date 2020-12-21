import express from "express";
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use(routes);

export default server;