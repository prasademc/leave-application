import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { LEARV_REQUEST_INITIAL } from '../domain/leave-request.const';
import { LeaveRequest } from '../domain/leave-request.model';
import { LeaveRequestStore } from '../domain/leave-request.store.model';

@Injectable()
export class LeaveRequestStoreService extends ComponentStore<LeaveRequestStore> {
	constructor() {
		super(LEARV_REQUEST_INITIAL);
	}

	readonly leaveRequest$ = this.select((state) => state.leaveRequest);

	readonly setLeaveRequest = this.updater(
		(state, leaveRequest: LeaveRequest) => ({
			...state,
			leaveRequest,
		})
	);

	readonly updateLeaveRequest = this.effect(
		(leaveRequest$: Observable<LeaveRequest>) =>
			leaveRequest$.pipe(
				tap((leaveRequest) =>
					this.setLeaveRequest(leaveRequest as LeaveRequest)
				)
			)
	);
}
