import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Dropzone from "react-dropzone";
import { useMutation } from "react-query";
import styles from "../styles/Home.module.css";

const Send: NextPage = () => {
  const { mutate: sendData } = useMutation(
    async ({ file, name }: { name: string; file?: File }) => {
      const formData = new FormData();

      formData.append(`name`, name)
      if (file) {
        formData.append("file", file, file.name)
      }

      return axios.post("/api/send", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  );

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Ton nom est requis";
    }
    return error;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Envoyer un message</title>
      </Head>

      <main>
        <Formik
          initialValues={{ name: ``, file: undefined }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);

            console.log(values);

            sendData({ file: values.file, name: values.name });
          }}
        >
          {(props) => (
            <Form>
              <Box marginBottom={8}>
                <Field name="name" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Ton nom</FormLabel>
                      <Input {...field} id="name" placeholder="" size="lg" />
                      <FormHelperText>
                        Affiché en signature du message
                      </FormHelperText>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Field name="file">
                {({ form }: any) => (
                  <FormControl>
                    <FormLabel htmlFor="name">(optionnel) Photo</FormLabel>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        form.setFieldValue(`file`, acceptedFiles[0]);
                        // console.log(fm)
                        console.log(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
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
                        </section>
                      )}
                    </Dropzone>
                    <FormHelperText>Ajouter une photo</FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Send;
