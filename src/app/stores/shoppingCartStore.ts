import { create } from 'zustand';

interface IShoppingCartStore {
    quantity: number;
    setQuantity: (quantity: number) => void;
    increaseQuantity: (by: number) => void;
    decreaseQuantity: (by: number) => void;
    changeItemQuantity: (oldQuantity: number, newQuantity: number) => void;
}

export const useShoppingCartStore = create<IShoppingCartStore>((set, get) => ({
    quantity: 0,
    setQuantity: quantity => set(state => ({ quantity })),
    increaseQuantity: by => set(state => ({ quantity: state.quantity + by })),
    decreaseQuantity: by => set(state => ({ quantity: state.quantity - by })),
    changeItemQuantity: (oldQuantity, newQuantity) =>
        get().increaseQuantity(newQuantity - oldQuantity),
}));
