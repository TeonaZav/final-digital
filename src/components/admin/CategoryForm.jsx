import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button, Card } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { categoryValidationSchema } from "../../validation/schema";
import { fileToBase64 } from "../../utils/formUtils";
import FormRow from "./FormRow";
import Input from "./Input";
import ImageUpload from "./ImageUpload";

import {
  persistFormDataToSession,
  getSessionData,
} from "../../utils/formUtils";

const STORAGE_KEY = "category-form-data";

const CategoryForm = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );
  const { createNewCategory, isCreating } = useCreateCategory(accessToken);
  const sessionData = getSessionData(STORAGE_KEY);

  const defaultValues = {
    name: "",
    image: null,
  };

  const formValues = sessionData || defaultValues;

  const methods = useForm({
    defaultValues: formValues,
    mode: "onChange",
    resolver: yupResolver(categoryValidationSchema),
  });

  const { handleSubmit, control, watch, reset, getValues } = methods;

  useEffect(() => {
    const subscription = watch((values) => {
      persistFormDataToSession(values, STORAGE_KEY, "image");
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCancel = () => {
    reset(defaultValues);
    sessionStorage.removeItem(STORAGE_KEY);
    setIsCanceled(true);
    setTimeout(() => setIsCanceled(false), 0);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    event.stopPropagation();

    const base64String = await fileToBase64(data.image);

    const newData = {
      name: data.name,
      image: base64String,
    };

    createNewCategory(newData, {
      onSuccess: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        handleCancel();
      },
    });
  };

  const onError = (errors) => {
    console.log(errors);
    console.log(getValues());
  };

  return (
    <section className="container mx-auto mb-10">
      <FormProvider {...methods}>
        <form
          className="flex flex-col max-w-[400px] gap-4 bg-white p-7 rounded-lg"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h2 className="text-xl font-semibold leading-tight mb-16">
            კატეგორიის დამატება
          </h2>
          <FormRow
            label="კატეგორიის სახელი"
            fieldName="name"
            hintMessage="მინიმუმ ორი სიმბოლო"
          >
            <Input fieldName="name" />
          </FormRow>

          <FormRow label="ატვირთეთ ფოტო" fieldName="image">
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUpload
                  fieldName="image"
                  onChange={onChange}
                  value={value}
                  storageKey={STORAGE_KEY}
                  onCancel={isCanceled}
                />
              )}
            />
          </FormRow>

          <div className="grid grid-cols-2 gap-4 ml-auto">
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={isCreating}
            >
              გაუქმება
            </Button>
            <Button type="submit" variant="gradient" loading={isCreating}>
              დამატება
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default CategoryForm;
