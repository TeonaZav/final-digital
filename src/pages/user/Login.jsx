import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Card, Button, Typography } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/schema";
import { useUserLogin } from "../../hooks/useUserLogin";
import { FormField } from "../../components";

const Login = () => {
  const { login, isLoggingIn } = useUserLogin();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Card color="transparent" shadow={false} className="max-w-lg mx-auto">
      <Typography variant="h4" color="blue-gray" className="text-center">
        ავტორიზაცია
      </Typography>

      <FormProvider {...methods}>
        <form
          className="mt-4 mb-2 w-full flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField
            name="email"
            label="ელ.ფოსტა"
            placeholder="user@mail.com"
            type="email"
          />
          <FormField
            name="password"
            label="პაროლი"
            placeholder="********"
            type="password"
          />
          <Button
            className="mt-4"
            fullWidth
            type="submit"
            loading={isLoggingIn}
          >
            {isLoggingIn ? "მუშავდება..." : "შესვლა"}
          </Button>
        </form>
      </FormProvider>

      <Typography color="gray" className="mt-4 text-center text-sm font-normal">
        არ გაქვთ ანგარიში?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-500 hover:underline"
        >
          რეგისტრაცია
        </Link>
      </Typography>
    </Card>
  );
};

export default Login;
