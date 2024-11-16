import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user:null,
  setIsLoggedIn:(newState)=>{
    set({
        isLoggedIn:newState
    })

  },

  setUser:(userProfile)=>set({user:userProfile})

}))

export default useAuthStore;
