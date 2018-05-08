import { createServer, Server } from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';

import { User } from '@xmobe/user';
import { NiceChain } from './nicechain';

class App {
  public express: express.Application;
  public niceChain: NiceChain;
  constructor() {
    this.express = express();

    this.niceChain = new NiceChain();

    // let user = new User({id: 'A001', first_name: 'Quang Anh', last_name: 'Le', email: 'quanganh@aiti.com.vn', phone: '+84904814938'});
    // console.log(user);

    this.config();
    this.routes();
  }

  /**
   * configuring the server
   */
  private config(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
      res
        .status(200)
        .send({
          message: 'Hello NiceBlock!'
        })
    });

    router.get('/blocks', (req: Request, res: Response) => {
      res
        .status(200)
        .send(this.niceChain.getBlockChain());
    });

    this.express.use('/', router)
  }
}

export default new App().express;