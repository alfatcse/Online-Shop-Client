import React, { useEffect, useState } from 'react';

const useUserType = (email) => {
    const [userType,setUserType]=useState(false);
    const [isUserLoading,setIsUserLoading]=useState(true);
    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5009/usertype?email=${email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('type',data.userType);
                setUserType(data.userType);
                setIsUserLoading(false);
            })
        }
    },[email])
    return [userType,isUserLoading];
};

export default useUserType;