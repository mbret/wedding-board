import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Dropzone from "react-dropzone";
import { useMutation } from "react-query";
import styles from "../styles/Home.module.css";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React from "react";

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <Textarea
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        ref={ref}
        minRows={1}
        as={ResizeTextarea}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = `AutoResizeTextarea`;

const Send: NextPage = () => {
  const { mutate: sendData } = useMutation(
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

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Ton nom est requis";
    }
    return error;
  }

  function validateMessage(value: string) {
    let error;
    // if (!value) {
    //   error = "Ton nom est requis";
    // }
    return error;
  }

  return (
    <div
      style={{
        padding: 8 * 2,
      }}
    >
      <Head>
        <title>Envoyer un message</title>
      </Head>

      <main>
        <Heading as="h1" mb={2}>
          Envoyer un message
        </Heading>
        <Text
          mb={4}
          fontSize="md"
        >{`Utilise ce formulaire pour envoyer un message qui sera directement affiché sur la board. Tu peux envoyer un message avec du texte, du texte avec une photo ou une photo sans texte. Les meilleurs messages seront imprimés dans un livre d'or pour les mariés.`}</Text>
        <Box>
          <Formik
            initialValues={{
              name: ``,
              file: undefined,
              message: ``,
              error: ``,
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);

              console.log(values);

              sendData({
                file: values.file,
                name: values.name,
                message: values.message,
              });
            }}
            validate={(values) => {
              if (!values.message && !values.file) {
                return {
                  error: `Tu dois avoir au moins un message ou une photo`,
                };
              }
            }}
          >
            {(props) => {
              console.log(props);

              return (
                <Form>
                  <Box marginBottom={8}>
                    <Field name="name" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel htmlFor="name">Nom</FormLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder=""
                            size="lg"
                          />
                          <FormHelperText>
                            Affiché en signature du message
                          </FormHelperText>
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box marginBottom={8}>
                    <Field name="message" validate={validateMessage}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.message && form.touched.message
                          }
                        >
                          <FormLabel htmlFor="message">Message</FormLabel>
                          <AutoResizeTextarea
                            {...field}
                            id="message"
                            placeholder=""
                            size="lg"
                          />
                          <FormErrorMessage>
                            {form.errors.message}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box marginBottom={8}>
                    <Field name="file">
                      {({ form }: any) => (
                        <FormControl>
                          <FormLabel htmlFor="name">Image</FormLabel>
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
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  {!!props.errors.error && props.submitCount > 0 && (
                    <Text color="red.500" paddingY={2}>
                      {props.errors.error}
                    </Text>
                  )}
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Envoyer
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </main>
    </div>
  );
};

export default Send;
