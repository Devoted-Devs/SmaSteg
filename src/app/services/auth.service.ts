import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

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
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
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
      this.currentUserSubject.next(userToStore);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserValue?.role === role;
  }

  isTeacher(): boolean {
    return this.hasRole('TEACHER');
  }

  isParent(): boolean {
    return this.hasRole('PARENT');
  }
}
