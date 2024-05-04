import { InputField } from "@/components/InputField";
import { Wrapper } from "@/components/Wrapper";
import { useRegisterMutation } from "@/generated/graphql";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [,register] = useRegisterMutation();
  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          console.log("Values", values);
          const response = await register(values);
          console.log("response", response);
          if (response.data?.register?.errors) {
            setErrors({
              username: "Hi I am the error"
            })
          }
          ;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              mt={4}
              type="submit"
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
