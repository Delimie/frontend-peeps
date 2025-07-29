import { create } from "zustand";
import {
  listExpenseSplits,
  createExpenseSplits,
  updateExpenseSplit,
  removeExpenseSplit
} from "../api/splitApi";

const useSplitStore = create((set, get) => ({
  splits: [],
  loading: false,

  //ดึง splits ทั้งหมดใน expense
  getSplitsByExpenseId: async (expenseId) => {
    set({ loading: true });
    const resp = await listExpenseSplits(expenseId);
    set({ splits: resp.data.result, loading: false });
    return resp;
  },

  //สร้าง splits ใหม่
  createSplit: async (expenseId, body) => {
    const resp = await createExpenseSplits(expenseId, body);
    await get().getSplitsByExpenseId(expenseId);
    return resp;
  },

  //แก้ไข split
  updateSplit: async (expenseId, splitId, body) => {
    const resp = await updateExpenseSplit(expenseId, splitId, body);
    await get().getSplitsByExpenseId(expenseId);
    return resp;
  },

  //ลบ split
  deleteSplit: async (expenseId, splitId) => {
    const resp = await removeExpenseSplit(expenseId, splitId);
    await get().getSplitsByExpenseId(expenseId);
    return resp;
  },

  //ล้าง splits
  clearSplits: () => set({ splits: [] }),
}));

export default useSplitStore;
