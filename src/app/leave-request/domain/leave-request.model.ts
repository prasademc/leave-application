export interface LeaveRequest {
	id?: number;
	applicantID: number;
	managerID: number;
	startDate: Date;
	endDate: Date;
	returnDate: Date;
	numberOfDays: number;
	generalComments: string;
}
