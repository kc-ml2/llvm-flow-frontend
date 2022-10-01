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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import styles from './NavBar.module.scss'
import buttons from '@/styles/Button.module.scss'
import classNames from 'classnames/bind'
import { useAppSelector } from '@/redux/hook'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const cx = classNames.bind(styles)
  const { isLogin } = useAppSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const toggle = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

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
            <button className={buttons.nav}>
              <a
                href="https://github.com/kc-ml2/llvm-flow"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </button>
          </NavItem>
          <NavItem className={styles.items}>
            <NavLink to="/example">
              <button className={buttons.nav}>Example</button>
            </NavLink>
          </NavItem>
          <NavItem className={styles.items}>
            <button className={buttons.nav}>Docs</button>
          </NavItem>
          <NavItem className={styles.items}>
            <Dropdown isOpen={isOpenDropdown} toggle={toggle}>
              <DropdownToggle caret color="white" className={styles.dropdown}>
                Start
              </DropdownToggle>
              <DropdownMenu>
                <NavLink to="/uploadC">
                  <button className={buttons.nav}>
                    with <b>.c</b> file
                  </button>
                </NavLink>
                <NavLink to="/uploadCPP">
                  <button className={buttons.nav}>
                    with <b>.cpp</b> file
                  </button>
                </NavLink>
                <NavLink to="/uploadLL">
                  <button className={buttons.nav}>
                    with <b>.ll</b> file
                  </button>
                </NavLink>
              </DropdownMenu>
            </Dropdown>
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
