import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

// Import service
import { UserService } from '../data-access/user.service';

// Import interfaces
import { UserStore } from '../domain/user.store.model';
import { USER_INITIAL_STATE } from '../domain/user.const';
import { User } from '../domain/user.model';
import {
	catchError,
	EMPTY,
	Observable,
	switchMap,
	tap
} from 'rxjs';

@Injectable()
export class UserStoreService extends ComponentStore<UserStore> {
	constructor(private userService: UserService) {
		super(USER_INITIAL_STATE);
	}

	readonly users$ = this.select((state) => state.users);

	readonly setUsers = this.updater((state, users: Array<User>) => ({
		...state,
		users,
	}));

	readonly fetchUsers = this.effect((users$: Observable<null>) =>
		users$.pipe(
			switchMap(() =>
				this.userService.getUsers$().pipe(
					tap((products) => this.setUsers(products)),
					catchError(() => EMPTY)
				)
			)
		)
	);
}
