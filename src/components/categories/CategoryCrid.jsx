import { Link } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";
import { CategoryCard } from "..";

const CategoryGrid = ({ to = "/products" }) => {
  const { categories, error } = useGetCategories();


  if (error) {
    return <p>Failed to fetch categories.</p>;
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 mb-4">
      {categories.map((category, index) => (
        <Link
          to={`${to}?categoryName=${encodeURIComponent(category.name)}`}
          key={category.name}
          className="hover:underline"
        >
          <CategoryCard {...category} index={index} />
        </Link>
      ))}
    </section>
  );
};

export default CategoryGrid;
