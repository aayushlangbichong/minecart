import { create } from 'zustand'

const useCountStore = create((set) => ({
  count: 1,
  setCount:(newCount)=>{
    set({
        count:newCount
    })

  },
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

export default useCountStore;
