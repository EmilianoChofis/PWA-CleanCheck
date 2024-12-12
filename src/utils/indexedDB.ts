export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('Your browser doesn\'t support IndexedDB'));
      return;
    }

    const request = indexedDB.open('CleanCheckDB', 1);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('IndexedDB opened successfully');
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      try {
        // Create users store if it doesn't exist
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
          console.log('Users store created');
        }

        // Create pending operations store if it doesn't exist
        if (!db.objectStoreNames.contains('pendingOperations')) {
          db.createObjectStore('pendingOperations', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          console.log('PendingOperations store created');
        }
      } catch (error) {
        console.error('Error during database upgrade:', error);
        throw error;
      }
    };
  });
};
