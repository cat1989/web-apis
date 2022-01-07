# web-apis

Build secure REST APIs

```typescript
class PeopleController extends ControllerBase {
    @httpGet()
    getAll() {
        return [
            new People('Ana'),
            new People('Felipe'),
            new People('Emillia'),
        ]
    }
}

class People {
    name: string;

    constructor(name: string) {
        this.name = name
    }
}
```

```powershell
curl http://localhost/people

[{"name":"Ana"},{"name":"Felipe"},{"name":"Emillia"}]
```

