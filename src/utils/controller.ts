import { Request, Response } from 'express'

export class ControllerBase {
    protected request: Request;

    protected response: Response;

    constructor(request: Request, response: Response) {
        this.request = request
        this.response = response
    }

    created(url: string) {
        this.response.setHeader('Location', url)
        this.response.status(201).end()
    }

    notFound() {
        this.response.status(404).end()
    }
}
