import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useGetProduct } from "../../hooks/useGetProduct";
import { PriceSection, ImageWithSkeleton } from "./../../components";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, error } = useGetProduct(id);

  if (error) return <p className="text-center text-red-500">{error.message}</p>;
  if (!product) return <p className="text-center">პროდუქტი არ მოიძებნა</p>;
  const { title, description, category_name, image } = product;

  const productDetails = [
    {
      label: "კატეგორია:",
      value: category_name,
    },
    {
      label: "დასახელება:",
      value: title,
    },
    {
      label: "პროდუქციის აღწერა:",
      value: description,
    },
  ];

  return (
    <section className="w-full max-w-[1240px] mx-auto p-5">
      <Typography variant="h2" className="text-lg font-bold mb-6">
        {product.title}
      </Typography>
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <figure className="mx-auto min-h-64 w-full h-full lg:mx-0 bg-gray-100 rounded-lg border">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="rounded-lg"
            skeletonClassName="h-full rounded-lg"
          />
        </figure>
        <ul>
          {productDetails.map((detail, index) => (
            <li
              key={`${index}_${detail.label}`}
              className="flex items-center gap-4"
            >
              <Typography className="mt-2 text-gray-400 font-semibold text-base shrink-0">
                {detail.label}
              </Typography>
              <div className="mt-2 text-gray-900 font-medium text-sm">
                {detail.value}
              </div>
            </li>
          ))}
        </ul>
        <PriceSection product={product} />
      </div>
    </section>
  );
};

export default ProductDetails;
