import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";
import { handleCategoryClickLogic } from "../../utils/categoryUtils";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();
  const { categories } = useGetCategories();

  return (
    <ul>
      {categories.map((item) => (
        <li key={item.id}>
          <button
            onClick={() =>
              handleCategoryClickLogic(item.name, setSearchParams, dispatch)
            }
            className="p-2 pl-0 whitespace-nowrap rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-100 w-full text-left"
          >
            <span className="text-sm">{item.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
