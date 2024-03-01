import React from 'react'
import './clientAdmin.css'

const ClientAdmin = () => {
  return (
    <>
      <div className='equipment-table-header'>
        <span>Clients</span>
        <button className='comic-button'>
          Create
        </button>
      </div>
      <div className='equipment-table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Cin</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AD999999</td>
              <td>chiguer</td>
              <td>adib</td>
              <td>chigueradib9@gmail.com</td>
            </tr>
            <tr>
              <td>AD999999</td>
              <td>chiguer</td>
              <td>adib</td>
              <td>chigueradib9@gmail.com</td>
            </tr>
            <tr>
              <td>AD999999</td>
              <td>chiguer</td>
              <td>adib</td>
              <td>chigueradib9@gmail.com</td>
            </tr>
            <tr>
              <td>AD999999</td>
              <td>chiguer</td>
              <td>adib</td>
              <td>chigueradib9@gmail.com</td>
            </tr>
            <tr>
              <td>AD999999</td>
              <td>chiguer</td>
              <td>adib</td>
              <td>chigueradib9@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ClientAdmin