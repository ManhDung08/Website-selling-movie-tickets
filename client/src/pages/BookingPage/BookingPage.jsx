import React from 'react'
import { useMediaQuery } from 'react-responsive'
import BookingPageDesktop from './BookingPageDesktop'
import BookingPageTablet from "./BookingPageTablet"
import BookingPageMobile from "./BookingPageMobile"
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

export default function BookingPage() {
  return (
    <div>
        <Desktop>
            <BookingPageDesktop/>
        </Desktop>
        <Mobile>
            <BookingPageMobile/>
        </Mobile>
        <Tablet>
          <BookingPageTablet/>
        </Tablet>
    </div>
  )
}
