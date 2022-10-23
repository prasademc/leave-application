import { LeaveRequestStore } from './leave-request.store.model';

export const LEARV_REQUEST_INITIAL: LeaveRequestStore = {
	leaveRequest: {
		id: 0,
		applicantID: 0,
		managerID: 0,
		startDate: new Date(),
		endDate: new Date(),
		returnDate: new Date(),
		numberOfDays: 0,
		generalComments: '',
	},
};
