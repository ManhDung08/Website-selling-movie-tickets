import React from 'react'
import { useMediaQuery } from 'react-responsive'
import TabMovieDesktop from "./TabMovieDesktop"
import TabMovieMobile from "./TabMovieMobile"
import TabMovieTablet from "./TabMovieTablet"
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

export default function TabMovie() {
  return (
    <div>
        <Desktop>
            <TabMovieDesktop/>
        </Desktop>
        <Mobile>
            <TabMovieMobile/>
        </Mobile>
        <Tablet>
          <TabMovieTablet/>
        </Tablet>
    </div>
  )
}
