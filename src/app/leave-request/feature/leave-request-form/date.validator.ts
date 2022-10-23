import { AbstractControl } from '@angular/forms';

export function ValidateEndDate(control: AbstractControl) {
	if (!control.value.startsWith('https') || !control.value.includes('.io')) {
		return { invalid: true };
	}
	return null;
}

export function ValidateReturnDate(control: AbstractControl) {
	if (!control.value.startsWith('https') || !control.value.includes('.io')) {
		return { invalid: true };
	}
	return null;
}
