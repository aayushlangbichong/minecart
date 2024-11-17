import { create } from "zustand";

const useCartStore = create((set) => ({
  isLoading: false,
  setIsLoading: (newState) => {
    set({
      isLoading: newState,
    });
  },

  cart: null,
  setCart: (newData) => {
    set({
      cart: newData,
    });
  },
}));

export default useCartStore;
