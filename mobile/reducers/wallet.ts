const initState = {
	user: {},
	transactions: [],
};
	
export default function wallet(state = initState, action: any) {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_TRANSACTIONS':
			return { ...state, transactions: action.payload };
		default:
			return state;
	}
}

function setUser(user: any) {
	return (dispatch: any) => dispatch({ type: 'SET_USER', payload: user });
}

function setTransactions(transactions: any[]) {
	return (dispatch: any) => dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
}

export function loadUser() {
	return async (dispatch: any) => {
		const user = {
			firstName: 'Test',
			lastName: 'User',
			username: 'business@email.com',
			travelCoins: 156.56
		};
		const transactions = [
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
    ];
		dispatch(setUser(user));
		dispatch(setTransactions(transactions));
	}
}