import { Spinner } from "@material-tailwind/react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-start justify-center gap-8 pt-40">
      <Spinner className="h-12 w-12" />
    </div>
  );
};
export default LoadingSpinner;
