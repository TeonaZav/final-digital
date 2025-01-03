import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Card, Button, Typography } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../../validation/schema";
import { useCreateUser } from "../../hooks/useCreateUser";
import { FormField } from "../../components";

const Register = () => {
  const { addUser, isCreating } = useCreateUser();

  const methods = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    addUser(data);
  };

  return (
    <Card color="transparent" shadow={false} className="max-w-lg mx-auto">
      <Typography variant="h4" color="blue-gray" className="text-center">
        რეგისტრაცია
      </Typography>

      <FormProvider {...methods}>
        <form
          className="mt-8 mb-2  max-w-screen-lg w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField
            name="first_name"
            label="სახელი"
            placeholder="First Name"
          />
          <FormField name="last_name" label="გვარი" placeholder="Last Name" />
          <FormField
            name="email"
            label="ელ. ფოსტა"
            placeholder="name@mail.com"
            type="email"
          />
          <FormField
            name="password"
            label="პაროლი"
            placeholder="********"
            type="password"
          />
          <FormField
            name="phone_number"
            label="ტელეფონის ნომერი"
            placeholder="Phone Number"
          />

          <Button type="submit" fullWidth loading={isCreating}>
            {isCreating ? "იტვირთება..." : "ანგარიშის შექმნა"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            უკვე გაქვთ ანგარიში?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              შესვლა
            </Link>
          </Typography>
        </form>
      </FormProvider>
    </Card>
  );
};

export default Register;
