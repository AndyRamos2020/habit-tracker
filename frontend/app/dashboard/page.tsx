/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { createHabit, getHabits, completeHabit } from "../../services/api";

type Habit = {
  _id: string;
  name: string;
  streak: number;
};

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");

  const getProgress = (streak: number) => {
    return Math.min((streak / 66) * 100, 100);
  };

  const loadHabits = async () => {
    const data = await getHabits();
    setHabits(Array.isArray(data) ? data : data.habits || []);
  };

  const handleCreate = async () => {
    await createHabit(name);
    setName("");
    loadHabits();
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div>
      <h1>Mis hábitos</h1>

      <input
        placeholder="Nuevo hábito"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate}>Agregar</button>

      <ul>
        {Array.isArray(habits) &&
          habits.map((h: Habit) => (
            <li key={h._id}>
              {h.name} - Racha: {h.streak}

              <button
                onClick={async () => {
                  await completeHabit(h._id);
                  loadHabits();
                }}
              >
                Completar
              </button>

              <div style={{ width: "100%", background: "#ccc", height: "10px", marginTop: "5px" }}>
                <div
                  style={{
                    width: `${getProgress(h.streak)}%`,
                    height: "10px",
                    background: `rgb(${Math.max(255 - h.streak * 4, 0)}, ${Math.min(h.streak * 4, 255)}, 0)`
                  }}
                ></div>
              </div>

              <p>{Math.floor(getProgress(h.streak))}% completado</p>
            </li>
          ))}
      </ul>
    </div>
  );
}