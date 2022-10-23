import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	Observable,
	Subscription,
	tap,
	map,
	debounceTime,
	takeUntil,
	Subject,
	distinctUntilChanged,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// import services
import { UserStoreService } from '../../application/user-store.service';
import { LeaveRequestStoreService } from '../../application/leave-request-store.service';

// Import interfaces and const
import { User } from '../../domain/user.model';

// Import components
import { NotificationComponent } from '../../ui/notification/notification.component';

// Import validator class
import { validateEndDate } from './date.validator';

@Component({
	selector: 'app-leave-request-form',
	templateUrl: './leave-request-form.component.html',
	styleUrls: ['./leave-request-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UserStoreService, LeaveRequestStoreService],
})
export class LeaveRequestFormComponent implements OnInit, OnDestroy {
	leaveRequestFormGroup: FormGroup;
	users$!: Observable<Array<User>>;
	subscription: Subscription = new Subscription();
	today: Date = new Date();
	private destroy$ = new Subject();
	datePattern: string =
		'^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)d{4}$';
	durationInSeconds = 10;

	constructor(
		private fb: FormBuilder,
		private userStoreService: UserStoreService,
		private leaveRequestStoreService: LeaveRequestStoreService,
		private _snackBar: MatSnackBar
	) {
		this.leaveRequestFormGroup = this.fb.group(
			{
				applicantID: ['', Validators.required],
				managerID: ['', Validators.required],
				startDate: [new Date(), [Validators.required]],
				endDate: [new Date(), [Validators.required]],
				returnDate: [new Date(), [Validators.required]],
				numberOfDays: [0, Validators.required],
				generalComments: [
					'',
					[Validators.required, Validators.maxLength(500)],
				],
			},
			{ validator: validateEndDate('startDate', 'endDate', 'returnDate') }
		);
	}

	ngOnInit(): void {
		this.userStoreService.fetchUsers(null);
		this.users$ = this.userStoreService.users$;

		this.subscription.add(
			this.leaveRequestFormGroup
				.get('endDate')
				?.valueChanges.pipe(
					debounceTime(100),
					distinctUntilChanged(),
					takeUntil(this.destroy$),
					tap((endDate) => {
						if (endDate > 0) {
							this.leaveRequestFormGroup.controls[
								'numberOfDays'
							].setValue(
								this.setNumberOfDays(
									this.leaveRequestFormGroup.get('startDate')
										?.value,
									endDate
								)
							);
						}
					})
				)
				.subscribe()
		);

		this.subscription.add(
			this.leaveRequestFormGroup
				.get('applicantID')
				?.valueChanges.pipe(
					debounceTime(100),
					distinctUntilChanged(),
					takeUntil(this.destroy$),
					tap((applicantID) => {
						if (applicantID > 0) {
							this.checkStatusOfApplicantAndManager(
								applicantID,
								this.leaveRequestFormGroup.get('managerID')
									?.value
							);
						}
					})
				)
				.subscribe()
		);

		this.subscription.add(
			this.leaveRequestFormGroup
				.get('managerID')
				?.valueChanges.pipe(
					debounceTime(100),
					distinctUntilChanged(),
					takeUntil(this.destroy$),
					tap((managerID) => {
						if (managerID > 0) {
							this.checkStatusOfApplicantAndManager(
								this.leaveRequestFormGroup.get('applicantID')
									?.value,
								managerID
							);
						}
					})
				)
				.subscribe()
		);

		this.subscription.add(
			this.leaveRequestFormGroup?.valueChanges
				.pipe(
					debounceTime(100),
					distinctUntilChanged(),
					takeUntil(this.destroy$),
					tap((values) => {
						const lRequest = {
							applicantID: values.applicantID,
							managerID: values.managerID,
							startDate: values.startDate,
							endDate: values.endDate,
							returnDate: values.returnDate,
							numberOfDays: values.numberOfDays,
							generalComments: values.generalComments,
						};

						this.leaveRequestStoreService.updateLeaveRequest(
							lRequest
						);
					})
				)
				.subscribe()
		);
	}

	ngOnDestroy(): void {
		if (!!this.subscription) this.subscription.unsubscribe();
		this.destroy$.next(null);
		this.destroy$.complete();
	}

	/**
	 * Submit the reave request
	 * @param event
	 */
	public onRequestLeave(event: MouseEvent): void {
		this.leaveRequestStoreService.leaveRequest$.subscribe((lRequest) =>
			console.log('Leave Request: ', lRequest)
		);
	}

	/**
	 * Reset the form
	 * @param event
	 */
	public onCancel(event: MouseEvent): void {
		this.leaveRequestFormGroup.patchValue({
			applicantID: '',
			managerID: '',
			startDate: new Date(),
			endDate: new Date(),
			returnDate: new Date(),
			numberOfDays: 0,
			generalComments: '',
		});
	}

	/**
	 * Check the applicant and manage are same
	 * @param applicantID
	 * @param managerID
	 */
	private checkStatusOfApplicantAndManager(
		applicantID: number,
		managerID: number
	): void {
		if (applicantID === managerID) {
			this.openSnackBar(
				'Accplicate and Manager can not be the same person',
				'close'
			);
		}
	}

	/**
	 * Open the notification bar
	 * @param msg
	 * @param act
	 */
	private openSnackBar(msg: string, act: string) {
		this._snackBar.openFromComponent(NotificationComponent, {
			data: {
				message: msg,
				action: act,
			},
			duration: this.durationInSeconds * 1000,
		});
	}

	/**
	 * Calculate the number of days
	 * @param sDate
	 * @param eDate
	 * @returns number
	 */
	private setNumberOfDays(sDate: Date, eDate: Date): number {
		const startDate = new Date(sDate);
		const endDate = new Date(eDate);
		let difference = endDate.getTime() - startDate.getTime();
		return Math.ceil(difference / (1000 * 3600 * 24));
	}
}
