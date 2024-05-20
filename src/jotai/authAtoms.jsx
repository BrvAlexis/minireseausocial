import { atom } from 'jotai';

// Atome pour stocker l'état d'authentification
export const authAtom = atom({
  isLoggedIn: false,
  token: null,
  userId: null,
  email: '',
});

