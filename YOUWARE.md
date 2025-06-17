# AutoSMM Web Application - YOUWARE Agent Guide

## Project Overview
This is a sophisticated web application for AutoSMM - an AI-powered social media management platform. The project is built with vanilla HTML, CSS, and JavaScript, featuring a single-page application (SPA) architecture with dynamic content loading.

## Architecture & Core Components

### Frontend Architecture
- **Single Page Application (SPA)**: Content is dynamically loaded without page refreshes
- **Modular JavaScript Design**: Each major functionality is separated into dedicated modules
- **CSS Component Architecture**: Styles are organized by feature/component
- **Template-Based System**: HTML templates stored in JavaScript for dynamic rendering

### Key JavaScript Modules
- **ContentManager** (`js/content-manager.js`): Core SPA functionality, handles page navigation and content rendering
- **MenuHandler** (`js/menu-handler.js`): Manages all menu interactions and navigation logic
- **TooltipHandler** (`js/tooltip-handler.js`): Controls modern UI tooltips and provides enhanced UX
- **NavigationHandler** (`js/navigation.js`): Browser history and URL management
- **CardInteractions** (`js/card-interactions.js`): Interactive elements in content cards
- **ModalSystem** (`js/modal.js`): Complex modal system with VK comments integration

### Template System
- **PageTemplates** (`templates/page-templates.js`): Centralized HTML templates for all pages
- **Dynamic Content Loading**: Templates are rendered into main container based on navigation
- **Component Reusability**: Templates include both placeholder pages and fully functional interfaces

### CSS Architecture
- **Root Variables** (`css/styles.css`): Centralized color scheme and design tokens
- **Component-Specific Styles**: Each major component has its own CSS file
- **Enhanced Effects**: Modern animations and interactions (`css/enhanced-button-effects.css`)
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Key Features Implemented

### Navigation System
- **Sidebar Menu**: Primary navigation with tooltips and modern animations
- **Breadcrumb Navigation**: Contextual navigation for deep pages
- **Hash-Based Routing**: Browser-friendly URLs with history support
- **Dynamic Page Loading**: Seamless transitions between sections

### Interactive Elements
- **Advanced Tooltips**: Context-aware tooltips for all interactive elements
- **Card Interactions**: Like/comment functionality with localStorage persistence
- **Modal System**: Complex modal dialogs with VK social integration
- **Form Handling**: Dynamic forms with validation and user feedback

### Pages & Functionality
- **Dashboard**: Main overview page with statistics and quick actions
- **Spheres Management**: Full CRUD interface for business spheres/brands configuration
- **Content Management**: Tools for managing content sources and AI parameters
- **Social Networks**: Integration management for various social platforms
- **Support System**: Help and technical support interfaces

## Development Patterns

### Content Management Pattern
```javascript
// ContentManager handles all page transitions
window.contentManager.showPage(pageName, pageTitle);
```

### Menu Integration Pattern
```javascript
// All menu items use data-page attributes for navigation
<div class="icon-container" data-page="manageSpheres">
```

### Template Pattern
```javascript
// Templates are stored as template literals in pageTemplates object
pageTemplates.manageSpheres = `<div class="content-page">...</div>`;
```

### Notification System
```javascript
// Standardized notification system for user feedback
showNotification(message, type); // type: 'success', 'error', 'info'
```

## File Organization

### CSS Structure
- `styles.css` - Global styles and CSS variables
- `*-effects.css` - Animation and interaction styles
- `*-page.css` - Page-specific styles
- `tooltips.css` - UI tooltip system
- `modal/` - Modal-specific styles

### JavaScript Structure
- Core functionality split into logical modules
- Event handling centralized in respective handlers
- Template system separate from logic
- Utility functions integrated into relevant modules

## Backend Integration Notes
The application is currently frontend-only but designed for easy backend integration:
- Template system ready for API data binding
- Event handlers prepared for form submissions
- Notification system ready for API responses
- LocalStorage used as temporary data persistence

## UI/UX Patterns
- **Modern Gradients**: Consistent use of CSS gradients for visual hierarchy
- **Micro-interactions**: Hover states and smooth transitions throughout
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Visual Feedback**: Loading states, animations, and user confirmations

## Integration Points
- **VK API Integration**: Modal system includes VK comments widget preparation
- **Social Media APIs**: Framework ready for multiple social platform integrations
- **AI Content Generation**: UI prepared for AI-powered content creation workflows
- **Analytics Integration**: Dashboard prepared for real-time analytics display

This architecture supports rapid feature development while maintaining clean separation of concerns and modern web standards.