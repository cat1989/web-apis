import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import dispatcher  from './utils/dispatcher'

export class WebApiServer {
    protected app: Express;

    protected port: number;

    rootDirectory: string = './controllers';

    constructor(port: number) {
        this.app = express()
        this.port = port
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
    }

    use(middleware: (req: Request, res: Response, next: NextFunction) => void) {
        this.app.use(middleware)
    }

    run() {
        this.app.use(dispatcher({
            directory: this.rootDirectory,
        }))
        this.app.listen(this.port)
    }
}
