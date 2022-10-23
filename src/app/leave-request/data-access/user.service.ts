import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

import { User } from '../domain/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	API_BASE_URL = './assets/data/users.json';

	constructor(private http: HttpClient) {}

	getUsers$(): Observable<Array<User>> {
		return this.http.get<Array<User>>(`${this.API_BASE_URL}`).pipe(
			map((Users) => Users),
			retry(3),
			catchError((err) => {
				this.handleError(err);
				return throwError(() => err);
			})
		);
	}

	private handleError(err: HttpErrorResponse): void {
		console.log(err);
	}
}
