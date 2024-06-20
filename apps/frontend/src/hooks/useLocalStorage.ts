import { useState } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: { username: string } | null
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("Error retrieving data from localStorage:", err);
      return initialValue;
    }
  });

  const setValue = (newValue: { username: string } | null) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      setStoredValue(newValue);
    } catch (err) {
      console.error("Error storing data in localStorage:", err);
    }
  };

  return [storedValue, setValue] as const;
};
