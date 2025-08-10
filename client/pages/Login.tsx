import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Crown, Mail, Eye, EyeOff } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { isRTL } = useTranslation();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: isRTL() ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
          description: isRTL() ? 'مرحباً بك!' : 'Welcome back!'
        });
        
        // Redirect based on user role
        if (email === 'admin@damgcc.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: isRTL() ? 'خطأ في تسجيل الدخول' : 'Login Failed',
          description: isRTL() ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: isRTL() ? 'خطأ' : 'Error',
        description: isRTL() ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="glass-card border-primary/20 premium-shadow-lg">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 premium-gradient rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow"
              >
                <Crown className="h-10 w-10 text-white" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {isRTL() ? 'تسجيل الدخول' : 'Login'}
              </CardTitle>
              <CardDescription>
                {isRTL() ? 'الدخول إلى حسابك في دار المعازل' : 'Access your Dar Al Muaazil account'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {isRTL() ? 'البريد الإلكتروني' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isRTL() ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    {isRTL() ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isRTL() ? 'أدخل كلمة المرور' : 'Enter your password'}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full gap-3 premium-gradient text-white font-bold py-3 premium-shadow-lg neon-border transition-all duration-500"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {isRTL() ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4" />
                        {isRTL() ? 'تسجيل الدخول' : 'Sign In'}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">
                  {isRTL() ? 'بيانات تجريبية:' : 'Demo Credentials:'}
                </h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div><strong>{isRTL() ? 'مدير:' : 'Admin:'}</strong> admin@damgcc.com / admin123</div>
                  <div><strong>{isRTL() ? 'مستخدم:' : 'User:'}</strong> user@damgcc.com / user123</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
