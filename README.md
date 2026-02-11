# SmaSteg - Preschool Portal

A modern web portal for preschools built with Angular 17. Features secure login with role-based access control for teachers and parents, allowing teachers to manage blog posts while parents can view them.

## Features
- 🔐 **Secure Login System**: Role-based authentication (TEACHER and PARENT roles)
- 📝 **Blog Management**: Create, edit, and delete blog posts (teachers only)
- 👀 **Read-Only Access**: Parents can view all blog posts
- 🛡️ **Route Guards**: Automatic protection of teacher-only routes
- 💾 **Persistent Storage**: LocalStorage keeps data between sessions
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Demo Credentials
- **Teacher**: `teacher1` / `teacher123`
- **Parent**: `parent1` / `parent123`

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`

The application will automatically reload if you change any of the source files.

### Build
```bash
npm run build
```
Build artifacts will be stored in the `dist/` directory.

### Running Tests
```bash
npm test
```

## Usage

### For Teachers
1. Log in with teacher credentials
2. View all blog posts with Edit and Delete buttons
3. Click "Create New Post" to add a new blog post
4. Click "Edit" on any post to modify it
5. Click "Delete" to remove a post (with confirmation)

### For Parents
1. Log in with parent credentials
2. View all blog posts (read-only)
3. No editing or deletion options available

## Technology Stack
- Angular 17 (standalone components)
- TypeScript
- RxJS
- Angular Router with Guards
- LocalStorage API

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Login form component
│   │   ├── blog-list/      # Blog posts list view
│   │   └── blog-form/      # Create/edit blog post form
│   ├── guards/
│   │   ├── auth.guard.ts   # Requires user to be logged in
│   │   └── teacher.guard.ts # Requires TEACHER role
│   ├── models/
│   │   ├── user.model.ts    # User interface and role types
│   │   └── blog-post.model.ts # Blog post interface
│   ├── services/
│   │   ├── auth.service.ts      # Authentication logic
│   │   └── blog-post.service.ts # Blog post CRUD operations
│   └── app.component.ts    # Root component with navigation
└── ...
```

## License
ISC

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.
