import { Timestamp } from "firebase-admin/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

type Message = {
  name: string;
  file?: string;
  message?: string;
  createdAt: Timestamp;
};

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(firestore, "messages")),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data()) as Message[];

        setMessages(messages.filter(message => message.message || message.file));
      }
    );

    return () => unSub();
  }, []);

  return messages;
};
