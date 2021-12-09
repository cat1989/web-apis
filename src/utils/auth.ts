import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

type AuthOptions = {
    schema?: string;
    secret: string;
}

export default function auth({
    schema: defaultSchema = 'Bearer',
    secret,
}: AuthOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
        const unauthorized = () => {
            res.status(401).end()
        }
        const authorization = req.headers.authorization
        if (authorization) {
            const [schema, token] = authorization.split(" ")
            if (defaultSchema !== schema || token === undefined) {
                unauthorized()
            }
            else {
                try {
                    if (verify(token, secret)) {
                        next()
                    }
                    else {
                        unauthorized()
                    }
                }
                catch {
                    unauthorized()
                }
            }
        }
        else {
            unauthorized()
        }
    }
}
