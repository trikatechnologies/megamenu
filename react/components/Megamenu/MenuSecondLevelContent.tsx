import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'
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

type MenuContentProps = {
  currentMenu: MegaMenuItem
  currentSubMenu?: MegaMenuItem
  selectedMenus: any
}

const MenuSecondLevelContent: FC<MenuContentProps> = (
  props: MenuContentProps
) => {
  const { currentMenu, currentSubMenu, selectedMenus } = props
  const subMenu = currentSubMenu ?? currentMenu

  return (
    <>
      {subMenu && (
        <div className={`w-100 pa3`}>
          <div
            className={`flex self-start flex-wrap w-100`}
          >
            {subMenu.secondLevel &&
              subMenu.secondLevel.length > 0 &&
              subMenu.secondLevel.map((subsubCat: MegaMenuItem) => (
                <div className={`${subsubCat.__editorItemTitle} pr5 pb5`}
                  onClick={(e) => {
                    e.stopPropagation()
                    const nav = {firstLevel: `${subMenu.__editorItemTitle}`, secondLevel: `${subsubCat.__editorItemTitle}`}
                    sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                  }}
                >
                  <Link
                    to={subsubCat.href}
                    className={`${styles.secondLevelLink} no-underline ${selectedMenus?.firstLevel === subMenu.__editorItemTitle && selectedMenus?.secondLevel === subsubCat.__editorItemTitle
                      ? `${styles.secondLevelLinkActive}`
                      : ''}`}
                  >
                    {subsubCat.__editorItemTitle}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuSecondLevelContent
