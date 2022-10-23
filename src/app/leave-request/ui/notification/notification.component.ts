import { Component, Inject, OnInit } from '@angular/core';
import {
	MatSnackBarRef,
	MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { INotification } from '../../domain/norification.model';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
	constructor(
		public sbRef: MatSnackBarRef<NotificationComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: INotification
	) {}
}
