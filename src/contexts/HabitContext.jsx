import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

// 1. Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const HabitContext = createContext();

// 2. Provider component
export const HabitProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  // Load the user's habits from localStorage on login/change
  useEffect(() => {
    if (currentUser && currentUser.phone) {
      const saved = JSON.parse(localStorage.getItem(`habits_${currentUser.phone}`)) || [];
      setHabits(saved);
    } else {
      setHabits([]);
    }
  }, [currentUser]);

  // Save to localStorage whenever habits change
  useEffect(() => {
    if (currentUser && currentUser.phone) {
      localStorage.setItem(`habits_${currentUser.phone}`, JSON.stringify(habits));
    }
  }, [habits, currentUser]);

  // Add new habit
  const addHabit = (habit) => setHabits((prev) => [...prev, habit]);

  // Toggle habit day
  const toggleHabitDay = (habitId, dayIdx) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? { ...habit, days: habit.days.map((d, idx) => (idx === dayIdx ? !d : d)) }
          : habit
      )
    );
  };

  // Clear all habits
  const clearHabits = () => {
    if (currentUser && currentUser.phone) {
      localStorage.removeItem(`habits_${currentUser.phone}`);
    }
    setHabits([]);
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabitDay, clearHabits }}>
      {children}
    </HabitContext.Provider>
  );
};
