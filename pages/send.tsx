import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSend } from "../lib/web/send/useSend";
import { AutoResizeTextarea } from "../lib/web/common/AutoResizeTextarea";
import { useToast } from "@chakra-ui/react";
import { FileField } from "../lib/web/send/FileField";

function validateName(value: string) {
  let error;
  if (!value) {
    error = "Ton nom est requis";
  }
  return error;
}

function validateMessage(value: string) {
  return undefined;
}

const Send: NextPage = () => {
  const { mutate: sendData } = useSend();
  const toast = useToast();

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
              actions.setSubmitting(true);

              console.log(values);

              sendData(
                {
                  file: values.file,
                  name: values.name,
                  message: values.message,
                },
                {
                  onSettled: () => {
                    actions.setSubmitting(false);
                  },
                  onSuccess: () => {
                    actions.resetForm();
                    toast({
                      title: `Ton message a bien été envoyé`,
                      status: `success`,
                      isClosable: true,
                    });
                  },
                  onError: () => {
                    toast({
                      title: `Une erreur est survenue, Merci de réessayer`,
                      status: `error`,
                      isClosable: true,
                    });
                  },
                }
              );
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
                          isDisabled={form.isSubmitting}
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
                          isDisabled={form.isSubmitting}
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
                    <FileField />
                  </Box>
                  {!!props.errors.error && props.submitCount > 0 && (
                    <Text color="red.500" paddingY={2}>
                      {props.errors.error}
                    </Text>
                  )}
                  <Button
                    mt={4}
                    width="100%"
                    size="lg"
                    isLoading={props.isSubmitting}
                    loadingText="Envoi en cours"
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
