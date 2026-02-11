import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private postsSubject: BehaviorSubject<BlogPost[]>;
  public posts: Observable<BlogPost[]>;
  private nextId: number;

  // Mock blog posts database
  private mockPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Welcome to Our Preschool',
      content: 'We are excited to welcome all families to our preschool portal! Here you can stay updated with all the latest news and activities.',
      author: 'Ms. Johnson',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Spring Activities Schedule',
      content: 'Our spring activities will include outdoor playtime, gardening projects, and art classes. We look forward to a fun-filled season!',
      author: 'Ms. Johnson',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    {
      id: 3,
      title: 'Parent-Teacher Conference Reminder',
      content: 'Don\'t forget to sign up for parent-teacher conferences scheduled for next week. We look forward to discussing your child\'s progress!',
      author: 'Ms. Johnson',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10')
    }
  ];

  constructor() {
    // Load posts from localStorage or use mock data
    const storedPosts = localStorage.getItem('blogPosts');
    const initialPosts = storedPosts ? JSON.parse(storedPosts) : this.mockPosts;
    
    // Convert date strings back to Date objects
    initialPosts.forEach((post: BlogPost) => {
      post.createdAt = new Date(post.createdAt);
      post.updatedAt = new Date(post.updatedAt);
    });

    // Calculate nextId based on the maximum ID in posts
    this.nextId = initialPosts.length > 0 
      ? Math.max(...initialPosts.map((p: BlogPost) => p.id)) + 1 
      : 1;

    this.postsSubject = new BehaviorSubject<BlogPost[]>(initialPosts);
    this.posts = this.postsSubject.asObservable();
  }

  private savePosts(): void {
    localStorage.setItem('blogPosts', JSON.stringify(this.postsSubject.value));
  }

  getAllPosts(): BlogPost[] {
    return this.postsSubject.value;
  }

  getPostById(id: number): BlogPost | undefined {
    return this.postsSubject.value.find(post => post.id === id);
  }

  createPost(title: string, content: string, author: string): void {
    const newPost: BlogPost = {
      id: this.nextId++,
      title,
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentPosts = this.postsSubject.value;
    this.postsSubject.next([newPost, ...currentPosts]);
    this.savePosts();
  }

  updatePost(id: number, title: string, content: string): void {
    const posts = this.postsSubject.value;
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex !== -1) {
      posts[postIndex] = {
        ...posts[postIndex],
        title,
        content,
        updatedAt: new Date()
      };
      this.postsSubject.next([...posts]);
      this.savePosts();
    }
  }

  deletePost(id: number): void {
    const posts = this.postsSubject.value.filter(post => post.id !== id);
    this.postsSubject.next(posts);
    this.savePosts();
  }
}
