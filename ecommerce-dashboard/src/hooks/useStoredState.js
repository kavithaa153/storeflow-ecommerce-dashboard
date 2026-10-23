
import { useEffect, useState } from "react";

export default function useStoredState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch {
      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Unable to save data:", error);
    }
  }, [key, state]);

  return [state, setState];
}
