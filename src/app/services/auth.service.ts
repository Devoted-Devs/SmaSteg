import { Injectable, signal, computed } from '@angular/core';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  
  // Public readonly signal
  public currentUser = this.currentUserSignal.asReadonly();
  
  // Computed signals for derived state
  public isLoggedIn = computed(() => this.currentUserSignal() !== null);
  public isTeacher = computed(() => this.currentUserSignal()?.role === 'TEACHER');
  public isParent = computed(() => this.currentUserSignal()?.role === 'PARENT');

  // Mock users database
  // NOTE: This is for demonstration purposes only. In a production application,
  // passwords should be hashed and authentication should be handled server-side.
  private users: User[] = [
    {
      id: 1,
      username: 'teacher1',
      password: 'teacher123',
      role: 'TEACHER',
      name: 'Ms. Johnson'
    },
    {
      id: 2,
      username: 'parent1',
      password: 'parent123',
      role: 'PARENT',
      name: 'John Smith'
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      // Store user without password
      const userToStore = { ...user };
      delete (userToStore as any).password;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      this.currentUserSignal.set(userToStore);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserSignal()?.role === role;
  }

  getUserInfo(): string {
    const user = this.currentUserSignal();
    return user ? `${user.name} (${user.role})` : '';
  }
}
