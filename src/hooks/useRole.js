import { useEffect, useState } from 'react';
import axios from 'axios';

const useRole = (email) => {

  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${email}`)
      .then(res => {
        // console.log(res.data);
        setRole(res?.data?.role);
        setIsRoleLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  }, [email])

  return [role, isRoleLoading]
};

export default useRole;