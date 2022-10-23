import { FormGroup } from '@angular/forms';

export function validateEndDate(
	startDate: string,
	endDate: string,
	returnDate: string
) {
	return (formGroup: FormGroup) => {
		const sDate = formGroup?.controls[startDate]?.value;
		const eDate = formGroup?.controls[endDate]?.value;
		const rDate = formGroup?.controls[returnDate]?.value;

		if (sDate && eDate && rDate) {
			const isEndValid = eDate.getTime() - sDate.getTime() > 0;
			const isReturnValid = rDate.getTime() - sDate.getTime() > 0 && rDate.getTime() - eDate.getTime() > 0;

			!isEndValid
				? formGroup?.controls[endDate].setErrors({ dateRange: true })
				: formGroup?.controls[endDate].setErrors(null);
			!isReturnValid
				? formGroup?.controls[returnDate].setErrors({ dateRange: true })
				: formGroup?.controls[returnDate].setErrors(null);
		}
	};
}
