# DAM - The House of Insulation

A premium insulation services website built with Next.js 14, featuring a modern React architecture with TypeScript, Tailwind CSS, and comprehensive multilingual support.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/dam-house-of-insulation)

## 🛠 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS 3 + Radix UI components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation  
- **Email**: EmailJS for contact forms
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Deployment**: Vercel (optimized)

## 🏗 Project Structure

```
app/                    # Next.js App Router pages
├── api/               # API routes (ping, demo)
├── admin/             # Admin dashboard pages
├── products/          # Product pages
├── services/          # Service pages
├── layout.tsx         # Root layout
└── page.tsx           # Home page

components/            # Reusable UI components
├── ui/               # Shadcn/ui components
├── admin/            # Admin-specific components
└── ...               # Feature components

contexts/             # React contexts (Auth, Cart, Admin)
data/                 # Static data (products, services)
hooks/                # Custom React hooks
lib/                  # Utilities and configurations
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required for EmailJS contact forms
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: API configuration
PING_MESSAGE=pong

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_HOTJAR_ID=
```

## 📦 Installation & Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dam-house-of-insulation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Automatic deployments**
   - Every push to `main` branch triggers a new deployment
   - Pull request previews are automatically generated

### Manual Build

```bash
npm run build
npm start
```

## 🌐 Features

### Multi-language Support
- English and Arabic (RTL) support
- Dynamic language switching
- Localized content and UI

### Admin Dashboard
- Product management
- Order tracking
- Service management
- Analytics and reporting

### E-commerce Features
- Product catalog with categories
- Shopping cart functionality
- Order management system
- PDF invoice generation

### Contact & Communication
- EmailJS integration for contact forms
- WhatsApp integration
- Multiple contact methods

### SEO & Performance
- Next.js 14 App Router for optimal performance
- Server-side rendering (SSR)
- Static generation where possible
- Image optimization
- Meta tags and OpenGraph support

## 🔧 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
npm test           # Run tests
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Theming

The design system uses CSS custom properties for theming:
- Light and dark mode support
- Customizable color schemes
- Consistent spacing and typography
- Accessible contrast ratios

## 🔒 Security

- TypeScript for type safety
- Input validation with Zod
- Secure API routes
- Environment variable protection
- XSS protection

## 🧪 Testing

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
```

## 📄 License

This project is proprietary software for DAM - The House of Insulation.

## 🤝 Support

For technical support or questions:
- Email: [your-email@domain.com]
- Website: [https://your-website.com]

---

**Built with ❤️ for DAM - The House of Insulation**
