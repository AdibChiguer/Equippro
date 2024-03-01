import React, {useState} from 'react'
import './equipments.css'
import DATA from './data'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button} from "@chakra-ui/react";
import Filters from './Filters';

const columns = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "creationdate",
    header: "Creation date",
    cell: (props) => <p>{props.getValue()}</p>
  },
];


const Equipments = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });


  return (
    <>
      <div className='equipment-table-header'>
        <span>Equipments</span>
        <Filters 
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <button className='comic-button'>Create</button>
      </div>
      <div className='equipment-table-container'>
        <table className='table'>
        <thead>
            <tr>
              {table.getHeaderGroups().map((headerGroup) => {
                return headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.column.columnDef.header}
                    </th>
                  );
                });
              })}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-div'>
        <button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >{"<"}</button>
        <div className='pagination-info'>
          <p>page:</p>
          {table.getState().pagination.pageIndex}
          {table.getPageCount()}
        </div>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >{">"}</Button>
      </div>
    </>
  )
}

export default Equipments