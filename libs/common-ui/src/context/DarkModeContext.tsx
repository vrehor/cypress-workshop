import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {
    // ignore
  },
});

export const DarkModeProvider = ({ storage, defaultValue, children }) => {
  const [isDarkMode, setDarkMode] = useState<boolean | null>(null);

  const toggleDarkMode = useCallback(() => {
    if (storage === 'local') {
      localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    }
    setDarkMode(!isDarkMode);
  }, [isDarkMode, storage]);

  useEffect(() => {
    if (storage === 'local') {
      setDarkMode(localStorage.getItem('theme') === 'dark');
    } else {
      // this is because of storybook
      setDarkMode(
        defaultValue !== undefined && defaultValue !== null
          ? defaultValue
          : false
      );
    }
  }, [storage, defaultValue]);

  const body = (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );

  // prevents ssr flash for mismatched dark mode
  if (isDarkMode === null) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};

export const useDarkModeContext = () => useContext(DarkModeContext);
