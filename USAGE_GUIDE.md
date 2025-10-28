# Portfolio Usage Guide 📖

## Quick Start

### Development
```bash
npm run dev
```
Runs on `http://localhost:5173`

### Production Build
```bash
npm run build
```
Outputs to `/dist` folder

### Preview Production
```bash
npm run preview
```
Runs on `http://localhost:4173`

## New Components

### 1. LazyImage Component
Use for optimized image loading with shimmer effect:

```tsx
import { LazyImage } from './components/LazyImage';

<LazyImage
  src="/path/to/image.jpg"
  alt="Description"
  className="rounded-lg"
  width={800}
  height={600}
/>
```

**Features**:
- Intersection Observer for viewport detection
- Shimmer placeholder animation
- Smooth fade-in transition
- Native lazy loading fallback

### 2. Footer Component
Automatically included in `App.tsx`:

```tsx
import { Footer } from './components/Footer';

<Footer />
```

**Features**:
- Social media links
- Quick navigation
- Lighthouse performance badges
- Sitemap/robots links
- Responsive design

## SEO Configuration

### Update Meta Tags
Edit `index.html`:

```html
<meta name="description" content="Your description" />
<meta name="author" content="Your Name" />
<meta property="og:title" content="Your Title" />
```

### Update Sitemap
Edit `public/sitemap.xml`:

```xml
<url>
  <loc>https://yourdomain.com/</loc>
  <lastmod>2025-10-28</lastmod>
  <priority>1.0</priority>
</url>
```

### Update Robots.txt
Edit `public/robots.txt`:

```
Sitemap: https://yourdomain.com/sitemap.xml
```

## Performance Tips

### 1. Use LazyImage for All Images
Replace standard `<img>` tags:

```tsx
// ❌ Before
<img src="/image.jpg" alt="..." />

// ✅ After
<LazyImage src="/image.jpg" alt="..." />
```

### 2. Code Splitting (Optional)
For even better performance:

```tsx
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('./sections/Projects'));

<Suspense fallback={<div>Loading...</div>}>
  <Projects />
</Suspense>
```

### 3. Optimize Images
- Use WebP format
- Compress images (TinyPNG, Squoosh)
- Use appropriate dimensions
- Consider using a CDN

## Dark Mode

### Toggle Theme Programmatically
```tsx
import { useTheme } from './context/ThemeContext';

const { theme, toggleTheme, isDark } = useTheme();

// Toggle
toggleTheme();

// Check current theme
if (isDark) {
  // Dark mode specific logic
}
```

### Add Dark Mode Styles
```tsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">
    Text that adapts to theme
  </p>
</div>
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Custom Server
1. Build: `npm run build`
2. Upload `dist` folder
3. Configure web server (nginx, Apache)

## Customization

### Update Lighthouse Scores
Edit `src/components/Footer.tsx`:

```tsx
const lighthouseScores = [
  { label: 'Performance', score: 98, color: 'from-green-500 to-emerald-600' },
  // Update scores here
];
```

### Update Social Links
Edit `src/components/Footer.tsx`:

```tsx
const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  // Update links here
];
```

### Change Colors
Edit Tailwind classes throughout components:

```tsx
// Primary color
className="bg-purple-600" // Change to bg-blue-600, bg-red-600, etc.

// Gradients
className="from-purple-600 to-blue-600" // Customize gradient
```

## File Structure

```
my-portfolio/
├── public/
│   ├── robots.txt          # SEO crawler instructions
│   ├── sitemap.xml         # Site structure for search engines
│   └── vite.svg           # Favicon
├── src/
│   ├── components/
│   │   ├── Footer.tsx      # Footer with Lighthouse badges
│   │   ├── LazyImage.tsx   # Optimized image component
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── ThemeToggle.tsx # Dark mode toggle
│   ├── context/
│   │   └── ThemeContext.tsx # Theme management
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template with SEO
├── OPTIMIZATION_REPORT.md  # Performance analysis
└── package.json
```

## Troubleshooting

### Dark Mode Not Working
1. Check browser console for errors
2. Verify `@variant dark` in `src/index.css`
3. Clear browser cache (Ctrl+Shift+R)
4. Restart dev server

### Images Not Loading
1. Check image paths are correct
2. Verify images are in `public` folder
3. Use absolute paths: `/images/photo.jpg`

### Build Errors
1. Run `npm install` to update dependencies
2. Delete `node_modules` and reinstall
3. Check TypeScript errors: `npm run build`

### Performance Issues
1. Use LazyImage for all images
2. Implement code splitting
3. Optimize image sizes
4. Enable gzip compression on server

## Testing

### Run Lighthouse Audit
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Update scores in Footer component

### Test Responsiveness
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes

### Test Dark Mode
1. Click theme toggle button
2. Verify all sections adapt
3. Check localStorage persistence
4. Test OS preference detection

## Support

For issues or questions:
- Check `OPTIMIZATION_REPORT.md` for performance tips
- Review component documentation above
- Check browser console for errors

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
