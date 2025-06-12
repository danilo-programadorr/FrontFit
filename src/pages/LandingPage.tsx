import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Dumbbell, Apple, Moon, Sun, Globe, Activity, Check, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TypeAnimation } from 'react-type-animation';
import { useAuth } from '../context/AuthContext';
import CheckoutModal from '../components/ui/CheckoutModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { signUp, signIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'register' | null>(null);
  const [authError, setAuthError] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const languages = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    ja: '日本語',
    zh: '中文'
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setAuthError('');

  try {
    // Validação adicional
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    if (showAuthModal === 'register') {
      await signUp(formData.email, formData.password, formData.fullName);
      setAuthError('Registration successful! Please check your email to confirm your account.');
      // Limpa o formulário após sucesso
      setFormData({ fullName: '', email: '', password: '' });
      // Fecha o modal após 2 segundos
      setTimeout(() => setShowAuthModal(null), 2000);
    } else {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Auth error:', error);
    setAuthError(error instanceof Error ? error.message : 'An error occurred during authentication');
  }
};

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Training',
      description: 'Personalized workouts adapted to your progress',
    },
    {
      icon: Dumbbell,
      title: 'Custom Workouts',
      description: 'Programs designed for your specific goals',
    },
    {
      icon: Apple,
      title: 'Nutrition Planning',
      description: 'Meal plans tailored to your preferences',
    },
    {
      icon: Activity,
      title: 'Progress Tracking',
      description: 'Monitor your fitness journey in real-time',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: '/month',
      features: [
        'Basic workout plans',
        'Progress tracking',
        'Community support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '29.99',
      period: '/month',
      features: [
        'Advanced workout plans',
        'Nutrition guidance',
        'Priority support',
        'Custom routines',
      ],
      cta: 'Go Pro',
      popular: false,
    },
    {
      name: 'Premium',
      price: '49.99',
      period: '/month',
      features: [
        'All Pro features',
        'Personal coaching',
        '24/7 support',
        'Custom meal plans',
        'Video consultations',
      ],
      cta: 'Get Premium',
      popular: true,
    },
  ];

  const AuthModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md relative"
      >
        <button
          onClick={() => setShowAuthModal(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {showAuthModal === 'register' ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {showAuthModal === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {authError && (
              <div className="text-red-500 text-sm">{authError}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {showAuthModal === 'register' ? 'Register' : 'Login'}
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {showAuthModal === 'register' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setShowAuthModal('login')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setShowAuthModal('register')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Register
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-20 dark:opacity-10"
        >
          <source src="https://youtu.be/GsPvopOOyBs?si=GGdc2BH0zlyaU_E0" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header */}
      <header className="fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">Liftrix</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                aria-label="Select language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm">{languages[i18n.language as keyof typeof languages]}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        i18n.language === code ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transforme sua jornada fitness
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Seu companheiro de fitness pessoal com tecnologia de IA para treinos personalizados e planos de nutrição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg"
                onClick={() => setShowAuthModal('register')}
              >
                Register
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold shadow-lg"
                onClick={() => setShowAuthModal('login')}
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu plano</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select the perfect plan for your fitness journey
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {showAuthModal && <AuthModal />}

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default LandingPage;