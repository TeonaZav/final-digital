import { Link } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";
import { CategoryCard } from "..";

const CategoryCrid = () => {
  const { categories, error } = useGetCategories();

  if (error) {
    return <p>Faild to fetch categories</p>;
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {categories.map((category, index) => (
        <Link to={`/products/${category.name}`} key={category.name}>
          <CategoryCard {...category} index={index} />
        </Link>
      ))}
    </section>
  );
};

export default CategoryCrid;
