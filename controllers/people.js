"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleController = void 0;
const controller_1 = require("../src/utils/controller");
const decorator_1 = require("../src/utils/decorator");
const people_1 = require("../models/people");
class PeopleController extends controller_1.ControllerBase {
    getAll() {
        return [
            new people_1.People('Ana'),
            new people_1.People('Felipe'),
            new people_1.People('Emillia'),
        ];
    }
    create(people) {
        return people;
    }
}
__decorate([
    (0, decorator_1.httpGet)()
], PeopleController.prototype, "getAll", null);
__decorate([
    (0, decorator_1.httpPost)()
], PeopleController.prototype, "create", null);
exports.PeopleController = PeopleController;
