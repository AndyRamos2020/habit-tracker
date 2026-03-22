const API_URL = "http://localhost:4000/api";

export const registerUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

const getToken = () => {
  return localStorage.getItem("token");
};

export const createHabit = async (name: string) => {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken() || ""
    },
    body: JSON.stringify({ name })
  });

  return res.json();
};

export const getHabits = async () => {
  const res = await fetch(`${API_URL}/habits`, {
    headers: {
      "Authorization": getToken() || ""
    }
  });

  return res.json();
};

export const completeHabit = async (id: string) => {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": localStorage.getItem("token") || ""
    }
  });

  return res.json();
};