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

const MenuContent: FC<MenuContentProps> = (props: MenuContentProps) => {
  const { currentMenu, currentSubMenu, selectedMenus } = props
  const selectedItem = currentMenu.secondLevel.filter((item) => item.__editorItemTitle === selectedMenus?.secondLevel)
  const subMenu = currentSubMenu ?? selectedItem[0] ?? currentMenu.secondLevel?.[0]

  return (
    <>
      {subMenu && (
        <div className={`flex flex-auto w-75 pa3`}>
          <div className={`flex-auto dn flex`}>
            <div
              className={`${styles.thirdMenu} ph5 pb5 ${
                subMenu.promotional.promoImage ? 'w-70' : 'w-100'
              }`}
            >
              <div className={`pb5`}
                onClick={() => {
                  const nav = {firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`}
                  sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                }}
              >
                <Link to={subMenu.href} className={`black ${styles.viewAllSecondLevel}`}>
                  View All {subMenu.__editorItemTitle}
                </Link>
              </div>
              <div
                className={`${styles.thirdMenuWrapper}`}>
              {subMenu.thirdLevel &&
                subMenu.thirdLevel.length > 0 &&
                subMenu.thirdLevel.map((subsubCat: MegaMenuItem) => (
                  <div className={`${subsubCat.__editorItemTitle} pb3 ${styles.thirdMenuItems} ${selectedMenus?.firstLevel === currentMenu.__editorItemTitle && selectedMenus?.secondLevel === subMenu.__editorItemTitle && selectedMenus?.thirdLevel === subsubCat.__editorItemTitle
                    ? styles.thirdLevelActive
                    : ''}`}
                    onClick={() => {
                      const nav = {firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`, thirdLevel: `${subsubCat.__editorItemTitle}`}
                      sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                    }}
                  >
                    <Link
                      to={subsubCat.href}
                      className={`${styles.thirdLevelLink} t-semiBoldFont db no-underline pb2 ${selectedMenus?.thirdLevel === subsubCat.__editorItemTitle
                        ? `${styles.active}`
                        : ''}`}
                    >
                      {subsubCat.__editorItemTitle}
                    </Link>
                    <div className={`${styles.fourthMenu}`}>
                      {subsubCat.fourthLevel &&
                        subsubCat.fourthLevel.length > 0 &&
                        subsubCat.fourthLevel.map(
                          (subsubsubCat: MegaMenuItem) => (
                            <div className={`${subsubCat.__editorItemTitle} ${styles.fourthMenuItems} ${selectedMenus?.firstLevel === currentMenu.__editorItemTitle && selectedMenus?.secondLevel === subMenu.__editorItemTitle && selectedMenus?.thirdLevel === subsubCat.__editorItemTitle && selectedMenus?.fourthLevel === subsubsubCat.__editorItemTitle
                              ? styles.fourthLevelActive
                              : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                const nav = {firstLevel: `${currentMenu.__editorItemTitle}`, secondLevel: `${subMenu.__editorItemTitle}`, thirdLevel: `${subsubCat.__editorItemTitle}`, fourthLevel: `${subsubsubCat.__editorItemTitle}`}
                                sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                              }}
                            >
                              <Link
                                to={subsubsubCat.href}
                                className={`${styles.fourthLevelLink} no-underline pt2 db ${selectedMenus?.fourthLevel === subsubsubCat.__editorItemTitle
                                  ? `${styles.active}`
                                  : 'black'}`}
                              >
                                {subsubsubCat.__editorItemTitle}
                              </Link>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {subMenu.promotional.promoImage && (
              <div className={`w-30`}>
                <div className={`${styles.promotional} flex-auto pb5`}>
                  <img
                    src={subMenu.promotional.promoImage}
                    alt={subMenu.promotional.promoImageAltText}
                    className={`${styles.image}`}
                  />
                  <h2 className={`${styles.title} t-semiBoldFont f7 blackShade pr2 ma0`}>
                    {subMenu.promotional.promoTitle}
                  </h2>
                  <div className={`${styles.content} t-lightFont blackShade f8 pv3 pr2`}>
                    {subMenu.promotional.promoContent}
                  </div>
                  <div className={`t-regularFont f8 pv2 pr2`}>
                    <Link
                      className={`${styles.link} blackShade`}
                      to={subMenu.promotional.promoLink}
                    >
                      {subMenu.promotional.promoLinkText}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuContent
