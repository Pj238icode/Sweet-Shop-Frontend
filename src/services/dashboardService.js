import api from "./api";

//Get Dashboard Stats For Admin
export const getSweetDashboardStats = () => {
  return api.get("/dashboard/sweets");
};
