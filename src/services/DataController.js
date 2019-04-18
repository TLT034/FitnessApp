import localStorage from './LocalStorage';

class DataController {

    updateStorageItem(key, newValue) {
        return new Promise((resolve, reject) => {
            localStorage.add(key, newValue)
                .then(() => {
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    getStorageItem(key) {
        return new Promise((resolve, reject) => {
            localStorage.get(key)
                .then(result => {

                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    addElementToStorageItem(key, elKey, elValue) {
        return new Promise((resolve, reject) => {
            localStorage.merge(key, { [elKey]: elValue })
                .then(result => {
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    removeStorageItem(key) {
        return localStorage.remove(key);
    }
};

const dataController = new DataController();
export default dataController;