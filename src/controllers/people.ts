import { ControllerBase } from '../utils/controller'
import { httpGet, httpPost } from '../utils/decorator'
import { People } from '../models/people'

export class PeopleController extends ControllerBase {
    @httpGet()
    getAll() {
        return [
            new People('Ana'),
            new People('Felipe'),
            new People('Emillia'),
        ]
    }

    @httpPost()
    create(people: People) {
        return people
    }
}
