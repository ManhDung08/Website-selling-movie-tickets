import React, { useEffect } from 'react'
import ListMovie from './ListMovie/ListMovie'
import { movieService } from '../../service/service'
import TabMovie from "./TabMovie/TabMovie"
export default function HomePage() {
  useEffect(()=>{
movieService.getMovieByTheater()
.then((res)=>{
  console.log(res)
})
.catch ((err)=>{
  console.log(err)
})
  },[])
  return (
    <div>
      <ListMovie/>
      <TabMovie/>
    </div>
  )
}
