import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Message } from "../../types";
import { firestore } from "../firebase";
import { messagesState } from "./state";

export const useSyncMessages = () => {
  const setMessagesState = useSetRecoilState(messagesState);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(firestore, "messages")),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            metadata: doc.metadata,
            ...doc.data(),
          };
        }) as Message[];

        setMessagesState(
          messages.filter((message) => message.message || message.file)
        );
      }
    );

    return () => unSub();
  }, [setMessagesState]);
};
