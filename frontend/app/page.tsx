"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, Habit } from "../redux/habitsSlice";
import type { RootState, AppDispatch } from "../store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { habits, loading, error } = useSelector((state: RootState) => state.habits) as { habits: Habit[]; loading: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Habit Tracker
      </h1>

    
      <div className="mb-8 max-w-md mx-auto">
        <div className="w-full bg-red-200 rounded-full h-6">
          <div className="bg-green-500 h-6 rounded-full w-1/3"></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          22 / 66 días
        </p>
      </div>

   
      {loading && <p className="text-center">Cargando hábitos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4 max-w-md mx-auto">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
          >
            <span className="font-medium text-gray-800">
              {habit.name}
            </span>
            
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Done
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}