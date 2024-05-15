import { useState } from "react";

export const useLocalStorage = (key: string, value: string | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
        return value;
      }
    } catch (err) {
      return value;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
