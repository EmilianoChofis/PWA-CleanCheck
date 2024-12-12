// src/utils/indexedDB.ts
export const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CleanCheckDB', 1);
  
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        
        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
  
        // Create pending operations store
        if (!db.objectStoreNames.contains('pendingOperations')) {
          db.createObjectStore('pendingOperations', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
        }
      };
    });
  };
  