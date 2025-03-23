import { tr } from "framer-motion/client";
import { atom } from 'jotai';

const initialValue = JSON.parse(localStorage.getItem('showPaymentComponents')) ?? false;

export const showPaymentComponents = atom(
  initialValue,
  (get, set, newValue) => {
    set(showPaymentComponents, newValue);
    localStorage.setItem('showPaymentComponents', JSON.stringify(newValue));
  }
);
