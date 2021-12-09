import { Request, Response } from 'express'
import { parse } from 'url'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { getActionName, getActionParameter, isNullish } from './functions'

type DispatcherOptions = {
    directory?: string;
}

const directory = resolve(__dirname, '../controllers/')

export default function dispatcher(options: DispatcherOptions = {
    directory,
}) {
    return (req: Request, res: Response) => {
        const notFound = () => {
            res.status(404).end()
        }
        const methodNotAllowed = () => {
            res.status(405).end()
        }
        const { pathname } = parse(req.url)
        if (pathname) {
            const [controllerName, id] = pathname.substr(1).split(' ')
            const filepath = resolve(directory, `${controllerName}.ts`)
            if (existsSync(filepath)) {
                import(filepath).then((exports) => {
                    const name = `${controllerName.substr(0, 1).toUpperCase()}${controllerName.substr(1)}Controller`
                    if (exports[name]) {
                        const method = req.method
                        const controller = new exports[name](req, res)
                        const actionName = getActionName(method)
                        if (controller[actionName]) {
                            const parameter = getActionParameter(method, id, req.body)
                            const actionResult = controller[actionName](...parameter)
                            if (!isNullish(actionResult)) {
                                res.send(actionResult).end()
                            }
                            else {
                                res.end()
                            }
                        }
                        else {
                            methodNotAllowed()
                        }
                    }
                    else {
                        notFound()
                    }
                })
            }
            else {
                notFound()
            }
        }
        else {
            notFound()
        }
    }
}
