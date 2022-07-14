import { useCallback, useState } from "react";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { activeItemsState, messagesState } from "./state";

const getFreshRandom = (maximum: number) => {
  const tktMaxTrustMe = maximum / (Math.exp(1) - 1);
  return Math.floor((Math.exp(Math.random()) - 1) * tktMaxTrustMe);
};

export const useRandomMessage = () => {
  const messages = useRecoilValue(messagesState);
  const [message, setMessage] = useState<typeof messages[number] | undefined>(
    undefined
  );
  const messageId = message?.id;

  const removeFromActive = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (messageId?: string) => {
        setMessage(undefined);
        if (messageId) {
          set(activeItemsState, (value) =>
            value.filter((id) => id !== messageId)
          );
        }
      },
    []
  );

  const updateMessage = useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      (messageId?: string) => {
        if (messageId) {
          set(activeItemsState, (value) =>
            value.filter((id) => id !== messageId)
          );
        }
        const availableMessages = get(messagesState).filter(
          ({ id }) => !get(activeItemsState).includes(id)
        );
        const newMessage =
          availableMessages[
            getFreshRandom(availableMessages.length - 1)
          ];

        if (newMessage) {
          set(activeItemsState, (value) => [...value, newMessage.id]);
          setMessage(newMessage);
        }
      },
    [removeFromActive]
  );

  const reset = useCallback(() => {
    updateMessage(messageId);
  }, [messageId, updateMessage]);

  const clear = useCallback(() => {
    removeFromActive(messageId);
  }, [messageId, removeFromActive]);

  return { message, clear, reset };
};
