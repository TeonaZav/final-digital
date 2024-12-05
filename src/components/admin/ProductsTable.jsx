import React, { useState, useMemo } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {
  TrashIcon,
  PencilIcon,

} from "@heroicons/react/24/outline";
import { useGetProducts } from "../../hooks/useGetProducts";

const ProductTable = ({ onEdit, onDelete }) => {

  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlySales, setOnlySales] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const pageSize = 10;


  const { products, totalPages, isFetching } = useGetProducts({
    page,
    pageSize,
    minPrice: minPrice || undefined, 
    maxPrice: maxPrice || undefined,
    onlySales: onlySales || undefined,
  });


  const filteredData = useMemo(() => {
    if (!globalFilter) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [products, globalFilter]);


  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "პროდუქტის დასახელება",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor("price", {
        header: "ფასი",
        cell: (info) => <Typography>{info.getValue()} ₾</Typography>,
      }),
      columnHelper.accessor("salePrice", {
        header: "ფასდაკლებული ფასი",
        cell: (info) =>
          info.getValue() ? (
            <Typography color="green">{info.getValue()} ₾</Typography>
          ) : (
            "-"
          ),
      }),
      columnHelper.accessor("image", {
        header: "სურათი",
        cell: (info) => (
          <div className="flex items-center">
            <img
              src={info.getValue()}
              alt="Product"
              className="w-8 h-8 rounded-md object-cover"
              loading="lazy"
            />
          </div>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "დამატების თარიღი",
        cell: (info) => (
          <Typography>
            {new Date(info.getValue()).toLocaleDateString()}
          </Typography>
        ),
      }),
      columnHelper.display({
        header: "ქმედებები",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Tooltip content="რედაქტირება">
              <IconButton
                variant="text"
                color="blue"
                onClick={() => onEdit(row.original)}
              >
                <PencilIcon className="h-5 w-5" />
              </IconButton>
            </Tooltip>
            <Tooltip content="წაშლა">
              <IconButton
                variant="text"
                color="red"
                onClick={() => onDelete(row.original.id)}
              >
                <TrashIcon className="h-5 w-5" />
              </IconButton>
            </Tooltip>
          </div>
        ),
      }),
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting: [],
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Card className="container mx-auto overflow-x-auto">

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            label="ძებნა"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Input
            type="number"
            label="ფასის მინიმალური"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            label="ფასის მაქსიმალური"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlySales}
              onChange={(e) => setOnlySales(e.target.checked)}
            />
            <label className="text-gray-700">ფასდაკლებული</label>
          </div>
        </div>
      </div>

 
      <CardBody className="p-0">
        {isFetching ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600"
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : header.column.columnDef.header}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border-b border-gray-200">
                      {cell.column.columnDef.cell(cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardBody>


      <CardFooter className="flex items-center justify-between p-4">
        <Typography variant="small" color="gray">
          სულ: {filteredData.length}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
            {"<"}
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage}>
            {">"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductTable;
