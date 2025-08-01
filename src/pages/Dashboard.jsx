import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { HabitContext } from "../contexts/HabitContext";
import Button from "../components/Button";
import HabitCard from "../components/HabitCard";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { currentUser, logout } = useContext(AuthContext);
  const { habits, addHabit, toggleHabitDay, clearHabits } = useContext(HabitContext);

const navigate = useNavigate();

  // Redirect to login page when logged out
  React.useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    color: "#60a5fa",
  });

  if (!currentUser) {
    return <div>Please log in.</div>;
  }

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    addHabit({
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      color: form.color,
      days: Array(7).fill(false),
    });
    setForm({ name: "", category: "", color: "#60a5fa" });
  };

  return (
    
    <div className="max-w-xl mx-auto py-6 px-4">
      {/* <h2 className="text-4xl font-bold mb-2">
  Hello, {currentUser.firstName}

  
</h2> */}
<h2 className="text-4xl font-bold text-center mb-8">Welcome To Habit-Tracker</h2>


      {/* <Button onClick={logout}>Logout</Button> */}
      <div className="flex justify-center my-4 mt-8">
  <Button onClick={logout}>Logout</Button>
</div>
      <form onSubmit={handleAddHabit} className="my-4 flex flex-col items-center space-y-4 mt-8">
        <input
          className="p-2 border rounded w-full"
          placeholder="Habit Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          className="p-2 border rounded w-full"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        />
        
        <div className="flex items-center gap-4">
    <input
      type="color"
      value={form.color}
      onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
      className="w-8 h-8 p-0 border-0 bg-transparent"
    />
    <Button type="submit">Add Habit</Button>
  </div>

        
        <Button onClick={clearHabits} className="ml-2 bg-red-500 hover:bg-red-600">
          Clear All
        </Button>
      </form>
      <div>
        {habits.length === 0 ? (
          <p>No habits yet.</p>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleDay={(dayIdx) => toggleHabitDay(habit.id, dayIdx)}
            />
          ))
        )}
      </div>
    </div>
  );
}
