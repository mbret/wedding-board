import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";
import { truncate } from "../../truncate";
import { AuthorText } from "./AuthorText";

export const PhotoItem = memo(
  ({
    name,
    file,
    message,
    onLoad
  }: {
    name: string;
    file?: string;
    message?: string;
    onLoad: () => void
  }) => {
    if (!file) return null;

    return (
      <Box
        style={{
          border: `5px solid white`,
          backgroundColor: `white`,
          borderRadius: `3%`,
        }}
        display="flex"
        flexDirection="column"
      >
        <picture>
          <img src={file} alt={file} onLoad={onLoad}/>
        </picture>
        <Text
          style={{
            marginTop: 5,
            paddingLeft: 2,
            paddingRight: 2,
            whiteSpace: `pre-wrap`,
          }}
        >
          {!!message && truncate(message, 100)}
        </Text>
        <AuthorText>{name}</AuthorText>
      </Box>
    );
  }
);

PhotoItem.displayName = `MessageItem`;
