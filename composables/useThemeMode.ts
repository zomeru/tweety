type Theme = 'dark' | 'light';

export default () => {
  const useCurrentTheme = () => useState<Theme>('current_theme', () => 'dark');

  const setTheme = (theme: Theme) => {
    const newTheme = useCurrentTheme();
    newTheme.value = theme;
    localStorage.setItem('theme', theme);
  };

  const getTheme = () => {
    const currentTheme = localStorage.getItem('theme') as Theme;
    const _currentTheme = currentTheme || 'dark';

    setTheme(_currentTheme);
  };

  return {
    useCurrentTheme,
    setTheme,
    getTheme,
  };
};
