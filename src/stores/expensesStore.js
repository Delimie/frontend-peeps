import { create } from "zustand";
import {
  createExpenseApi,
  getExpenseByIdApi,
  updateExpenseApi,
  deleteExpenseApi,
  getExpensesByGroupIdApi
} from "../api/expensesApi";

const useExpenseStore = create((set, get) => ({
  expenses: [],
  currentExpense: null,
  loading: false,

  //สร้างรายการใหม่
  createExpense: async (body, user) => {
    set({ loading: true });
    const resp = await createExpenseApi(body);
    const newExpense = { ...resp.data.result, user };
    console.log(resp.data)
    set((state) => ({
      loading: false,
      expenses: [newExpense, ...(state.expenses || [])]
    }));
    return resp;
  },

  //ดึงรายการทั้งหมดในกลุ่ม
  getExpensesByGroup: async (groupId) => {
    const resp = await getExpensesByGroupIdApi(groupId);
    // console.log('Expenses with splits and debtTransactions:', JSON.stringify(resp, null, 2));
    set({ expenses: resp.data.result });
    return resp;
  },

  //ดึงรายการเดียว
  getExpenseById: async (expenseId) => {
    const resp = await getExpenseByIdApi(expenseId);
    set({ currentExpense: resp.data.result });
    return resp;
  },

  //อัปเดตรายการ
  updateExpense: async (expenseId, body) => {
    const resp = await updateExpenseApi(expenseId, body);
    await get().getExpensesByGroup(body.groupId);
    return resp;
  },

  //ลบรายการ
  deleteExpense: async (expenseId, groupId) => {
    const resp = await deleteExpenseApi(expenseId);
    await get().getExpensesByGroup(groupId);
    return resp;
  },

  //ตั้งค่า currentExpense (เช่นตอน edit)
  setCurrentExpense: (expense) => set({ currentExpense: expense }),
}));

export default useExpenseStore;
