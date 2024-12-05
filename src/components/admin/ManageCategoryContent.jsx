import { useGetCategories } from "../../hooks/useGetCategories";
import CategoriesTable from "./CategoriesTable";
import CategoryForm from "./CategoryForm";

const ManageCategoryContent = () => {
  const { categories } = useGetCategories();

  return (
    <div className="flex flex-col">
      <CategoryForm />
      <CategoriesTable data={categories}  />
    </div>
  );
};

export default ManageCategoryContent;
