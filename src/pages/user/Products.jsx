import { useDispatch, useSelector } from "react-redux";
import { ProductPagination, ProductList, Filters } from "../../components";
import { useGetProducts } from "../../hooks/useGetProducts";
import { setPage, setPageSize } from "../../features/products/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const { products, totalPages, error, isFetching } = useGetProducts(filters);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(setPageSize(newPageSize));
  };

  if (error) return <p>Error loading products: {error.message}</p>;
  if (!isFetching && products.length === 0) return <p>No products found.</p>;

  return (
    <>
      <h2 className="text-gray-800 font-semibold text-lg border-b h-10 mb-4">
        {filters.categoryName || "ყველა პროდუქტი"}
      </h2>
      <Filters />
      <ProductList products={products} />
      <ProductPagination
        active={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageSize={filters.pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default Products;
