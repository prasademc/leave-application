import { User } from './user.model';
import { UserStore } from './user.store.model';

export const USER_INITIAL_STATE: UserStore = {
	users: []
};

export const USER_INITIAL: User = {
	id: 1,
	firstName: "",
	lastName: "",
	maidenName: "",
	age: 0,
	gender: "",
	email: "",
	phone: "",
};
