import React from 'react'
import RightArrow from './RightArrow'
import styles from './styles.css'

type Props = {
  toggleMenu: any
  setToggleMenu: any
}
const Goback = ({setToggleMenu, toggleMenu}: Props) => {
  return (

    <div className={`${styles.goBack} ma3 pv2 relative ${toggleMenu.menu !== '' ? styles.show : styles.hide}`} onClick={() => {
      toggleMenu.menuItem2 !== '' ? setToggleMenu((prevState: any) => ({
        ...prevState,
        menuItem2: '',
      }))
        : (toggleMenu.menuItem1 !== '' ? setToggleMenu((prevState: any) => ({
        ...prevState,
        menuItem1: '',
      }))
        : toggleMenu.menu !== '' ? setToggleMenu((prevState: any) => ({
        ...prevState,
        menu: '',
      }))
        : '')
      }}
    >
      <span
        className={`${styles.secondMenuIcon} flex items-center absolute top-0 bottom-0 left-0 rotate-180`}
      >
        <RightArrow />
      </span> <span className={`ml5`}> Go Back</span>
    </div>
  )
}

export default Goback
