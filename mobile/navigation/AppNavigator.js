import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import DrawerComponent from '../components/Drawer';
import WalletScreen from '../screens/WalletScreen';
import BookingsScreen from '../screens/BookingsScreen';
import RoutesScreen from '../screens/RoutesScreen';
import ContentsScreen from '../screens/ContentsScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import ContentDetailsScreen from '../screens/ContentDetailsScreen';
import RouteElementDetailsScreen from '../screens/RouteElementDetailsScreen';
import BookRouteScreen from '../screens/BookRouteScreen';
import ContentCreateScreen from '../screens/ContentCreateScreen';
import RouteElementCreateScreen from '../screens/RouteElementCreateScreen';
import RouteCreateScreen from '../screens/RouteCreateScreen';
import ContentLinkScreen from '../screens/ContentLinkScreen';

export default createAppContainer(
  createDrawerNavigator({
    Wallet: WalletScreen,
    Routes: createStackNavigator({
      Routes: RoutesScreen,
      RouteDetails: RouteDetailsScreen,
      RouteElementDetails: RouteElementDetailsScreen,
      BookRoute: BookRouteScreen,
      RouteCreate: RouteCreateScreen,
      RouteElementCreate: RouteElementCreateScreen,
      ContentLink: ContentLinkScreen,
    },
    {
      initialRouteName: 'Routes',
      headerMode: 'none',
    }),
    Bookings: createStackNavigator({
      Bookings: BookingsScreen,
      BookingDetails: BookingDetailsScreen,
      RouteElementDetails: RouteElementDetailsScreen,
    },
    {
      initialRouteName: 'Bookings',
      headerMode: 'none',
    }),
    Content: createStackNavigator({
      Content: ContentsScreen,
      ContentDetails: ContentDetailsScreen,
      ContentCreate: ContentCreateScreen
    },
    {
      initialRouteName: 'Content',
      headerMode: 'none',
    }),
  },
  {
    initialRouteName: 'Wallet',
    contentComponent: DrawerComponent
  })
);
