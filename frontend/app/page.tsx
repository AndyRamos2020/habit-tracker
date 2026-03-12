"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, Habit, completeHabit } from "../redux/habitsSlice";
import type { RootState, AppDispatch } from "./store";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();

  const { habits, loading, error } = useSelector(
    (state: RootState) => state.habits
  );

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Cargando hábitos...
        </p>
      </main>
    );
  }

 if (error) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-red-100 text-red-700 p-6 rounded-xl shadow-md text-center max-w-sm">
        <p className="font-semibold mb-2">
          No se pudo conectar con el servidor
        </p>
        <p className="text-sm">
          Verifica que el backend esté corriendo.
        </p>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Habit Tracker
      </h1>

      <div className="mb-8 max-w-md mx-auto">
        <div className="w-full bg-red-200 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: "33%" }}
          />
        </div>

        <p className="text-center mt-2 text-sm text-gray-600">
          22 / 66 días
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">

        {habits?.length === 0 && (
          <p className="text-center text-gray-500">
            No hay hábitos aún
          </p>
        )}

        {habits?.map((habit: Habit) => (
          <div
            key={habit._id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
          >

            <span className="font-medium text-gray-800">
              {habit.name}
            </span>

            <button
              onClick={() => dispatch(completeHabit(habit._id))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Done
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}