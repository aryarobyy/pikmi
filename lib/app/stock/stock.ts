import apiHandler from "@/lib/axios";

export const updateStock = async (data: any) => {
  const res = await apiHandler.patch(`/menu/stock`, data);
  return res.data;
};


