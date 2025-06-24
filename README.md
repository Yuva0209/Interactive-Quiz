# Interactive Quiz Application

## Overview

This is a web-based interactive quiz application built with vanilla HTML, CSS, and JavaScript, served by a custom Python HTTP server. The application features a modern, responsive design with gradient styling, smooth transitions, and an engaging user experience. The quiz system is designed to be easily extensible with dynamic question loading and comprehensive result tracking.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Vanilla HTML5, CSS3, and JavaScript (ES6+)
- **Design Pattern**: Component-based architecture using JavaScript classes
- **Styling**: CSS Grid and Flexbox layouts with modern gradient designs
- **Responsive Design**: Mobile-first approach with viewport meta tag optimization
- **Font Integration**: Google Fonts (Poppins) and Font Awesome icons

### Backend Architecture
- **Server**: Custom Python HTTP server built on `http.server` module
- **Port**: Runs on port 5000 with host binding to `0.0.0.0`
- **File Serving**: Static file server with custom routing and security headers
- **CORS Support**: Cross-origin resource sharing enabled for development

## Key Components

### Frontend Components
1. **QuizApp Class**: Main application controller managing quiz state and flow
2. **Welcome Screen**: Initial landing page with quiz introduction
3. **Quiz Screen**: Interactive question display with progress tracking
4. **Results Screen**: Score display and performance summary
5. **Review Screen**: Detailed answer review with explanations

### Server Components
1. **QuizHTTPRequestHandler**: Custom request handler extending SimpleHTTPRequestHandler
2. **Security Headers**: XSS protection, content-type options, and frame options
3. **Static File Routing**: Automatic index.html serving for root requests
4. **Error Handling**: File validation and graceful error responses

### Quiz Features
- Dynamic question bank with explanations
- Progress tracking with visual progress bar
- Multiple-choice question format
- Score calculation and performance metrics
- Smooth CSS transitions and animations

## Data Flow

1. **Application Initialization**: Python server starts and serves static files
2. **User Interaction**: Browser loads index.html and initializes QuizApp class
3. **Quiz Flow**: Welcome → Quiz Questions → Results → Review
4. **State Management**: JavaScript manages quiz progress, user answers, and scoring
5. **Data Storage**: Client-side storage of quiz state and user responses

## External Dependencies

### Frontend Dependencies
- **Google Fonts**: Poppins font family for typography
- **Font Awesome**: Icon library (version 6.0.0) for UI elements
- **CDN Integration**: External stylesheets loaded via CDN

### Backend Dependencies
- **Python Standard Library**: 
  - `http.server` for web server functionality
  - `socketserver` for network handling
  - `os` and `pathlib` for file system operations

## Deployment Strategy

### Development Environment
- **Replit Configuration**: Python 3.11 module with Nix stable-24_05 channel
- **Workflow Setup**: Parallel execution with automatic port waiting
- **Local Development**: Simple `python server.py` execution

### Production Considerations
- Static file serving suitable for small-scale deployment
- Security headers implemented for basic protection
- CORS enabled for API integration potential
- File validation ensures required assets are present

### Scalability Notes
- Current architecture supports single-instance deployment
- Question bank can be externalized to database for dynamic content
- Server can be enhanced with API endpoints for quiz management
- Frontend architecture supports component extraction for reusability

## Changelog

- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
