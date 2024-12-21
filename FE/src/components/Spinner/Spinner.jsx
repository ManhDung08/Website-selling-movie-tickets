import React from 'react'
import { useSelector } from 'react-redux';
import { FadeLoader} from "react-spinners";
export default function Spinner() {
  let {isLoading} = useSelector((state)=> state.spinnerReducer);
  return isLoading ? (
    <div className='h-screen w-screen bg-white fixed z-10 flex justify-center items-center'>
        <FadeLoader
        size={200}
        speedMultiplier={2}
        color="#EF4444" />
       
    </div>
  ) :( <></>)
}
