import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../../services/blog-post.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-blog-form',
    imports: [CommonModule, FormsModule],
    templateUrl: './blog-form.component.html',
    styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit {
  title = '';
  content = '';
  isEditMode = false;
  postId: number | null = null;
  authorName = '';

  constructor(
    private blogPostService: BlogPostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.authorName = user?.name || '';

    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.postId = +params['id'];
        this.loadPost();
      }
    });
  }

  loadPost(): void {
    if (this.postId) {
      const post = this.blogPostService.getPostById(this.postId);
      if (post) {
        this.title = post.title;
        this.content = post.content;
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.postId) {
      this.blogPostService.updatePost(this.postId, this.title, this.content);
    } else {
      this.blogPostService.createPost(this.title, this.content, this.authorName);
    }
    this.router.navigate(['/blog']);
  }

  cancel(): void {
    this.router.navigate(['/blog']);
  }
}
