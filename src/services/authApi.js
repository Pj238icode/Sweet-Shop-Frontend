import api from "./api"; 

// REGISTER
export const registerUser = (payload) => {
  return api.post("/auth/register", payload);
};


// LOGIN
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

