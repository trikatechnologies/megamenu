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
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}

type MenuListProps = {
  currentMenu: MegaMenuItem
  hasChildren: boolean
  toggleMenu?: string
}

const MenuListMobile: FC<MenuListProps> = (props: MenuListProps) => {
  const { currentMenu, hasChildren, toggleMenu } = props

  return (
    <>
      <Link to={currentMenu.href} className={`${styles.megamenuLinksMobile} f8 no-underline`}>
        {currentMenu.__editorItemTitle}
      </Link>
      {hasChildren && (
        <span className={`${styles.secondMenuIcon} flex items-center absolute top-0 bottom-0 right-0`}>
          {toggleMenu !== currentMenu.__editorItemTitle && <RightArrow />}
        </span>
      )}
    </>
  )
}

export default MenuListMobile
