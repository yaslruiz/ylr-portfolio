# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/my-portfolio)

### Option 2: Manual Deployment

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern portfolio with micro-interactions"
   git branch -M main
   git remote add origin https://github.com/yourusername/my-portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Your site will be live** at: `https://your-portfolio.vercel.app`

## GitHub Actions Setup

### Step 1: Get Vercel Credentials

1. **Get Vercel Token**:
   - Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
   - Create a new token
   - Copy the token

2. **Get Project IDs**:
   - Deploy your project to Vercel first (manually)
   - Run in your project directory:
     ```bash
     npm install -g vercel
     vercel link
     ```
   - This creates `.vercel/project.json` with your IDs

### Step 2: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

- **VERCEL_TOKEN**: Your Vercel token from Step 1
- **VERCEL_ORG_ID**: From `.vercel/project.json`
- **VERCEL_PROJECT_ID**: From `.vercel/project.json`

### Step 3: Push to Trigger Deployment

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

The workflow will:
- ✅ Run TypeScript checks
- ✅ Build the project
- ✅ Deploy to Vercel production
- ✅ Comment deployment URL on commits

## Preview Deployments

Every pull request automatically gets a preview deployment:

1. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```

2. Make changes and push:
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

3. Create a pull request on GitHub

4. GitHub Actions will:
   - Build the project
   - Deploy to a preview URL
   - Comment the preview URL on your PR

## Custom Domain Setup

### On Vercel

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

### DNS Configuration

Add these records to your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Environment Variables

If you need environment variables (e.g., API keys):

### Local Development

Create `.env` file:
```env
VITE_MAPBOX_TOKEN=your_token_here
VITE_API_URL=https://api.example.com
```

### Vercel Production

1. Go to project → Settings → Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

## Build Optimization

### Current Bundle Size

```
📦 Production Build
├── JS: 741.56 KB (gzipped)
├── CSS: 8.87 KB (gzipped)
└── HTML: 0.86 KB (gzipped)
```

### Further Optimization Tips

1. **Code Splitting**:
   ```typescript
   const Projects = lazy(() => import('./sections/Projects'));
   ```

2. **Image Optimization**:
   - Use WebP format
   - Compress images with TinyPNG
   - Use CDN (Cloudinary, ImageKit)

3. **Bundle Analysis**:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

## Monitoring

### Vercel Analytics

Enable in project settings:
- Real User Monitoring (RUM)
- Web Vitals tracking
- Traffic analytics

### Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- Solution: Run `npm install` and commit `package-lock.json`

**Error**: `TypeScript errors`
- Solution: Fix errors locally with `npm run build`

### Deployment Fails

**Error**: `VERCEL_TOKEN not found`
- Solution: Check GitHub secrets are set correctly

**Error**: `Build exceeded time limit`
- Solution: Optimize dependencies, remove unused packages

### Preview Not Working

**Error**: No preview URL in PR
- Solution: Check GitHub Actions workflow is enabled
- Verify secrets are set
- Check workflow logs for errors

## Rollback

If a deployment breaks production:

1. Go to Vercel project → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

## Performance Checklist

Before deploying, verify:

- [ ] All images optimized
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Forms validate correctly
- [ ] Links work
- [ ] SEO meta tags present
- [ ] Sitemap accessible
- [ ] Robots.txt configured

## Post-Deployment

1. **Test the live site**:
   - Check all pages load
   - Test forms
   - Verify dark mode
   - Try Konami code easter egg
   - Test on mobile

2. **Submit to search engines**:
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

3. **Share your portfolio**:
   - Update LinkedIn
   - Add to GitHub profile
   - Share on social media

## Support

For deployment issues:

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **GitHub Actions**: Check workflow logs
- **This project**: Open an issue on GitHub

---

**🎉 Congratulations on deploying your portfolio!**

Update the live URL in README.md after deployment.
