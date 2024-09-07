import cors from 'cors';
import http from 'http';
import express from 'express';
import router from '../routes/index.js';

export class ExpressServer {
  #app;
  #server;
  #env;
  #port;

  constructor() {
    this.#app = express();
    this.#server = http.createServer(this.#app);
    this.#env = process.env.NODE_ENV || 'development';
    this.#port = parseInt(process.env.PORT, 10) || 5000;
  }

  #middlewares() {
    this.#app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST'],
      })
    );

    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
  }

  #routes() {
    this.#app.use('/', router);
  }

  #run() {
    this.#server.listen(this.#port, () => {
      console.info(`Server is running on port: ${this.#port}`);
    });
  }

  async setup() {
    this.#middlewares();
    this.#routes();
    this.#run();
  }
}

export default new ExpressServer();
