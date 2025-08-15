# Vercel Deployment Guide - DAM House of Insulation

This guide will help you deploy the DAM House of Insulation website to Vercel.

## 🚀 Quick Deployment

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your forked repository

3. **Configure Environment Variables** (see section below)
4. **Deploy** - Vercel will automatically build and deploy your site

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts to configure your deployment
```

## 🔧 Environment Variables Setup

### Required Variables

Add these in your Vercel dashboard under **Project Settings → Environment Variables**:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_order_pdf
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_BUILDER_KEY=your_builder_key_here
```

### Optional Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_COMPANY_EMAIL=info@damgcc.com
NEXT_PUBLIC_COMPANY_PHONE=+971-XX-XXX-XXXX
```

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] EmailJS account set up (if using contact forms)
- [ ] Builder.io account configured (if using CMS)
- [ ] Domain name ready (optional)
- [ ] Analytics accounts set up (optional)

## 🛠 Build Configuration

The project is optimized for Vercel with:

- **Next.js 14** with App Router
- **Automatic builds** on push to main branch
- **Image optimization** with WebP/AVIF support
- **Security headers** configured
- **Performance optimizations** enabled

## 🌐 Domain Configuration

### Custom Domain Setup

1. In Vercel dashboard, go to **Project Settings → Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## 📊 Performance Features

- **Automatic code splitting**
- **Image optimization** for all external images
- **Static generation** where possible
- **CDN delivery** worldwide
- **Automatic compression**

## 🔐 Security Features

- **Security headers** (CSP, HSTS, etc.)
- **XSS protection**
- **Frame options** configured
- **Content type sniffing** disabled

## 📱 API Routes

The following API routes are configured:

- `/api/ping` - Health check endpoint
- `/api/demo` - Demo data endpoint

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
- Check TypeScript errors: `npm run typecheck`
- Verify all dependencies are installed
- Check environment variables are set

**Images Not Loading:**
- Verify image URLs in `next.config.js`
- Check image domains are whitelisted

**Environment Variables Not Working:**
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding new variables

### Build Logs

Check build logs in Vercel dashboard under **Deployments** for detailed error information.

## 📈 Monitoring

### Analytics Setup

1. **Google Analytics:**
   - Set `NEXT_PUBLIC_GA_ID` environment variable
   - Analytics will be automatically tracked

2. **Vercel Analytics:**
   - Enable in Project Settings
   - View performance metrics in dashboard

### Performance Monitoring

- Use Vercel's built-in **Web Vitals** monitoring
- Check **Functions** tab for API performance
- Monitor **Edge Network** for global performance

## 🔄 Continuous Deployment

### Automatic Deployments

- **Production:** Deploys on push to `main` branch
- **Preview:** Deploys on pull requests
- **Development:** Use `vercel dev` for local development

### Branch Protection

Set up branch protection rules in GitHub:
- Require status checks
- Require review before merging
- Restrict force pushes

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Project Support
- Check project README.md
- Review TESTING_GUIDE.md
- Check GitHub issues

## 🎯 Post-Deployment Tasks

1. **Test all functionality** on the deployed site
2. **Set up monitoring** and alerts
3. **Configure custom domain** (if needed)
4. **Enable analytics** tracking
5. **Test contact forms** and email integration
6. **Verify all images** load correctly
7. **Check mobile responsiveness**
8. **Test admin panel** functionality

## 🔧 Advanced Configuration

### Custom Build Command

If needed, customize build command in `package.json`:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
  }
}
```

### Function Configuration

API functions are configured for 30-second timeout. Adjust in `vercel.json` if needed.

### Edge Functions

For global performance, consider migrating API routes to Edge Functions for better worldwide performance.

---

## 🎉 Your site is now live!

After successful deployment, your DAM House of Insulation website will be available at your Vercel URL or custom domain.
