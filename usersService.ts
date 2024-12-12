// src/app/(pages)/manager/users/services/usersService.ts
import { initDB } from '@/utils/indexedDB';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'service' | 'receptionist';
  status: 'active' | 'inactive';
}

export const usersService = {
  async getUsers(): Promise<User[]> {
    
    const db: any = await initDB();
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    return store.getAll();
  },

  async searchUsers(searchTerm: string, category: string): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);
      
      const matchesCategory = 
        category === 'all' || user.role === category;
      
      return matchesSearch && matchesCategory;
    });
  }
};
