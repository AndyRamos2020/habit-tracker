"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../redux/habitsSlice";
import type { RootState, AppDispatch } from "../redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { habits, loading, error } = useSelector(
    (state: RootState) => state.habits
  );

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Hábitos</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {habits.map((habit) => (
        <div
          key={habit._id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <p><strong>{habit.name}</strong></p>
          <p>Racha: {habit.streak} días</p>
        </div>
      ))}
    </div>
  );
}
