import { create } from "zustand";
import { produce } from "immer";

const useStore = create((set) => ({
  cartList: [],
  name: "",
  address: "",
  addName: (name) => set({name: name}),
  addAddress: (address) => set({address: address}),
  addCard: (card) =>
    set(
      produce((draft) => {
        const filter = draft.cartList.filter((item) => {
          return item.name === card.name && item.quality === card.quality;
        });

        if (filter.length > 0) {
          const cardIndex = draft.cartList.findIndex(
            (item) => item.name === card.name && item.quality === card.quality
          );
          draft.cartList[cardIndex].amount += 1;
        } else {
          draft.cartList.push(card);
        }
      })
    ),
  removeCard: (card) =>
    set(
      produce((draft) => {
        const filter = draft.cartList.filter((item) => {
          return item.name === card.name && item.quality === card.quality;
        });
        const cardIndex = draft.cartList.findIndex(
          (item) => item.name === card.name && item.quality === card.quality
        );

        if (filter.length > 0 && draft.cartList[cardIndex].amount > 1) {
          
          draft.cartList[cardIndex].amount -= 1;
        } else {
          if (cardIndex !== -1) {
            draft.cartList.splice(cardIndex, 1);
          }
        }
      })
    ),
}));

export default useStore;
