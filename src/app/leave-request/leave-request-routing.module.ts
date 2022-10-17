import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestShellComponent } from './leave-request-shell/leave-request-shell.component';

const routes: Routes = [
	{
		path: '',
		component: LeaveRequestShellComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LeaveRequestRoutingModule {}
