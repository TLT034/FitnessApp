import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions,
    createBottomTabNavigator
} from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import store from '../redux/store/reduxStore';

import HomeScreen from '../screens/HomeScreen';
import RewardScreen from '../screens/RewardScreen';
import ActivityHistoryScreen from '../screens/ActivityHistoryScreen';
import DuringActivityScreen from '../screens/DuringActivityScreen';
import StartActivityScreen from '../screens/StartActivityScreen';
import PostActivityScreen from '../screens/PostActivityScreen';
import CameraScreen from '../screens/CameraScreen';
import PicPreviewScreen from '../screens/PicPreviewScreen';
import IndividualActivityScreen from '../screens/IndividualActivityScreen';
import IndivdualRewardScreen from '../screens/IndivdualRewardScreen';

// Main navigation class to handle all routing 
let NavigationService = class NavigationService {
    constructor() {
    }

    getTopNavigator() {
        return (
            <Provider store={store}>
                <TopLevelNavigator
                    ref={navigatorRef => {
                        this._navigator = navigatorRef;
                    }}
                />
            </Provider>
        );
    }

    // Navigate to any screen
    navigate(routeName, params) {
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    goBack() {
        this._navigator.dispatch(
            NavigationActions.back()
        );
    }
}

const navigationService = new NavigationService();
export default navigationService;

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        StartActivity: StartActivityScreen,
        DuringActivity: DuringActivityScreen,
        PostActivity: PostActivityScreen,
        Camera: CameraScreen,
        PicPreview: PicPreviewScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#03256C',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flexGrow: 1,
                color: 'white'
            }
        }
    }
);

const RewardStack = createStackNavigator(
    {
        Rewards: RewardScreen,
        IndividualReward: IndivdualRewardScreen,
        IndividualActivity: IndividualActivityScreen
    },
    {
        defaultNavigationOptions: {
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#03256C',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flexGrow: 1,
                color: 'white'
            }
        }
    }
);

const ActivityStack = createStackNavigator(
    {
        Activities: ActivityHistoryScreen,
        IndividualActivity: IndividualActivityScreen
    },
    {
        defaultNavigationOptions: {
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#03256C',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flexGrow: 1,
                color: 'white'
            }
        }
    }
);

const TopLevelNavigator = createAppContainer(createBottomTabNavigator(
    {
        Home: HomeStack,
        Activities: ActivityStack,
        Rewards: RewardStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                }
                else if (routeName === 'Activities') {
                    iconName = 'run-fast';
                }
                else {
                    iconName = 'trophy';
                }
                let iconColor;
                focused ? iconColor = '#03256C' : iconColor = 'gray';
                return <MaterialIcon name={iconName} size={25} color={iconColor} />;
            },
            
        }),
        tabBarOptions: {
            activeTintColor: '#03256C',
        },
    }
));