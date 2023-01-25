import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { BsFillLaptopFill } from "react-icons/bs";
import { GiPanzerfaust } from "react-icons/gi";
import { AiTwotoneSetting } from "react-icons/ai";
import { TbRotateClockwise2 } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiExport } from "react-icons/bi";
import Pdf from "react-to-pdf";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { Link } from 'react-router-dom';
import './AllUsersTable.css'
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';
import Swal from 'sweetalert2';

const AllUsersTable = ({ nextRef, options }) => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [hideUser, setHideUser] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);
  const [hideRole, setHideRole] = useState(false);
  const [hidePlan, setHidePlan] = useState(false);
  const [hideStatus, setHideStatus] = useState(false);
  const [hideAction, setHideAction] = useState(false);
  const [pending, setPending] = useState(true);



  const handleDelete = (id) => {
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn-success',
        cancelButton: 'btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/${id}`)
          .then(res => {
            console.log(res.data);
            if (res?.data?.data?.acknowledged) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
              setReload(!reload);
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Seller is safe :)',
          'error'
        )
      }
    })
  }



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/all-users`)
      .then(res => {
        if (res?.data?.success) {
          setUsers(res?.data?.data)
          setPending(false);
        }
      })
  }, [reload])



  const columns = [
    {
      name: "USER",
      selector: (row) => (
        <div className="user-div">
          <img
            width={34}
            height={34}
            className="user-img"
            src={row.image}
            alt=""
          />{" "}
          <div>
            <p className="user-name">{row.name}</p>
            <h1 className="username">@{row.username}</h1>
          </div>
        </div>
      ),
      omit: hideUser,
    },
    {
      name: "EMAIL",
      selector: (row) => <h1 className="user-email">{row.email}</h1>,
      omit: hideEmail,
    },
    {
      name: "ROLE",
      selector: (row) => (
        <div className="user-role-div">
          {row.role === "Admin" && (
            <BsFillLaptopFill className="table-icons admin-icon" />
          )}
          {row.role === "Author" && (
            <AiTwotoneSetting className="table-icons author-icon" />
          )}
          {row.role === "Editor" && <GiPanzerfaust className="table-icons editor-icon" />}
          {row.role === "Maintainer" && (
            <TbRotateClockwise2 className="table-icons maintainer-icon" />
          )}
          {row.role === "Subscriber" && <RxAvatar className="table-icons subscriber-icon" />}

          <h1 className='role'>{row.role}</h1>
        </div>
      ),
      omit: hideRole,
    },
    {
      name: "PLAN",
      selector: (row) => <h1 className="plan">{row.plan}</h1>,
      omit: hidePlan,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <h1
          className={`status ${row.status === "Pending" && "status-pending "
            } ${row.status === "Active" && "status-active status"} ${row.status === "Inactive" && " status-inactive status"}
            }`}
        >
          {row.status}
        </h1>
      ),
      omit: hideStatus,
    },
    {
      name: "ACTION",

      cell: (row, i) => (
        <div className="dropdown-checkbox print:hidden ">
          <label tabIndex={0}>
            <HiOutlineDotsVertical />
          </label>
          <ul
            tabIndex={0}
            className="action-list-container"
          >
            <li className="action-checkbox-list">
              <Link to={`edit/${row._id}`}>Edit</Link>
            </li>
            <li className="action-checkbox-list">
              <button onClick={() => handleDelete(row._id)}>Delete</button>
            </li>
          </ul>
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: "56px",
      omit: hideAction,
    },
  ];


  return (
    <div className='all-users-container'>
      <div className='header-menus'>
        <div className='action-container'>
          <div>
            <Pdf
              targetRef={nextRef}
              filename="Users.pdf"
              options={options}
            // x={0.1}
            // y={0.5}
            // scale={0.8}
            >
              {({ toPdf }) => (
                <button
                  className="pdf-button"
                  onClick={toPdf}
                >
                  <BiExport className="text-xl" />
                  PDF
                </button>
              )}
            </Pdf>
          </div>

          <ReactHtmlTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="AllUser"
            sheet="tablexls"
            buttonText={
              <button className="pdf-button">
                <BiExport className="text-xl" />
                EXCEL
              </button>
            }
          />

          <button
            onClick={() => {
              window.print();
            }}
            className="pdf-button"
          >
            <BiExport className="text-xl" />
            PRINT
          </button>

          <div className="dropdown-checkbox">
            <label
              tabIndex={0} className="show-hide-button">
              SHOW/HIDE COLUMN
            </label>
            <ul className='dropdown-checkbox-list-container' >
              <li className='dropdown-checkbox-list'>
                <label> USER
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hideUser}
                    onChange={() => setHideUser(!hideUser)}
                  />
                </label>
              </li>
              <li className='dropdown-checkbox-list'>
                <label> EMAIL
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hideEmail}
                    onChange={() => setHideEmail(!hideEmail)}
                  />
                </label>
              </li>
              <li className='dropdown-checkbox-list'>
                <label>
                  ROLE
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hideRole}
                    onChange={() => setHideRole(!hideRole)}
                  /></label>
              </li>
              <li className='dropdown-checkbox-list'>
                <label>
                  PLAN
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hidePlan}
                    onChange={() => setHidePlan(!hidePlan)}
                  /></label>
              </li>
              <li className='dropdown-checkbox-list'>
                <label>
                  STATUS
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hideStatus}
                    onChange={() => setHideStatus(!hideUser)}
                  /></label>
              </li>
              <li className='dropdown-checkbox-list'>
                <label>
                  ACTION
                  <input type="checkbox" name="type" className='dropdown-checkbox-input'
                    checked={!hideAction}
                    onChange={() => setHideAction(!hideAction)}
                  /></label>
              </li>
            </ul>
          </div>
        </div>

        <div className='right-side'>
          <div>
            <input type="text" className="search-user" name="username" placeholder="Search" required />
          </div>

          <button className='add-button'>
            Add User
          </button>
        </div>
      </div>

      <div ref={nextRef}>
        <div className='creator-container'>
          <h1> My Name is {user?.displayName}</h1>
          <h3>I created this table</h3>
        </div>
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="800px"
          progressPending={pending}
        />
      </div>

    </div>
  );
};

export default AllUsersTable;