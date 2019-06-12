const initState = {
	routes: []
};
  
export default function bookings(state = initState, action: any) {
  switch (action.type) {
		case 'SET_ROUTES':
			return { ...state, routes: action.payload };
		default:
			return state;
  }
}

function setRoutes(value) {
  return (dispatch: any) => {
		dispatch({ type: 'SET_ROUTES', payload: value });
	}
}

export function loadRoutes() {
	return async (dispatch: any) => {
		// TODO: request
		const routes = [
      {
        title: 'Route Details Title',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Observable Title 2',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
				username: 'business@email.com',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Observable Title 3',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Price Testing 1',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
				status: 'Price Testing',
				username: 'business@email.com',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Price Testing 2',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Price Testing',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Title 3',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Short List',
				username: 'business@email.com',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
    ];
		dispatch(setRoutes(routes));
	}
}

export function createRoute(newRoute: any) {
	return async (dispatch: any, getState: any) => {
		// TODO: request
		const routes = getState().route.routes;
		routes.push(newRoute);
		dispatch(setRoutes(routes));
	};
}