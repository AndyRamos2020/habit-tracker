import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Habit {
  _id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitsState = {
  habits: [],
  loading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk<Habit[]>(
  "habits/fetchHabits",
  async () => {
    const response = await fetch("http://localhost:5000/habits");

    if (!response.ok) {
      throw new Error("Error al obtener hábitos");
    }

    return await response.json();
  }
);

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default habitsSlice.reducer;
