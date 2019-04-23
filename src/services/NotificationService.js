import PushNotification from 'react-native-push-notification';


export default class NotificationService {

    constructor() {
        this._configure();
        //PushNotification.checkPermissions((not) => console.log(not));
    }

    _configure() {
        PushNotification.configure({

            onNotification: function (not) {
                console.log(not);
            },
        });
    }

    activityNotification(title, titleMsg, mainMsg, color) {
        PushNotification.localNotification({
            title: title,
            message: titleMsg,
            bigText: mainMsg,
            color: color,
            visibility: 'public',
            
        });
    }
}
