// src/components/HabitCard.jsx
import React from "react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HabitCard = ({ habit, onToggleDay }) => (
  <div className="p-4 mb-4 bg-white rounded-lg shadow flex flex-col sm:flex-row justify-between items-center">
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-4 h-4 rounded-full"
        style={{ background: habit.color }}
      />
      <div>
        <div className="font-semibold">{habit.name}</div>
        <div className="text-xs text-gray-500">{habit.category}</div>
      </div>
    </div>

    <div className="flex gap-1 mt-2 sm:mt-0">
      {habit.days.map((done, idx) => (
        <button
          key={idx}
          onClick={() => onToggleDay(idx)}
          className={`w-8 h-8 rounded ${done ? "bg-green-400 text-white" : "bg-gray-200"} focus:outline-none`}
        >
          {daysOfWeek[idx]}
        </button>
      ))}
    </div>
  </div>
);

export default HabitCard;
