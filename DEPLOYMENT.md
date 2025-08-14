# Vercel Deployment Guide

This guide walks you through deploying the DAM - House of Insulation website to Vercel.

## 🚀 Quick Deployment

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/dam-house-of-insulation)

### Option 2: Manual Deployment

1. **Prepare your repository**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Import Project"
   - Select your repository

3. **Configure build settings**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## ⚙️ Environment Variables

Set these in your Vercel dashboard under Settings > Environment Variables:

### Required Variables
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Optional Variables
```
PING_MESSAGE=pong
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
```

## 📧 EmailJS Setup

1. **Create EmailJS account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for free account

2. **Create email service**
   - Add Gmail, Outlook, or other email service
   - Get the `Service ID`

3. **Create email template**
   - Design your contact form email template
   - Get the `Template ID`

4. **Get Public Key**
   - Go to Account settings
   - Copy the `Public Key`

5. **Update environment variables**
   - Add all three IDs to Vercel environment variables

## 🌐 Custom Domain Setup

1. **Add domain in Vercel**
   - Go to Project Settings > Domains
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record: `www.yourdomain.com` → `your-project.vercel.app`
   - Add A record: `yourdomain.com` → `76.76.19.61`

## 🔍 Build Troubleshooting

### Common Issues & Solutions

**1. Build timeout**
```bash
# Solution: Enable optimized builds in next.config.js
output: 'standalone',
swcMinify: true,
```

**2. TypeScript errors**
```bash
# Temporarily ignore during build (already configured)
typescript: {
  ignoreBuildErrors: true,
}
```

**3. Image optimization issues**
```bash
# Use unoptimized images for faster builds
images: {
  unoptimized: true,
}
```

**4. Memory issues**
```bash
# Add to package.json scripts
"build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
```

## 📊 Performance Optimization

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to your layout:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Speed Insights
```bash
npm install @vercel/speed-insights
```

## 🔄 Automatic Deployments

- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests create preview deployments
- **Environment**: Different environment variables for preview/production

## 🚨 Monitoring & Alerts

1. **Set up monitoring**
   - Enable Vercel Analytics
   - Configure uptime monitoring
   - Set up error tracking

2. **Performance monitoring**
   - Use Vercel Speed Insights
   - Monitor Core Web Vitals
   - Track loading performance

## 🔧 Advanced Configuration

### Build & Output Settings
```javascript
// next.config.js
module.exports = {
  // Optimize for Vercel
  output: 'standalone',
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}
```

## 📞 Support

If you encounter deployment issues:

1. Check Vercel build logs
2. Verify environment variables
3. Test build locally: `npm run build`
4. Check the [Vercel documentation](https://vercel.com/docs)

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project connected
- [ ] Environment variables configured
- [ ] EmailJS service set up
- [ ] Custom domain configured (if applicable)
- [ ] Build successful
- [ ] Site accessible
- [ ] Contact forms working
- [ ] All pages loading correctly
- [ ] Mobile responsive
- [ ] Performance optimized

---

**Ready to deploy! 🚀**
