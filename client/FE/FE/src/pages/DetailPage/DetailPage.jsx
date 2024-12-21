import React from 'react'
import { useMediaQuery } from 'react-responsive'


import DetailPageDesktop from './DetailPageDesktop'
import DetailPageMobile from './DetailPageMobile'
import DetailPageTablet from './DetailPageTablet'
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

export default function DetailPage() {
  return (
    <div>
        <Desktop>
            <DetailPageDesktop/>
        </Desktop>
        <Mobile>
            <DetailPageMobile/>
        </Mobile>
        <Tablet>
          <DetailPageTablet/>
        </Tablet>
    </div>
  )
}
