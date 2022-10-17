import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		MatButtonModule,
		RouterModule,
	],
})
export class HomeModule {}
