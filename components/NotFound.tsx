import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const NotFound = () => {
  const pathname = usePathname();
  const { isRTL } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname,
    );
  }, [pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            {isRTL() ? 'الصفحة غير موجودة' : 'Page not found'}
          </p>
          <Button asChild>
            <Link href="/">
              {isRTL() ? 'العودة للرئيسية' : 'Go Home'}
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
