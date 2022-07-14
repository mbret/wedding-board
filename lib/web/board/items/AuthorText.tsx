import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export const AuthorText = ({ children }: { children: ReactNode }) => (
  <Text
    fontSize="sm"
    whiteSpace="pre-wrap"
    textAlign="right"
    color="gray.700"
    as="cite"
  >
    {children}
  </Text>
);
