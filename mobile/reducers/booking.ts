const initState = {
	bookings: []
};
  
export default function bookings(state = initState, action: any) {
  switch (action.type) {
		case 'SET_BOOKINGS':
			return { ...state, bookings: action.payload };
		default:
			return state;
  }
}

function setBookings(value) {
  return (dispatch: any) => {
		dispatch({ type: 'SET_BOOKINGS', payload: value });
	}
}

export function loadBookings() {
	return async (dispatch: any) => {
		// TODO: request
		const bookings = [
      {
        title: 'Executing Title',
        status: 'Executing',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Executing Title 2',
        status: 'Executing',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'In auction Title',
        status: 'In auction',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
			},
			
      {
        title: 'Title 1',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Title 2',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Title 3',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
    ];
		dispatch(setBookings(bookings));
	}
}