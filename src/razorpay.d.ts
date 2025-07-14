// src/types/razorpay.d.ts or src/index.d.ts (depends on where your global types are)
declare global {
  interface Window {
    Razorpay: any;
  }
}
export {};
