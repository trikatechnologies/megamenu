import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

//import RightArrow from './RightArrow'

import styles from './styles.css'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  promotional: Promotional
  thirdLevel: MegaMenuItem[]
  styles: string
}
type Promotional = {
  promoImage: string
  promoImageAltText: string
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
        <div className={`${styles.secondLevelListWrapper} w-100 overflow-y-auto`} style={{ maxHeight: '60vh' }}>
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
                    const nav = { firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}` }
                    setSelectedHoverMenus(nav)
                  }}
                >
                  <Link to={subMenu.href} className={`${styles.secondMenuItems} category no-underline db black`}>
                    {subMenu.__editorItemTitle}
                  </Link>

                  {subMenu.thirdLevel.map((subsubCat: MegaMenuItem,index: number) =>(
                    <div className={`${subsubCat.__editorItemTitle} pb2 ${styles.thirdMenuItems} ${selectedMenus?.firstLevel === currentMenu.__editorItemTitle && selectedMenus?.secondLevel === subMenu.__editorItemTitle && selectedMenus?.thirdLevel === subsubCat.__editorItemTitle
                      ? styles.thirdLevelActive
                      : ''}`}
                      onClick={() => {
                        const nav = { firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`, thirdLevel: `${subsubCat.__editorItemTitle}` }
                        sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                      }}
                      onMouseOver={() => {
                        const nav = { firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`, thirdLevel: `${subsubCat.__editorItemTitle}` }
                        setSelectedHoverMenus(nav)
                      }}
                      >
                      <Link
                        to={subsubCat.href}
                        className={`${
                          subsubCat.styles === 'styleSecondLevel'
                            ? `${styles.secondMenuItems} category no-underline db black`
                            : `${styles.thirdLevelLink} t-semiBoldFont db no-underline ${
                                selectedMenus?.thirdLevel === subsubCat.__editorItemTitle ? `${styles.active}` : ''
                              }`
                        } ${index === 0 && subsubCat.styles === 'styleSecondLevel' ? 'pt2' : ''}`}
                      >
                        {subsubCat.__editorItemTitle}
                      </Link>
                      </div>

                  ))


                  }


                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuList
