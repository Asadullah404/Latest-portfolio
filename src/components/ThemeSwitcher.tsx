import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark' | 'cosmic';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);
  const [timeBasedTheme, setTimeBasedTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Set up time-based theme suggestions
    const updateTimeBasedTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 18) {
        setTimeBasedTheme('light'); // Daytime
      } else if (hour >= 18 && hour < 22) {
        setTimeBasedTheme('cosmic'); // Evening
      } else {
        setTimeBasedTheme('dark'); // Night
      }
    };

    updateTimeBasedTheme();
    const interval = setInterval(updateTimeBasedTheme, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.className = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const themes = [
    { id: 'light' as Theme, name: 'Light', icon: Sun, color: 'hsl(260, 90%, 60%)' },
    { id: 'dark' as Theme, name: 'Dark', icon: Moon, color: 'hsl(260, 90%, 70%)' },
    { id: 'cosmic' as Theme, name: 'Cosmic', icon: Palette, color: 'hsl(280, 90%, 75%)' },
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div
        className="relative"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Main toggle button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="glass glow rounded-full w-14 h-14 shadow-cosmic border-primary/20 hover:border-primary/40 group"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentTheme ? <currentTheme.icon className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
            </motion.div>
          </Button>
        </motion.div>

        {/* Theme options panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 glass rounded-2xl p-4 min-w-[200px] shadow-cosmic border border-primary/20"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold gradient-text mb-3">Choose Theme</h3>
                
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  const isActive = theme === themeOption.id;
                  const isRecommended = timeBasedTheme === themeOption.id && theme !== themeOption.id;
                  
                  return (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => {
                        setTheme(themeOption.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-primary/20 border border-primary/40' 
                          : 'hover:bg-secondary/50 border border-transparent'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/30' : 'bg-secondary/30'}`}>
                        <Icon className="w-4 h-4" style={{ color: themeOption.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {themeOption.name}
                          {isRecommended && (
                            <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                <div className="pt-2 mt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Theme adapts to time of day automatically
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};