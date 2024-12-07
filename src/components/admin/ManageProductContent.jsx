import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

const ManageProductContent = () => {
  return (
    <div className="flex flex-col items-center">
      <ProductForm />
      <ProductsTable />
    </div>
  );
};

export default ManageProductContent;
