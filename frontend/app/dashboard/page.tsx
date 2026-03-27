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
    try {
      const data = await getHabits();
      setHabits(Array.isArray(data) ? data : data.habits || []);
    } catch {
      alert("Error cargando hábitos");
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createHabit(name);
    setName("");
    loadHabits();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadHabits();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: "20px", color: "white" }}>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Habit Tracker</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            placeholder="Nuevo hábito"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              outline: "none"
            }}
          />

          <button
            onClick={handleCreate}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              background: "#22c55e",
              color: "white",
              cursor: "pointer"
            }}
          >
            Agregar
          </button>
        </div>

        {habits.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>No tienes hábitos aún</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {habits.map((h) => (
            <div
              key={h._id}
              style={{
                background: "#1e293b",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{h.name}</h3>
                  <p style={{ margin: 0, fontSize: "14px", opacity: 0.7 }}>
                    Día {h.streak} de 66
                  </p>
                </div>

                <button
                  onClick={async () => {
                    await completeHabit(h._id);
                    loadHabits();
                  }}
                  style={{
                    background: "#3b82f6",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Completar
                </button>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#334155",
                  borderRadius: "10px",
                  marginTop: "10px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${getProgress(h.streak)}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #ef4444, #22c55e)"
                  }}
                ></div>
              </div>

              <p style={{ fontSize: "12px", marginTop: "5px", opacity: 0.7 }}>
                {Math.floor(getProgress(h.streak))}% completado
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.href = "/login";
          }}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}