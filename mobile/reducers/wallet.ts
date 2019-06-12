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
        value: -140.50
      },
      {
        title: 'Content Royalty',
        date: new Date(),
        value: 3.00
      },
      {
        title: 'Content Royalty',
        date: new Date(),
        value: 2.5
      },
      {
        title: 'Route Author Bonus',
        date: new Date(),
        value: 5.75
      },
      {
        title: 'Like Bonus',
        date: new Date(),
        value: 0.01
      },
      {
        title: 'Booking',
        date: new Date(),
        value: -100.00
      },
    ];
		dispatch(setUser(user));
		dispatch(setTransactions(transactions));
	}
}