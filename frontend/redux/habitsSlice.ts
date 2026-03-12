import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  _id: string;
  name: string;
  completed?: boolean;
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


export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {

      const response = await fetch("http://localhost:5000/habits");

      if (!response.ok) {
        throw new Error("Error al obtener hábitos");
      }

      const data = await response.json();
      return data;

    } catch (error) {

      return rejectWithValue(
        "No se pudo conectar con el servidor. ¿Está corriendo el backend?"
      );

    }
  }
);

export const completeHabit = createAsyncThunk(
  "habits/completeHabit",
  async (id: string) => {

    const res = await fetch(`http://localhost:5000/habits/${id}`, {
      method: "PATCH",
    });

    return await res.json();
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

      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.loading = false;
        state.habits = action.payload;
      })

      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error desconocido";
      })


      .addCase(completeHabit.fulfilled, (state, action: PayloadAction<Habit>) => {

        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );

        if (index !== -1) {
          state.habits[index] = action.payload;
        }

      });

  },
});

export default habitsSlice.reducer;