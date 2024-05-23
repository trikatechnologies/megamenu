import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'
import styles from './styles.css'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  styles:string
  secondLevel: MegaMenuItem[]
  promotional: Promotional
  thirdLevel: MegaMenuItem[]

}
type Promotional = {
  promoImage: string
  promoImageAltText: string
  promoLink: string
}

type MenuContentProps = {
  currentMenu: MegaMenuItem
  currentSubMenu?: MegaMenuItem
  selectedMenus: any
  setSelectedHoverMenus: any
}

const MenuContent: FC<MenuContentProps> = (props: MenuContentProps) => {
  const { currentMenu} = props
  //const selectedItem = currentMenu.secondLevel.filter((item) => item.__editorItemTitle === selectedMenus?.secondLevel)
  const subMenu = currentMenu //currentSubMenu ?? selectedItem[0] ?? currentMenu.secondLevel?.[0]

  return (
    <>
      {subMenu && (
        <div className={`flex w-100`} style={{ maxHeight: '15vh', maxWidth: '96rem', margin: 'auto' }}>
          <div className={`flex-auto dn flex`}>
            {subMenu.promotional && subMenu.promotional.promoImage && (
              <div className={`w-100`}>
                    <Link
                      to={subMenu.promotional.promoLink}
                    >
                      <img
                      src={subMenu.promotional.promoImage}
                      alt={subMenu.promotional.promoImageAltText}
                      className={`${styles.image}`}
                      />
                    </Link>
              </div>
            )}
          </div>
        </div >
      )}
    </>
  )
}

export default MenuContent
