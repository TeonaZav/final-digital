import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@material-tailwind/react";
import { GoPerson } from "react-icons/go";
import { useUserDetails } from "../../hooks/useUserdetails";
import { useUpdateUser } from "../../hooks/useUpdateUser";

const UserProfile = () => {
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );
  const { userDetails, isLoading, error } = useUserDetails(accessToken);
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userDetails) {
      reset({
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        email: userDetails.email || "",
        password: userDetails.password || "",
      });
    }
  }, [userDetails, reset]);

  const onSubmit = (data) => {
    updateUser({ data, accessToken });
  };

  if (isLoading) return <p>მომხმარებლის მონაცემები იტვიეთება...</p>;
  if (error) return <p>დაფიქსირდა შეცდომა</p>;

  return (
    <div className="container w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      <section className="flex gap-4 mb-10">
        <div className="w-11 h-11 flex items-center justify-center rounded-full p-2 text-gray-900 border-gray-400 bg-gray-300">
          <GoPerson className="text-xl font-bold" />
        </div>
        <div>
          <Typography className="font-bold text-xl">{`${userDetails.first_name} ${userDetails.last_name}`}</Typography>
          <Typography>{`ID: ${userDetails.id}`}</Typography>
        </div>
      </section>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2" className="text-lg font-semibold mb-6">
          პარამეტრები
        </Typography>
        <div className="w-full mb-4">
          <Input
            {...register("first_name", { required: "სახელი აუცილებელია" })}
            name="first_name"
            label="სახელი"
            error={!!errors.first_name}
            disabled={isUpdating}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div className="w-full mb-4">
          <Input
            {...register("last_name", { required: "გვარი აუცილებელია" })}
            name="last_name"
            label="გვარი"
            error={!!errors.last_name}
            disabled={isUpdating}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div className="w-full mb-4">
          <Input
            {...register("email", {
              required: "ელ.ფოსტა აუცილებელია",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "არასწორი ელ.ფოსტის ფორმატი",
              },
            })}
            name="email"
            label="ელ.ფოსტა"
            error={!!errors.email}
            disabled={isUpdating}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full mb-4">
          <Input
            {...register("password", { required: "პაროლი აუცილებელია" })}
            name="password"
            label="პაროლი"
            type="password"
            error={!!errors.password}
            disabled={isUpdating}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "შენახვა"}
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
