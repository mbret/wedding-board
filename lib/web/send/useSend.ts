import axios from "axios";
import { useMutation } from "react-query";

export const useSend = () => {
  return useMutation(
    async ({
      file,
      name,
      message,
    }: {
      name: string;
      file?: File;
      message?: string;
    }) => {
      const formData = new FormData();

      formData.append(`name`, name);
      if (file) {
        formData.append("file", file, file.name);
      }
      if (message) {
        formData.append("message", message);
      }

      return axios.post<{}>("/api/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  );
};
