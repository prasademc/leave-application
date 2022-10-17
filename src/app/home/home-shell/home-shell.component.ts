import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home-shell',
	templateUrl: './home-shell.component.html',
	styleUrls: ['./home-shell.component.scss'],
})
export class HomeShellComponent {
	constructor(private router: Router) {}

	requestLeave(event: MouseEvent): void {
		this.router.navigateByUrl("/leave-request")
	}
}
