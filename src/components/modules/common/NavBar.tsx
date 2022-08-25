/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '@/images/ML2_logo.png'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap'
import styles from './NavBar.module.scss'
import buttons from '@/Button.module.scss'
import classNames from 'classnames/bind'
import { useAppSelector } from '@/redux/hook'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const cx = classNames.bind(styles)
  const { isLogin } = useAppSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Navbar expand="md" className={cx('NavBar', 'fixedTop')}>
      <NavbarBrand href="/" className={styles.logo}>
        <img src={logo} alt="logo" height="28" width="98.64"></img>
      </NavbarBrand>
      <NavbarToggler
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className={styles.toggler}
      >
        <span></span>
        <span></span>
        <span></span>
      </NavbarToggler>
      <Collapse navbar isOpen={isOpen} className={styles.right}>
        <Nav navbar className={styles.nav}>
          <NavItem className={styles.items}>
            <button className={buttons.nav}>Github</button>
          </NavItem>
          <NavItem className={styles.items}>
            <button className={buttons.nav}>Guide</button>
          </NavItem>
          <NavItem className={styles.items}>
            {isLogin ? (
              <NavLink to="/profile">
                <button className={buttons.default}>Profile</button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <button className={buttons.default}>Sign In</button>
              </NavLink>
            )}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavBar
