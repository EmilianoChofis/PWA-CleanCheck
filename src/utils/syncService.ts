// src/utils/syncService.ts
import { initDB } from './indexedDB';

export const syncData = async () => {
  if (!navigator.onLine) return;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db: any = await initDB();
  const transaction = db.transaction(['pendingOperations'], 'readwrite');
  const store = transaction.objectStore('pendingOperations');

  const pendingOps = await store.getAll();

  for (const op of pendingOps) {
    try {
      const response = await fetch(`/api/users/${op.action}`, {
        method: op.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(op.data),
      });

      if (response.ok) {
        // Remove synced operation
        store.delete(op.id);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
};
