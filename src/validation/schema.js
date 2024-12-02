import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  first_name: yup.string().required("სახელი სავალდებულოა"),
  last_name: yup.string().required("გვარი სავალდებულოა"),
  email: yup
    .string()
    .email("ელ. ფოსტის არასწორი ფორმატი")
    .required("ელ. ფოსტა სავალდებულოა"),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .min(8, "პაროლი არ უნდა იყოს 8 სიმბოლოზე ნაკლები"),

  phone_number: yup
    .string()
    .required("ტელეფონის ნომერი სავალდებულოა")
    .matches(
      /^[0-9]{9,14}$/,
      "ტელეფონის ნომერი უნდა იყოს 9/14 ციფრისგან შემდგარი"
    ),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("ელ. ფოსტის არასწორი ფორმატი")
    .required("ელ. ფოსტა სავალდებულოა"),
  password: yup.string().required("პაროლი სავალდებულოა"),
});
