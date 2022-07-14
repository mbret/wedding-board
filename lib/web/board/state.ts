import { atom, selector } from "recoil";
import { Message } from "../../types";

export const activeItemsState = atom<string[]>({
  default: [],
  key: `activeItemsState`,
});

export const messagesState = atom<Message[]>({
  default: [],
  key: `messagesState`,
});
