import { registerUser } from "@/app/utils/auth-service";

const DB_NAME = 'cleancheck';
const STORE_NAME = 'pendingRegistrations';
const DB_VERSION = 1;

interface UserData {
  userName: string;
  userEmail: string;
  userRole: string;
  userPassword: string;
}

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const savePendingRegistration = async (userData: UserData): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.add({
    ...userData,
    timestamp: Date.now(),
  });
};

export const getPendingRegistrations = async (): Promise<(UserData & { id: number })[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  return new Promise<(UserData & { id: number })[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deletePendingRegistration = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
};

export const processOfflineRegistrations = async (): Promise<void> => {
  const registrations = await getPendingRegistrations();
  for (const registration of registrations) {
    try {
      const { id, ...userData } = registration;
      const roleEndpoint = userData.userRole === 'cleaning staff' ? '/Maid' : '/Receptionist';
      await registerUser(
        userData.userName,
        userData.userEmail,
        userData.userRole,
        userData.userPassword,
        roleEndpoint
      );
      await deletePendingRegistration(id);
    } catch (error) {
      console.error('Error processing offline registration:', error);
    }
  }
};