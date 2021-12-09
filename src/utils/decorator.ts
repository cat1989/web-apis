export function httpGet() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.get = target[propertyKey]
    }
}

export function httpPost() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.create = target[propertyKey]
    }
}

export function httpPut() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.update = target[propertyKey]
    }
}

export function httpDelete() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.delete = target[propertyKey]
    }
}
