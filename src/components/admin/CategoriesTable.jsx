import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { TrashIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

import { useDeleteCategory } from "../../hooks/useDeleteCategory";

const CategoriesTable = ({ data = [] }) => {
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const { deleteCategory, isDeletingCategory } = useDeleteCategory();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategoryId(null);
    setOpenDialog(false);
  };

  const handleDeleteConfirmed = () => {
    if (selectedCategoryId) {
      deleteCategory({ id: selectedCategoryId, accessToken });
    }
    console.log(selectedCategoryId);
    handleCloseDialog();
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "კატეგორია",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor("image", {
        header: "სურათი",
        cell: (info) => (
          <div className="flex items-center">
            <img
              src={info.getValue()}
              alt="Category"
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
        header: "წაშლა",
        cell: ({ row }) => (
          <Tooltip content="Delete">
            <IconButton
              variant="text"
              color="red"
              onClick={() => handleOpenDialog(row.original.id)}
              disabled={isDeletingCategory}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        ),
      }),
    ],
    [isDeletingCategory]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card className="container mx-auto overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-2 gap-4 overflow-x-auto">
          <Typography variant="h5" color="blue-gray">
            კატეგორიები
          </Typography>
          <Input
            label="მოძებნე კატეგორია"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-64"
          />
        </div>
        <CardBody className="p-0">
          <table className="min-w-full table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600"
                    >
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : header.column.columnDef.header}
                        {header.column.getIsSorted() && (
                          <ChevronUpDownIcon
                            className={`h-4 w-4 ml-2 ${
                              header.column.getIsSorted() === "asc"
                                ? "rotate-0"
                                : "rotate-180"
                            }`}
                          />
                        )}
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
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4">
          <Typography variant="small" color="gray">
            სულ: {data.length}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              {"<"}
            </Button>
            <Button variant="outlined" size="sm">
              {">"}
            </Button>
          </div>
        </CardFooter>
      </Card>

     
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>ნამდვილად გინდათ კატეგორიის წაშლა?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            <span>გაუქმება</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleDeleteConfirmed}
          >
            <span>დადასტურება</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CategoriesTable;
