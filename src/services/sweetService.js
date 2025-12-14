import api from "./api";

//Get All Sweets
export const getAllSweets = (page = 0, size = 6) => {
  return api.get(
    `/sweets?page=${page}&size=${size}&sortBy=id&direction=asc`
  );
};


//Add Sweet
export const addSweet = (formData) => {
  return api.post("/sweets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//Update Sweet
export const updateSweet = (id, formData) => {
  return api.put(`/sweets/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//Delete Sweet
export const deleteSweet = (id) => {
  return api.delete(`/sweets/${id}`);
};


// Purchase Sweet
export const purchaseSweet = (sweetId, quantity) => {
  return api.post(`/sweets/${sweetId}/purchase`, {
    quantity,
  });
};

// Restock Sweet
export const restockSweet = (id, quantity) => {
  return api.post(`/sweets/${id}/restock`, { quantity });
};

//Search Sweet
export const searchSweets = (params) => {
  return api.get("/sweets/search", { params });
};


