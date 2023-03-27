import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

import RightArrow from './RightArrow'

import styles from './styles.css'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  promotional: Promotional
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}
type Promotional = {
  promoImage: string
  promoImageAltText: string
  promoTitle: string
  promoContent: string
  promoLinkText: string
  promoLink: string
}

type MenuListProps = {
  currentMenu: MegaMenuItem
  currentSubMenu?: MegaMenuItem
  setCurrentSubMenu: React.Dispatch<
    React.SetStateAction<MegaMenuItem | undefined>
  >
  selectedMenus: any
  selectedHoverMenus: any
  setSelectedHoverMenus: any
}

const MenuList: FC<MenuListProps> = (props: MenuListProps) => {
  const { currentMenu, setCurrentSubMenu, selectedMenus, selectedHoverMenus, setSelectedHoverMenus } = props

  return (
    <>
      {currentMenu?.secondLevel && currentMenu?.secondLevel.length > 0 && (
        <div className={`${styles.secondLevelListWrapper} w-25 overflow-y-auto`} style={{ maxHeight: '60vh' }}>
          <div className={`ph3 ${styles.secondLevelList}`}>
            {currentMenu.secondLevel.map(
              (subMenu: MegaMenuItem) => (
                <div
                  className={`${styles.secondMenu} relative subCategory pv3 ph3 pr5
                  ${selectedMenus?.firstLevel === currentMenu.__editorItemTitle && selectedMenus?.secondLevel === subMenu.__editorItemTitle
                    ? styles.secondLevelActive
                    : ''}
                  ${selectedHoverMenus?.firstLevel === currentMenu.__editorItemTitle && selectedHoverMenus?.secondLevel === subMenu.__editorItemTitle
                    ? styles.secondLevelActive
                    : ''}`
                  }
                  onMouseOver={() => {
                    setCurrentSubMenu(subMenu)
                    const nav = {firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`}
                    setSelectedHoverMenus(nav)
                  }}
                >
                  <Link to={subMenu.href} className={`${styles.secondMenuItems} category no-underline db black`}>
                    {subMenu.__editorItemTitle}
                  </Link>
                  <span
                    className={`${styles.secondMenuIcon} flex items-center absolute top-0 bottom-0 right-0`}
                  >
                    <RightArrow />
                  </span>
                </div>
              )
            )}
            {/* <div className={`pv3 ph5 mt5`}
              onClick={() => {
                const nav = {firstLevel: `${currentMenu.__editorItemTitle}`}
                sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
              }}
            >
              <Link to={currentMenu.href} className={`black ${styles.viewAllFirstLevel}`}>
                View All {currentMenu.__editorItemTitle}
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuList
