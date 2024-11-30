import { setFilters } from "../features/products/productSlice";

export const handleCategoryClickLogic = (
  categoryName,
  setSearchParams,
  dispatch
) => {
  setSearchParams((prevParams) => {
    const updatedParams = new URLSearchParams(prevParams);
    updatedParams.set("categoryName", categoryName);
    updatedParams.set("page", 1);
    console.log(updatedParams.toString());
    return updatedParams;
  });

  dispatch(
    setFilters({
      categoryName,
      page: 1,
    })
  );
};
