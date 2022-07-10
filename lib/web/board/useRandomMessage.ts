import { useEffect, useRef, useState } from "react";
import { useMessages } from "./useMessages";

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const useRandomMessage = () => {
  const messages = useMessages();
  const messagesRef = useRef(messages);
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState<typeof messages[number] | undefined>(
    undefined
  );
  const hasMessages = messages.length > 0;
  messagesRef.current = messages;

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setVisible((value) => !value);
      },
      visible
        ? getRandomNumberBetween(8000, 15000)
        : getRandomNumberBetween(1000, 2000)
    );

    return () => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setMessage(
        messagesRef.current[
          getRandomNumberBetween(0, messagesRef.current.length)
        ]
      );
    } else {
      // setMessage(undefined);
    }
  }, [visible, hasMessages]);

  return { message, visible };
};
