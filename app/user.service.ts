import {Injectable} from '@angular/core';
import {USERS} from './mock-users';

@Injectable()
export class UserService {
    getUsers() {
        return Promise.resolve(USERS);
    }
    getHero(id: number) {
        return Promise.resolve(USERS).then(
            users => users.filter(user => user.id === id)[0]
        );
    }
}
