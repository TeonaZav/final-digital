export const productFormConfig = {
  category_name: {
    label: "აირჩიე პროდუქტის კატეგორია",
    type: "select",
    fieldName: "category_name",
  },
  title: {
    label: "პროდუქტის დასახელება",
    type: "text",
    hintMessage: "",
    fieldName: "title",
  },

  description: {
    label: "პროდუქტის აღწერა",
    type: "textarea",
    hintMessage: "",
    fieldName: "description",
  },

  price: {
    label: "ფასი",
    type: "number",
    hintMessage: "მხოლოდ რიცხვები",
    fieldName: "price",
  },

  salePrice: {
    label: "ფასდაკლებული ღირებულება",
    type: "number",
    hintMessage: "შეავსეთ მხოლოდ ფასდაკლების შემთხვევაში",
    fieldName: "salePrice",
  },

  image: {
    label: "ატვირთეთ ფოტო",
    type: "image",
    fieldName: "image",
  },
};

export const defaultValues = {
  category_name: null,
  title: "",
  description: "",
  price: null,
  salePrice: null,
  image: null,
};
