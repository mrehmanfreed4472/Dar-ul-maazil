'use client'

import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const { t, isRTL } = useTranslation();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">دم</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">Dar Al Muaazil</span>
                <span className="text-sm text-muted-foreground">
                  {isRTL() ? 'دار المعازل للمواد العازلة' : 'Premium Construction Materials'}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {isRTL() 
                ? 'مورد موثوق لمواد العزل والحماية من الماء في دولة الإمارات العربية المتحدة. نلتزم بالجودة والتميز في خدمة صناعة البناء.'
                : 'Trusted supplier of waterproofing and insulation materials in the UAE. Committed to quality and excellence in serving the construction industry.'
              }
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/971502342218"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isRTL() ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('nav.products')}
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isRTL() ? 'معلومات الاتصال' : 'Contact Info'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Shams Business Center, Sharjah, UAE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+971502342218</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@damgcc.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Dar Al Muaazil. {isRTL() ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
