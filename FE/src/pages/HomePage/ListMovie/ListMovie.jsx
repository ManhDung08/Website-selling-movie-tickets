import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ListMovieDesktop from './ListMovieDesktop'
import ListMovieTablet from "./ListMovieTablet"
import ListMovieMobile from "./ListMovieMobile"
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export default function ListMovie() {
  return (
    <div>
        <Desktop>
            <ListMovieDesktop/>
        </Desktop>
        <Mobile>
            <ListMovieMobile/>
        </Mobile>
        <Tablet>
          <ListMovieTablet/>
        </Tablet>
    </div>
  )
}
