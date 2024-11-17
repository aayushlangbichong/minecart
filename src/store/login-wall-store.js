import { create } from "zustand";

const useLoginWallStore = create((set) => ({
  open: false,
  setOpen: (state) => {
    set({
      open: state,
    });
  },
}));

export default useLoginWallStore;
