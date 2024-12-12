// src/hooks/useOfflineFirst.ts
import { useState, useEffect } from 'react';
import { initDB } from '../utils/indexedDB';
import { syncData } from '../utils/syncService';

export const useOfflineFirst = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const performOperation = async (action: string, method: string, data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db: any = await initDB();
    
    if (!navigator.onLine) {
      // Store operation for later sync
      const transaction = db.transaction(['pendingOperations'], 'readwrite');
      const store = transaction.objectStore('pendingOperations');
      await store.add({
        action,
        method,
        data,
        timestamp: new Date().toISOString(),
      });
      
      // Update local data
      const userTransaction = db.transaction(['users'], 'readwrite');
      const userStore = userTransaction.objectStore('users');
      
      if (method === 'POST') {
        await userStore.add(data);
      } else if (method === 'PUT') {
        await userStore.put(data);
      } else if (method === 'DELETE') {
        await userStore.delete(data.id);
      }
      
      return { offline: true, data };
    }

    // If online, perform the operation normally
    const response = await fetch(`/api/users/${action}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  return { isOnline, performOperation };
};
