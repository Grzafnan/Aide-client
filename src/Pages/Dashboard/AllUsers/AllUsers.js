import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllUsersTable from './AllUsersTable';

const nextRef = React.createRef();
const checkRef = React.createRef();

const options = {
  orientation: "landscape",
  unit: 'in',
  format: [12, 6]
};

const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/all-users`)
      .then(res => {
        if (res?.data?.success) {
          setUsers(res?.data?.data)
        }
      })
  }, [])


  return (
    <section ref={nextRef} className='section'>
      <div>
        <h1 className='user-title'>All Users</h1>
      </div>
      {
        users?.length > 0 ? <AllUsersTable
          nextRef={nextRef}
          options={options} /> : (
          <div>
            <h3>No User Found!</h3>
          </div>
        )
      }
    </section>
  );
};

export default AllUsers;