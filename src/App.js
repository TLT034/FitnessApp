import React, {Component} from 'react';
import navigationService from './services/NavigationService';


export default class App extends Component {
    render() {
        return navigationService.getTopNavigator();
    }
}
