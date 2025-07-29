import { create } from "zustand";
import {
  createDebtTransactionApi,
  getDebtTransactionByIdApi,
  getUserDebtTransactionsApi,
  confirmDebtTransactionApi,
} from "../api/deptTransaction";

const useDebtTransactionStore = create((set, get) => ({
  transactions: [],
  currentTransaction: null,
  loading: false,

  //สร้าง transaction ใหม่
  createTransaction: async (body) => {
    set({ loading: true });
    const resp = await createDebtTransactionApi(body);
    // Optionally: รีเฟรชรายการของ user หลังสร้าง
    set({ loading: false });
    return resp;
  },

  //ดึงธุรกรรมด้วย ID
  getTransactionById: async (id) => {
    set({ loading: true });
    const resp = await getDebtTransactionByIdApi(id);
    set({ currentTransaction: resp.data.result, loading: false });
    return resp;
  },

  //ดึงธุรกรรมทั้งหมดของ user
  getTransactionsByUser: async (userId) => {
    set({ loading: true });
    const resp = await getUserDebtTransactionsApi(userId);
    set({ transactions: resp.data.result, loading: false });
    return resp;
  },

  //ยืนยันธุรกรรม
  confirmTransaction: async (transactionId, userId) => {
    set({ loading: true });
    const resp = await confirmDebtTransactionApi(transactionId);
    // รีเฟรชรายการธุรกรรมของ user หลังยืนยัน
    if (userId) await get().getTransactionsByUser(userId);
    set({ loading: false });
    return resp;
  },

  //ตั้งค่าธุรกรรมปัจจุบัน
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction }),

  //เคลียร์ state
  clearTransactions: () => set({ transactions: [], currentTransaction: null }),
}));

export default useDebtTransactionStore;
