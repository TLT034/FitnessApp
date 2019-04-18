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
        return localStorage.merge(key, { [elKey]: elValue });
    }

    removeStorageItem(key) {
        return localStorage.remove(key);
    }
};

const dataController = new DataController();
export default dataController;