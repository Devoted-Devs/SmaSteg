import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from '../../services/blog-post.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-blog-list',
    imports: [],
    templateUrl: './blog-list.component.html',
    styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  constructor(
    public blogPostService: BlogPostService,
    public authService: AuthService,
    private router: Router
  ) {}

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
