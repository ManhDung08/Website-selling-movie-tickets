import React from 'react'
import { useMediaQuery } from 'react-responsive'
import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'
import FooterTablet from './FooterTablet'

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

export default function Footer() {
  return (
    <div>
        <Desktop>
            <FooterDesktop/>
        </Desktop>
        <Mobile>
            <FooterMobile/>
        </Mobile>
        <Tablet>
          <FooterTablet/>
        </Tablet>
    </div>
  )
}
