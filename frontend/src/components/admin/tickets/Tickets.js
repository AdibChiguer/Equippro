import React, {useState , useEffect} from 'react'
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const columns = [
  {
    accessorKey: "ticketId",
    header: "Id",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "equipmentReference",
    header: "Equipment Reference",
    cell: (props) => (
      <Link to={`/admin/equipment-details/${props.getValue()}`}>
        {props.getValue()}
      </Link>
    )
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: (props) => {
      if (props.getValue() === 'Not assigned') {
        return <p>{props.getValue()}</p>
      } else {
        return <Link to={`/admin/client-details/${props.getValue()}`}>
          {props.getValue()}
        </Link>
      }
    }
  },
  {
    accessorKey: "technician",
    header: "Technician",
    cell: (props) => {
      if (props.getValue() === 'Not assigned') {
        return <p>{props.getValue()}</p>
      } else {
        return <Link to={`/admin/technician-details/${props.getValue()}`}>
          {props.getValue()}
        </Link>
      }
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props.getValue()}</p>
  },
];

const Tickets = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTickets()
  }, []);

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

  function getAllTickets() {
    axios.get('http://localhost:8080/tickets/all' , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        const formattedData = res.data.map(ticket => ({
          ticketId: ticket.id,
          equipmentReference: ticket.equipment.ref,
          owner: ticket.equipment.owner ? ticket.equipment.owner.cin : 'Not assigned',
          technician: ticket.technician ? ticket.technician.cin : 'Not assigned',
          status: ticket.status,
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

  return (
    <div className='equipment-content-container'>
      <div className='equipment-table-header'>
        <span>Tickets</span>
        <Filters 
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <button className='comic-button' onClick={() => navigate('/admin/create-ticket')}>
          Create
        </button>
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
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
                <td>
                  <button className='comic-button' onClick={() => navigate(`/admin/ticket-details/${row.original.ticketId}`)}>Details</button>
                </td>
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

export default Tickets