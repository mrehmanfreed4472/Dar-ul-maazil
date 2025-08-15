# 🚀 Netlify Deployment Guide - DAM House of Insulation

## Quick Deploy to Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository: `mrehmanfreed4472/Dar-ul-maazil`
   - Branch: `nova-home`

3. **Build Settings (Auto-detected):**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

4. **Deploy:** Click "Deploy site"

### Option 2: Manual Deploy

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Drag & Drop:**
   - Drag the `.next` folder to Netlify dashboard

## ⚙️ Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

### Required Variables:
```
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_order_pdf
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_BUILDER_KEY=your_builder_key
```

### Optional Variables:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_COMPANY_EMAIL=info@damgcc.com
NEXT_PUBLIC_COMPANY_PHONE=+971-XX-XXX-XXXX
```

## 📁 Project Configuration

### ✅ Netlify Optimized Files:
- `netlify.toml` - Build configuration
- `next.config.js` - Netlify-specific settings
- `package.json` - Build scripts and dependencies

### ✅ Features Configured:
- **Automatic deployments** on git push
- **Environment variables** support
- **Custom headers** for security
- **Redirects** and rewrites
- **Image optimization** enabled
- **API routes** support

## 🔧 Build Configuration

The site is configured with:
- **Node.js 18**
- **Next.js 14** with App Router
- **Automatic builds** on push to main branch
- **Environment variables** from Netlify
- **Security headers** pre-configured

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain:**
   - Go to Domain settings in Netlify
   - Add your domain
   - Configure DNS as instructed

2. **SSL Certificate:**
   - Automatically provided by Netlify

## 📊 Performance Features

- **CDN delivery** worldwide
- **Automatic compression**
- **Image optimization**
- **Code splitting** and lazy loading
- **Static generation** where possible

## 🔐 Security Features

Pre-configured security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`

## 🚨 Troubleshooting

### Build Fails:
```bash
# Check locally first
npm run deploy-check
```

### Environment Variables:
- Set in Netlify Dashboard, not in code
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding new variables

### Images Not Loading:
- Check `next.config.js` remote patterns
- Verify image URLs are accessible

## 📈 Post-Deployment

### ✅ Test Everything:
1. Navigate to all pages
2. Test contact forms
3. Verify admin panel functionality
4. Check mobile responsiveness
5. Test product/service management

### ✅ Analytics Setup:
1. Set `NEXT_PUBLIC_GA_ID` if using Google Analytics
2. Configure any tracking in environment variables

### ✅ Domain Setup:
1. Configure custom domain if needed
2. Update `NEXT_PUBLIC_APP_URL` to match

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Connected to Netlify
- [ ] Environment variables set
- [ ] Build successful
- [ ] Site accessible
- [ ] All features working
- [ ] Custom domain configured (optional)

## 🔗 Useful Links

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Next.js on Netlify:** [nextjs.org/docs/deployment/netlify](https://nextjs.org/docs/deployment/netlify)

---

## 🎉 Your DAM House of Insulation website is ready for the world!

After deployment, your professional insulation services website will be live with:
- ✅ Fast global CDN delivery
- ✅ Automatic HTTPS
- ✅ Mobile-responsive design
- ✅ Admin panel functionality
- ✅ Contact forms and ordering system
- ✅ SEO optimized pages
