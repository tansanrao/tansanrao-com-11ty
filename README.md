# tansanrao.com

My personal website built with Eleventy 3.0.0, featuring a blog, notes section, and more.

## Features

- Modern and clean design with custom SCSS
- Responsive layout
- Multiple content types:
  - Blog posts with filtering
  - Notes (microblog) with social syndication
  - News section
- Tags support with filtering
- RSS feeds
- Syntax highlighting
- SEO-friendly metadata
- Fast build times
- Social links integration
- Custom web fonts (IBM Plex Mono, Literata, Red Hat Display)

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
# or
npm start
```

3. Build for production:
```bash
npm run build
```

4. Other available commands:
```bash
npm run clean    # Clean the build directory
npm run debug    # Run with Eleventy debug output
```

## Deployment

### GitHub

1. Create a new repository on GitHub
2. Initialize and push the repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

### Cloudflare Pages

1. Log in to the Cloudflare dashboard
2. Go to Pages > Create a project > Connect to Git
3. Select your repository and configure with these settings:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `_site`
   - Environment variables:
     - `NODE_VERSION`: 18
     - `NODE_ENV`: production

The site will automatically deploy when you push changes to the main branch.

## Directory Structure

```
.
├── src/
│   ├── _data/          # Site data files
│   ├── _includes/      # Reusable components (header, blog-list, news-list)
│   ├── _layouts/       # Page layouts (base, post, note)
│   ├── js/            # JavaScript files
│   ├── scss/          # SCSS files
│   │   ├── components/  # Component-specific styles
│   │   ├── _tokens.scss # Design tokens
│   │   ├── _composition.scss # Layout compositions
│   │   └── style.scss  # Main stylesheet
│   ├── posts/         # Blog posts
│   ├── notes/         # Short-form notes/microblog posts
│   └── *.njk          # Main pages (index, blog, notes)
├── scripts/          # Utility scripts
├── eleventy.config.js # 11ty configuration
├── package.json
└── README.md
```

## Content Types

### Blog Posts

Create a new `.md` file in `src/posts/`:
```yaml
---
title: Your Post Title
description: Brief description
date: YYYY-MM-DD
tags:
  - posts  # Required tag
  - tag1
  - tag2
layout: post.njk
toc: true  # Optional, enables table of contents
bibliography: true  # Optional, enables references section
---
```

### Notes

Create a new `.md` file in `src/notes/`:
```yaml
---
title: Note Title (optional)
date: YYYY-MM-DD
tags:
  - notes  # Required tag
  - tag1
layout: note.njk
---
```

### News Items

Create a new `.md` file in `src/news/`:
```yaml
---
date: YYYY-MM-DD
tags:
  - news  # Required tag
layout: base.njk
---
```

News items are typically short updates about professional achievements, publications, or status changes. They are displayed in reverse chronological order and support markdown formatting and links.

## Common Frontmatter Fields

All content types support these common fields:
- `title`: The title of the content (required for posts, optional for notes)
- `date`: Publication date in YYYY-MM-DD format (required)
- `tags`: Array of tags for categorization (at least one required tag based on content type)
- `layout`: The template to use for rendering (required)
- `description`: Brief summary of the content (recommended for posts)
- `permalink`: Custom URL path (optional)
- `draft`: Set to true to exclude from build (optional)

## Styling

The project uses SCSS with a component-based architecture:
- `scss/components/` contains individual component styles
- `_tokens.scss` defines design variables and tokens
- `_composition.scss` handles layout patterns
- `style.scss` imports and organizes all styles

## Utility Scripts

The `scripts/` directory contains utility scripts for content generation and management:

### ML Visuals Generator
```bash
# Install Python dependencies
pip install -r scripts/requirements.txt

# Generate ML visualizations
python scripts/generate_ml_visuals.py
```

This script generates visualizations for machine learning-related blog posts. It requires Python 3.x and the dependencies listed in `scripts/requirements.txt`.

## Image Usage

This site uses a responsive image pipeline that automatically generates multiple sizes and formats of images for optimal performance.

### Directory Structure

```
src/
  assets/
    images/
      blog/     # Blog post images
      notes/    # Notes images
      global/   # Site-wide images (logos, icons, etc.)
```

### Using Images in Templates

You can use images in your templates using either the `picture` or `image` shortcode:

```njk
{% picture "assets/images/blog/my-image.jpg", "Alt text for my image" %}
```

Or with custom sizes:

```njk
{% picture "assets/images/blog/my-image.jpg", "Alt text for my image", "(min-width: 1024px) 960px, 100vw" %}
```

### Features

- Automatically generates multiple sizes (320w, 640w, 960w, 1280w)
- Converts images to modern formats (AVIF, WebP) with JPEG fallback
- Lazy loading enabled by default
- Responsive images with appropriate `srcset` and `sizes`
- Caches processed images for faster builds

### Supported Image Formats

Input formats: JPG, PNG, WebP, AVIF, GIF
Output formats: AVIF, WebP, JPEG (as fallbacks)

## License

MIT
