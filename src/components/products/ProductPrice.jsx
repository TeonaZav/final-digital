import { Typography } from "@material-tailwind/react";

const ProductPrice = ({ price, salePrice, className }) => {
  return (
    <div className="flex items-center gap-2">
      <Typography className={`font-bold text-sm text-gray-900 ${className}`}>
        {salePrice && salePrice < price ? `${salePrice} ₾` : `${price} ₾`}
      </Typography>
      {salePrice && salePrice < price && (
        <>
          <Typography className="text-xs text-gray-500 line-through ml-2">
            {price} ₾
          </Typography>
          <div className="text-white bg-red-500 text-xs font-bold px-2 py-1 rounded ml-2">
            -{Math.round(((price - salePrice) / price) * 100)}%
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPrice;
