import { Box, Text } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { truncate } from "../../truncate";
import { AuthorText } from "./AuthorText";

export const MessageItem = memo(
  ({
    name,
    message,
    onLoad,
  }: {
    name: string;
    message?: string;
    onLoad: () => void;
  }) => {

    useEffect(() => {
      onLoad();
    }, [onLoad]);

    if (!message) return null;

    return (
      <Box
        style={{
          width: `100%`,
          border: `5px solid white`,
          backgroundColor: `white`,
          borderRadius: `5px`,
          padding: 5,
        }}
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="md" whiteSpace="pre-wrap" mb={2}>
          {truncate(message, 150)}
        </Text>
        <AuthorText>{name}</AuthorText>
      </Box>
    );
  }
);

MessageItem.displayName = `MessageItem`;
