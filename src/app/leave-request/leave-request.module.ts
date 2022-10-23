import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';

// Import materils modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

// Import components
import { LeaveRequestShellComponent } from './leave-request-shell/leave-request-shell.component';
import { LeaveRequestFormComponent } from './feature/leave-request-form/leave-request-form.component';
import { NotificationComponent } from './ui/notification/notification.component';

@NgModule({
	declarations: [
		LeaveRequestShellComponent,
		LeaveRequestFormComponent,
		NotificationComponent,
	],
	imports: [
		CommonModule,
		LeaveRequestRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatDatepickerModule,
		TextFieldModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatIconModule,
	],
})
export class LeaveRequestModule {}
