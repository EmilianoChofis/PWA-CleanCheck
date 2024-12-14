const DB_NAME = "cleancheck";
const DB_VERSION = 1;
const STORE_PENDING_REGISTRATIONS = "pendingRegistrations";
const STORE_PENDING_UPDATES = "pendingUpdates";
const STORE_USERS = "users";

export interface User {
  userName: string;
  userEmail: string;
  userId: string;
  roleId: string;
}

interface UserData {
  userName: string;
  userEmail: string;
  userRole: string;
  userPassword: string;
}

interface PendingUpdate {
  userId: string;
  name: string;
  email: string;
  roleId: string;
}

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_PENDING_REGISTRATIONS)) {
        db.createObjectStore(STORE_PENDING_REGISTRATIONS, { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(STORE_PENDING_UPDATES)) {
        db.createObjectStore(STORE_PENDING_UPDATES, { keyPath: "id", autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains(STORE_USERS)) {
        db.createObjectStore(STORE_USERS, { keyPath: "userId"});
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

export const saveUserLocal = async (userData: User): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_USERS, "readwrite");
  const store = transaction.objectStore(STORE_USERS);
  store.add(userData);
};

export const deleteAllUserLocal = async (): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_USERS, "readwrite");
  const store = transaction.objectStore(STORE_USERS);
  store.clear();
}

export const getUsersLocal = async (): Promise<(User)[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_USERS, "readonly");
  const store = transaction.objectStore(STORE_USERS);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateUserLocal = async (userData: User): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_USERS, "readwrite");
  const store = transaction.objectStore(STORE_USERS);
  
  const getRequest = store.get(userData.userId);
  getRequest.onsuccess = () => {
    if (getRequest.result) {
      store.put({
        ...getRequest.result,
        ...userData,
        timestamp: Date.now(),
      });
    } else {
      console.error(`User with ID ${userData.userId} not found`);
    }
  };
  getRequest.onerror = () => {
    console.error(`Failed to retrieve user with ID ${userData.userId}`);
  };
};

export const savePendingRegistration = async (userData: UserData): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_REGISTRATIONS, "readwrite");
  const store = transaction.objectStore(STORE_PENDING_REGISTRATIONS);
  store.add({
    ...userData,
    timestamp: Date.now(),
  });
};

export const getPendingRegistrations = async (): Promise<(UserData & { id: number })[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_REGISTRATIONS, "readonly");
  const store = transaction.objectStore(STORE_PENDING_REGISTRATIONS);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deletePendingRegistration = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_REGISTRATIONS, "readwrite");
  const store = transaction.objectStore(STORE_PENDING_REGISTRATIONS);
  store.delete(id);
};

export const savePendingUpdate = async (updateData: PendingUpdate): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_UPDATES, "readwrite");
  const store = transaction.objectStore(STORE_PENDING_UPDATES);
  store.add({
    ...updateData,
    timestamp: Date.now(),
  });
};

export const getPendingUpdates = async (): Promise<(PendingUpdate & { id: number })[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_UPDATES, "readonly");
  const store = transaction.objectStore(STORE_PENDING_UPDATES);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deletePendingUpdate = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PENDING_UPDATES, "readwrite");
  const store = transaction.objectStore(STORE_PENDING_UPDATES);
  store.delete(id);
};
