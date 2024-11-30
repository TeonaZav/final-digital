import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const bgColors = [
  "bg-blue-50",
  "bg-pink-50",
  "bg-yellow-50",
  "bg-green-50",
  "bg-red-50",
  "bg-gray-100",
];

const CategoryCard = ({ name, image, index }) => {
  return (
    <Card
      shadow={false}
      className={`relative grid h-48 w-fullitems-end overflow-hidden rounded-lg ${
        bgColors[index % bgColors.length]
      }`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex justify-end items-end absolute inset-0 m-0 h-full w-full rounded-none"
      >
        <img
          src={image}
          alt={name}
          className="object-contain w-2/5"
        />
      </CardHeader>
      <CardBody className="relative px-6">
        <Typography
          variant="h3"
          className="mb-6 font-semibold text-black text-base"
        >
          {name}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
