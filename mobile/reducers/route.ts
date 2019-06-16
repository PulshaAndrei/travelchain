import api from "./api";
import { loadBookings } from "./booking";

const initState = {
  routes: [],
  loading: false
};
  
export default function bookings(state = initState, action: any) {
  switch (action.type) {
		case 'SET_ROUTES':
			return { ...state, routes: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
		default:
			return state;
  }
}

function setLoading(loading: boolean) {
  return (dispatch: any) => dispatch({ type: 'SET_LOADING', payload: loading });
}

function setRoutes(value) {
  return (dispatch: any) => {
		dispatch({ type: 'SET_ROUTES', payload: value });
	}
}

export function loadRoutes() {
	return async (dispatch: any) => {
    dispatch(setLoading(true));
    const routes = (await api.get('Route')).data;
    for(let route of routes) {
      const routeElements = [];
      for (let elem of route.routeElements) {
        routeElements.push((await api.get(`RouteElement/${elem.split('#')[1]}`)).data);
      }
      route.routeElements = routeElements;
    }
    dispatch(setRoutes(routes));
    dispatch(setLoading(false));
	}
}

export function createRoute(newRoute: any) {
	return async (dispatch: any, getState: any) => {
    const routeElements = [];
    for(let elem of newRoute.routeElements) {
      const routeElement = {
        routeElementId: Math.random().toString(36).substr(2, 9),
        title: elem.title,
        description: elem.description,
        mediaType: 'IMAGE',
        mediaUrl: 'https://www.rfigroup.com/sites/default/files/header/rfimediaheader.png',
        usedContents: elem.usedContent.map(content => content.contentId),
      }
      await api.post('RouteElement', routeElement);
      routeElements.push(routeElement.routeElementId);
    }
    const route = {
      routeId: Math.random().toString(36).substr(2, 9),
      title: newRoute.title,
      description: newRoute.description,
      imageUrl: 'https://www.rfigroup.com/sites/default/files/header/rfimediaheader.png',
      date: '2019-06-14T08:59:35.034Z',
      status: 'OBSERVABLE',
      likes: [],
      routeElements,
      creator: getState().wallet.user.userId
    }
    await api.post('Route', route);
		await dispatch(loadRoutes());
	};
}

export function likeRoute(routeId: string) {
	return async (dispatch: any, getState: any) => {
    const like = {
      likeId: Math.random().toString(36).substr(2, 9),
      route: routeId,
      user: getState().wallet.user.userId
    }
    await api.post('LikeRoute', like);
		await dispatch(loadRoutes());
  }
} 

export function bookRoute(routeId: string, discount: number) {
	return async (dispatch: any, getState: any) => {
    const book = {
      bookingId: Math.random().toString(36).substr(2, 9),
      route: routeId,
      discount,
      owner: getState().wallet.user.userId
    }
    await api.post('BookRoute', book);
		await dispatch(loadBookings());
  }
} 

export function finishPriceTestingAuction(route: string) {
	return async (dispatch: any) => {
    await api.post('FinishTestPricingAuction', { route });
		await dispatch(loadRoutes());
  }
} 


// const routes = [
//   {
//     title: 'Tourist Classics',
//     description: 'Most of the classic Minsk attractions are located either on the Avenue itself or close to it. In fact, the Avenue itself is also a landmark and a unique sample of the Stalin Empire style. The artist and writer Artur Klinau has come up with the term “Sun City” to describe this part of Minsk as the main artery of the Big Communist Dream. ',
//     imageUrl: 'https://34travel.me/media/upload/images/2015/november/minsk/minsk_10.jpg',
//     status: 'Observable',
//     routeElements: [
//       {
//         title: 'Plošča Niezaležnasci',
//         description: 'You can start your tour at the Lenin monument, of which, for some reason, you are not allowed to take pictures. The monument faces the main building of the Belarusian State University with its back to the Government House, on the steps of which all the key events of December 19, 2010 took place. ',
//         imageUrl: 'https://34travel.me/media/upload/images/2015/november/minsk/minsk_10.jpg',
//       },
//       {
//         title: 'The National Library of Belarus',
//         description: 'This is the rhombicuboctahedron that has become one of the most controversial symbols of present-day Minsk. It was built quickly in the early 2000s; the entire country pitched in, sometimes on a willy-nilly basis. It has a view point and Book Museum tours as tourist attractions.',
//         imageUrl: 'https://www.belarus.by/dadvimages/001339_966430.jpg'
//       },
//     ]
//   },
//   {
//     title: 'Insights from Locals',
//     description: 'If you ask how the process of gentrification and revitalization is going on in Minsk, you can always point to the Kastryčnickaja’s example – the former industrial street has in recent years become pretty much the most important exhibition-and-hang-out place in the city.',
//     imageUrl: 'https://34travel.me/media/upload/images/2016/october/Minsk/minsk_01_s.jpg',
//     status: 'Price Testing',
//     username: 'business@email.com',
//     routeElements: [
//       {
//         title: 'OK16',
//         description: 'OK16 is a cultural hub, where on the area of 1500 sq.m. there’re performances, experimental music projects and huge parties. There’s also Ruin Bar with the cocktails named according to the building’s industrial past: “Sex in the workshop” or “From bell to bell”. Look for more points of alternative culture in Minsk in a separate guide.',
//         imageUrl: 'https://static.tildacdn.com/tild3263-6532-4133-a539-306633306361/logo_3D.png'
//       },
//       {
//         title: 'Ў Gallery',
//         description: 'Ў Gallery (19, vulica Kastryčnickaja) is a gallery of contemporary art which lets you feel the vibe of modern Belarusian (not only) artists, photographers, and performers. ',
//         imageUrl: 'http://en.ygallery.by/webroot/delivery/images/Event/events2018/34mag%20Y%20opening.jpg'
//       },
//       {
//         title: 'Cultural Center Korpus',
//         description: 'Cultural Center Korpus (9, praspiekt Mašerava). Educational programs, workshops, exhibitions, concerts, parties – you can enjoy all this in the old industrial building that has been transformed into the cool cultural center by BoPromo team. ',
//         imageUrl: 'http://www.bo-promo.com/wp-content/uploads/2017/06/1-2.jpg'
//       },
//     ]
//   },
//   {
//     title: 'Museum and Studio',
//     description: 'You will definitely enjoy the Azgur Museum. War heroes, communist idols, national writers – here you can get a feel for the entire 20th century through the prism of works of the key Belarus sculptor of that era.',
//     imageUrl: 'https://34travel.me/media/upload/images/2018/december/minsknew/IMG_0392.jpg',
//     status: 'Price Testing',
//     routeElements: [
//       {
//         title: 'OK16',
//         description: 'OK16 is a cultural hub, where on the area of 1500 sq.m. there’re performances, experimental music projects and huge parties. There’s also Ruin Bar with the cocktails named according to the building’s industrial past: “Sex in the workshop” or “From bell to bell”. Look for more points of alternative culture in Minsk in a separate guide.',
//         imageUrl: 'https://static.tildacdn.com/tild3263-6532-4133-a539-306633306361/logo_3D.png'
//       },
//       {
//         title: 'Ў Gallery',
//         description: 'Ў Gallery (19, vulica Kastryčnickaja) is a gallery of contemporary art which lets you feel the vibe of modern Belarusian (not only) artists, photographers, and performers. ',
//         imageUrl: 'http://en.ygallery.by/webroot/delivery/images/Event/events2018/34mag%20Y%20opening.jpg'
//       },
//       {
//         title: 'Cultural Center Korpus ',
//         description: 'Cultural Center Korpus (9, praspiekt Mašerava). Educational programs, workshops, exhibitions, concerts, parties – you can enjoy all this in the old industrial building that has been transformed into the cool cultural center by BoPromo team. ',
//         imageUrl: 'http://www.bo-promo.com/wp-content/uploads/2017/06/1-2.jpg'
//       },
//     ]
//   },
//   {
//     title: 'Vierchni Horad',
//     description: 'This is Minsk historic center where you can try to feel the spirit of the early 19th century city. This is where the Holy Spirit Cathedral is located.',
//     imageUrl: 'https://wherethesnowsgo.files.wordpress.com/2018/10/upper-town.jpg?w=2000&h=1500&crop=1',
//     status: 'Short List',
//     username: 'business@email.com',
//     routeElements: [
//       {
//         title: 'OK16',
//         description: 'OK16 is a cultural hub, where on the area of 1500 sq.m. there’re performances, experimental music projects and huge parties. There’s also Ruin Bar with the cocktails named according to the building’s industrial past: “Sex in the workshop” or “From bell to bell”. Look for more points of alternative culture in Minsk in a separate guide.',
//         imageUrl: 'https://static.tildacdn.com/tild3263-6532-4133-a539-306633306361/logo_3D.png'
//       },
//       {
//         title: 'Ў Gallery',
//         description: 'Ў Gallery (19, vulica Kastryčnickaja) is a gallery of contemporary art which lets you feel the vibe of modern Belarusian (not only) artists, photographers, and performers. ',
//         imageUrl: 'http://en.ygallery.by/webroot/delivery/images/Event/events2018/34mag%20Y%20opening.jpg'
//       },
//       {
//         title: 'Cultural Center Korpus ',
//         description: 'Cultural Center Korpus (9, praspiekt Mašerava). Educational programs, workshops, exhibitions, concerts, parties – you can enjoy all this in the old industrial building that has been transformed into the cool cultural center by BoPromo team. ',
//         imageUrl: 'http://www.bo-promo.com/wp-content/uploads/2017/06/1-2.jpg'
//       },
//     ]
//   },
// ];