import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "../../validation/schema";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useGetCategories } from "../../hooks/useGetCategories";
import { fileToBase64 } from "../../utils/formUtils";
import FormRow from "./FormRow";
import Textarea from "./Textarea";
import Input from "./Input";
import ImageUpload from "./ImageUpload";
import SelectField from "./SelectField";

import {
  convertCategoryOptions,
  persistFormDataToSession,
  getSessionData,
} from "../../utils/formUtils";

import { productFormConfig, defaultValues } from "./productFormConfig";
import CategoryForm from "./CategoryForm";

const STORAGE_KEY = "product-form-data";
const ProductForm = () => {
  const [isCanceled, setIsCanceled] = useState(false);

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  // Hook to create a new product
  const { createNewProduct, isCreating } = useCreateProduct(accessToken);

  // Retrieve form session data if available
  const sessionData = getSessionData(STORAGE_KEY);
  const formValues = sessionData || defaultValues;

  const methods = useForm({
    defaultValues: formValues,
    mode: "onChange",
    resolver: yupResolver(productValidationSchema),
  });

  const { handleSubmit, control, watch, reset, getValues } = methods;

  // Hook to fetch categories
  const { categories } = useGetCategories();

  // Persist form data to session storage on change
  useEffect(() => {
    const subscription = watch((values) =>
      persistFormDataToSession(values, STORAGE_KEY, "image")
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  // Reset form and clear session storage
  const handleReset = () => {
    setIsCanceled(true);
    setTimeout(() => setIsCanceled(false), 0);
    reset(defaultValues);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Form submission logic
  const onSubmit = async (data, event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Convert image file to Base64
      const base64String = data.image ? await fileToBase64(data.image) : null;

      // Prepare data payload
      const newData = {
        ...data,
        image: base64String,
      };

      // Call the create product function
      createNewProduct(newData, {
        onSuccess: () => {
          sessionStorage.removeItem(STORAGE_KEY);
          handleReset();
        },
      });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  // Handle form validation errors
  const onError = (errors) => {
    console.error("Form validation errors:", errors);
    console.log("Current form values:", getValues());
  };

  return (
    <div className="py-5 container">
      <FormProvider {...methods} usingSessionData={!!sessionData}>
        <form
          className="flex flex-col gap-4 max-w-[1000px] mx-auto"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h2 className="text-xl font-semibold leading-tight mb-8">
            პროდუქტის დამატება
          </h2>
          <div className="flex flex-col gap-2">
            {/* Category Selector */}
            <FormRow {...productFormConfig["category_name"]}>
              <SelectField
                options={convertCategoryOptions(categories) || []}
                fieldName="category_name"
                useCustomMenu={true}
                customModalContent={(props) => <CategoryForm {...props} />}
              />
            </FormRow>

            {/* Price and Sale Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRow {...productFormConfig["price"]}>
                <Input fieldName="price" />
              </FormRow>
              <FormRow {...productFormConfig["salePrice"]}>
                <Input fieldName="salePrice" />
              </FormRow>
            </div>

            {/* Description and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRow {...productFormConfig["description"]}>
                <Textarea fieldName="description" />
              </FormRow>
              <FormRow {...productFormConfig["image"]}>
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
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
    </div>
  );
};

export default ProductForm;
