import React, { Suspense, lazy, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
const AllChats = lazy(() => import("../components/AllChats"));
import ChatCont from "../components/ChatCont";
import CustomFetch from "../utils/CustomFetch";
import UserAtom from "../Atoms/UserAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Spinner } from "@nextui-org/react";
import SpinnerV from "../components/SpinnerV";
// import Selected from "../Atoms/SelectedCh
// export const loader = async () => {
//   try {
//     const user = await CustomFetch.get("/auth/current");
//     return user;
//   } catch (error) {
//     toast.error(error);
//     localStorage.clear();
//     return redirect("/authpage");
//   }
// };
const Main = () => {
  const navigate = useNavigate();
  const[user, setUser] = useRecoilState(UserAtom);


  useEffect(() => {
     const mainpage = ()=>{
      const local = sessionStorage.getItem("user");
    
      if (local) {
        const user = JSON.parse(local);
        setUser(user);
      } else {
        navigate("/authpage");
      }
      console.log("hello")
     }
     mainpage();
  }, []);
  console.log(user)
  return (
    <Suspense fallback={<SpinnerV />}>
      <div className="h-[100vh] w-[100vw] overflow-hidden   grid grid-cols-1 sm:grid-cols-3">
        <Suspense fallback={<Spinner color="default" size="lg" />}>
          <AllChats />
        </Suspense>
        <ChatCont />
      </div>
    </Suspense>
  );
};

export default Main;
