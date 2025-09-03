# CLAUDE.md - Blog CRUD Frontend

This file provides guidance for working with the blog management frontend (React + TypeScript + Vite).

## Architecture

This is a React TypeScript application built with Vite for blog content management and administration.

### Key Features
- Full-featured blog post CRUD operations
- Category management system
- File upload and management interface
- User authentication and private routes
- Markdown editor for blog content
- Resource management dashboard

### State Management
- **Zustand** for global state management
- **React Query** (@tanstack/react-query) for server state
- Local component state with React hooks

## Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                # Start development server with hot reload

# Building
npm run build              # Build for production
npm run build:dev          # Build for development environment
npm run build:prod         # Build for production environment

# Code Quality
npm run lint               # Lint with ESLint
npm run typecheck          # TypeScript type checking

# Preview
npm run preview            # Preview production build locally
```

## Key Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Library**: Ant Design components and icons
- **State Management**: Zustand + React Query
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM v6
- **Markdown**: @uiw/react-md-editor for content editing

## Project Structure
- `src/pages/` - Main application pages
  - `dashboard/` - Admin dashboard
  - `categories/` - Category management
  - `files/` - File management
  - `login/` - Authentication pages
  - `resources/` - Resource management
  - `resume/` - Resume editing functionality
- `src/components/` - Reusable UI components
- `src/services/` - API service layers
- `src/routes/` - Routing configuration
- `src/utils/` - Utility functions

## Development Notes
- Uses private routes with authentication guards
- Responsive design with Ant Design components
- File upload integration with backend MinIO storage
- Markdown editor for rich content creation
- Form validation and error handling