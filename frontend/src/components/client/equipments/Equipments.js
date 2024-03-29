import React, { useEffect, useState } from 'react';
import './equipments.css';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Filters from './Filters';
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useJwt } from 'react-jwt';

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
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if(decodedToken){
      getAllEquipments();
    }
  }, [decodedToken]);

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
  });

  function getAllEquipments() {
    axios.get(`http://localhost:8080/equipments/owned/${decodedToken.sub}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        const formattedData = res.data.map(equipment => ({
          reference: equipment.ref,
          type: equipment.type,
          available: equipment.available.toString(),
          creationdate: formatDate(equipment.creationDate),
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong. try again',
        })
      })
  }

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className='equipment-content-container'>
      <div className='equipment-table-header'>
        <span>Equipments</span>
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <div className='equipment-table-container'>
        <table className='table'>
          <thead>
            <tr>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} onClick={() => navigate(`/client/equipment-details/${row.original.reference}`)} className="link">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-div'>
        <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}><NavigateBeforeIcon /></Button>
        <div className='pagination-info'>
          <span>{table.getState().pagination.pageIndex + 1}</span>
          <span>/</span>
          <span>{table.getPageCount()}</span>
        </div>
        <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}><NavigateNextIcon /></Button>
      </div>
    </div>
  );
}

export default Equipments;