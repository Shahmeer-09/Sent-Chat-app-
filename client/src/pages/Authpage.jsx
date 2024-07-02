import React, { useMemo,useEffect, useState } from "react";
import switchScreen from "../Atoms/authswitchatom";
import Login from "../components/Login";
import Register from "../components/Register";

import { useRecoilValue } from "recoil";
import {useNavigate } from "react-router-dom";
import UserAtom from "../Atoms/UserAtom";

const Authpage = () => {

  const navigate = useNavigate()
  const switchvalue = useRecoilValue(switchScreen);
  const [local,setlocal] = useState('')
  // const current = useRecoilValue(UserAtom);
   
 useEffect(()=>{
      const value = sessionStorage.getItem('user')
      setlocal(JSON.parse(value))
      if(local){
        navigate('/')
      }
 },[])    


  return (
    <div className="flex bg-authpage bg-center  bg-cover bg-no-repeat  justify-center items-center h-screen text-white bg-gray-950   ">
      {switchvalue ? <Login /> : <Register />}
    </div>
  )
  
};

export default Authpage;
