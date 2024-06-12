import { create } from "zustand";

interface SignupStore {
}

export const signupStore = create<SignupStore>(set => ({

}));


export const useSignupStore = signupStore;
