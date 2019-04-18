import { AsyncStorage } from 'react-native';

class LocalStorage {

    add(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key)
                .then(result => {
                    if (result !== null) {
                        resolve(JSON.parse(result))
                    } else {
                        reject(result)
                    }
                })
                .catch(error => reject(error));
        })
    }

    merge(key, value) {
        return AsyncStorage.mergeItem(key, JSON.stringify(value));
    }

    remove(key) {
        return AsyncStorage.removeItem(key);
    }
};

const localStorage = new LocalStorage();
export default localStorage;