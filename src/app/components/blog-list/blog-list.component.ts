import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../../services/blog-post.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
    selector: 'app-blog-list',
    imports: [CommonModule],
    templateUrl: './blog-list.component.html',
    styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  isTeacher = false;

  constructor(
    private blogPostService: BlogPostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogPostService.posts.subscribe(posts => {
      this.posts = posts;
    });
    this.isTeacher = this.authService.isTeacher();
  }

  createPost(): void {
    this.router.navigate(['/blog/create']);
  }

  editPost(id: number): void {
    this.router.navigate(['/blog/edit', id]);
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogPostService.deletePost(id);
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
