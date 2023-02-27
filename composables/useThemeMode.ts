type Theme = 'dark' | 'light' | null;

export default () => {
  const useCurrentTheme = () => useState<Theme>('current_theme', () => null);

  const setTheme = (theme: Theme) => {
    const newTheme = useCurrentTheme();
    newTheme.value = theme;
    localStorage.setItem('theme', theme as string);
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
