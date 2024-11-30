import { Spinner } from "@material-tailwind/react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-end gap-8">
      <Spinner className="h-12 w-12" />
    </div>
  );
};
export default LoadingSpinner;
