import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
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
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useEditProduct } from "../../hooks/useEditProduct";
import ProductForm from "./ProductForm";

const ProductTable = ({ onEdit, onDelete }) => {
  const [page, setPage] = useState(1);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlySales, setOnlySales] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    onlySales: false,
    globalFilter: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();
  const { isEditing } = useEditProduct();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
    setOpenDialog(false);
  };

  const handleEditOpen = (product) => {
    setEditingProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
    setEditDialogOpen(false);
  };

  const handleDeleteConfirmed = () => {
    if (selectedProductId) {
      deleteProduct({ id: selectedProductId, accessToken });
    }
    handleCloseDialog();
  };

  const pageSize = 10;

  const { products, totalPages, isFetching } = useGetProducts({
    page,
    pageSize,
    minPrice: appliedFilters.minPrice || undefined,
    maxPrice: appliedFilters.maxPrice || undefined,
    onlySales: appliedFilters.onlySales || undefined,
  });

  const filteredData = useMemo(() => {
    if (!appliedFilters.globalFilter) return products;
    return products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(appliedFilters.globalFilter.toLowerCase())
    );
  }, [products, appliedFilters]);

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
        header: "ფასდაკლებით",
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
                onClick={() => handleEditOpen(row.original)}
                disabled={isEditing || isDeletingProduct}
              >
                <PencilIcon className="h-5 w-5" />
              </IconButton>
            </Tooltip>
            <Tooltip content="წაშლა">
              <IconButton
                variant="text"
                color="red"
                onClick={() => handleOpenDialog(row.original.id)}
                disabled={isDeletingProduct || isEditing}
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

  const handleApplyFilters = () => {
    setAppliedFilters({
      minPrice,
      maxPrice,
      onlySales,
      globalFilter,
    });
    setPage(1);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setOnlySales(false);
    setGlobalFilter("");
    setAppliedFilters({
      minPrice: "",
      maxPrice: "",
      onlySales: false,
      globalFilter: "",
    });
  };

  const isFilteringApplied = useMemo(() => {
    return (
      appliedFilters.minPrice !== "" ||
      appliedFilters.maxPrice !== "" ||
      appliedFilters.onlySales !== false ||
      appliedFilters.globalFilter !== ""
    );
  }, [appliedFilters]);

  return (
    <>
      <Card className="container mx-auto overflow-x-auto">
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Input
              type="text"
              label="დასახელებით"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Input
              type="number"
              label="მინ. ფასი"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
            <Input
              type="number"
              label="მაქს. ფასი"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Button
              variant="gradient"
              onClick={handleApplyFilters}
              disabled={isFilteringApplied}
            >
              გაფილტრე
            </Button>
            <Button
              variant="outlined"
              color="red"
              onClick={handleClearFilters}
              disabled={!isFilteringApplied}
            >
              ფილტრის გასუფთავება
            </Button>
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
                      <td
                        key={cell.id}
                        className="p-2 border-b border-gray-200"
                      >
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
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>ნამდვილად გინდათ პროდუტქის წაშლა?</DialogHeader>
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
      <Dialog open={editDialogOpen} handler={handleEditClose} className="p-6">
        <ProductForm
          closeDialogOnCancel={handleEditClose}
          editingProductValues={editingProduct}
          onSubmitSuccess={() => {
            handleEditClose();
          }}
        />
      </Dialog>
    </>
  );
};

export default ProductTable;
