import { ControllerBase } from '../src/utils/controller'
import { httpGet, httpPost } from '../src/utils/decorator'
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
