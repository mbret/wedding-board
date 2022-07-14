import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

export const FileField = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  return (
    <Field name="file">
      {({ field, form }: any) => {
        return (
          <FormControl isDisabled={form.isSubmitting}>
            <FormLabel htmlFor="file">Image ou photo</FormLabel>
            <Dropzone
              maxFiles={1}
              accept={{
                "image/*": [".jpeg", ".png"],
              }}
              onDrop={(acceptedFiles) => {
                form.setFieldValue(`file`, acceptedFiles[0]);
                console.log(acceptedFiles);
                setFiles(
                  acceptedFiles.map((file) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file),
                    })
                  )
                );
              }}
            >
              {({ getRootProps, getInputProps, acceptedFiles, inputRef }) => (
                <section className="container">
                  <div
                    {...getRootProps({
                      style: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        borderWidth: 2,
                        borderRadius: 2,
                        borderColor: "#eeeeee",
                        borderStyle: "dashed",
                        backgroundColor: "#fafafa",
                        color: "#bdbdbd",
                        outline: "none",
                        transition: "border .24s ease-in-out",
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>Appuyer pour choisir un fichier</p>
                  </div>
                  <FormHelperText>Seulement 1 fichier accepté</FormHelperText>
                  <aside
                    style={{
                      paddingTop: 8,
                      display: `flex`,
                    }}
                  >
                    {files.map((file) => (
                      <div
                        style={{
                          display: "inline-flex",
                          borderRadius: 2,
                          border: "1px solid #eaeaea",
                          marginBottom: 8,
                          marginRight: 8,
                          width: "40%",
                          height: 100,
                          padding: 4,
                          boxSizing: "border-box",
                        }}
                        key={file.name}
                      >
                        <img
                          src={file.preview}
                          alt="preview"
                          width="100%"
                          height="100%"
                          style={{
                            display: "block",
                            objectFit: `contain`,
                          }}
                          // Revoke data uri after image is loaded
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                          }}
                        />
                      </div>
                    ))}
                    {files.length > 0 && (
                      <Button
                        width="100%"
                        variant="link"
                        onClick={() => {
                          form.setFieldValue(`file`, undefined);
                          setFiles([]);
                        }}
                      >
                        Supprimer
                      </Button>
                    )}
                  </aside>
                </section>
              )}
            </Dropzone>
          </FormControl>
        );
      }}
    </Field>
  );
};
