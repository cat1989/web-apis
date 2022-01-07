export function getActionName(method: string) {
    switch (method.toLowerCase()) {
        case 'post':
            return 'create'
        case 'put':
        case 'patch':
            return 'update'
        case 'delete':
            return 'delete'
        default:
            return 'get'
    }
}

export function getActionParameter(method: string, id: string, body: Record<string, any>) {
    switch (method.toLowerCase()) {
        case 'post':
            return [body]
        case 'put':
        case 'patch':
            return [id, body]
        case 'delete':
            return [id]
        default:
            return [id]
    }
}

export function isNullish(value: any) {
    return value === null || value === undefined
}
