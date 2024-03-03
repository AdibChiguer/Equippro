import React, {useEffect, useState} from 'react'
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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Filters from './Filters';
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import Swal from 'sweetalert2'

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
  const [equipmentInfo, setEquipmentInfo] = useState({})
  const [columnFilters, setColumnFilters] = useState([]);
  
  useEffect(()=> {
    getAllEquipments();
  }, [data])

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
  
  function getAllEquipments(){
    axios.get('http://localhost:8080/equipments/all')
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

  function getEquipment(ref){
    return axios.get(`http://localhost:8080/equipments/equipment/${ref}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong. try again',
        })
      })
  }

  async function showEquipmentInfo(equipmentRef){
    console.log('////equipment');
    const data = await getEquipment(equipmentRef);
    console.log(data);
    console.log('equipment/////');

  }

  return (
    <div className='equipment-content-container'>
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
              <tr key={row.original.reference} onClick={() => showEquipmentInfo(row.original.reference)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-div'>
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        ><NavigateBeforeIcon/></Button>
        <div className='pagination-info'>
          <span>{table.getState().pagination.pageIndex + 1}</span>
          <span>/</span>
          <span>{table.getPageCount()}</span>
        </div>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        ><NavigateNextIcon/></Button>
      </div>
    </div>
  )
}

export default Equipments