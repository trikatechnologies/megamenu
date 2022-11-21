import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

import PlusIcon from './PlusIcon'
import MinusIcon from './MinusIcon'

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
      <Link to={currentMenu.href} className={`f8 black no-underline`}>
        {currentMenu.__editorItemTitle}
      </Link>
      {hasChildren && (
        <span className={`flex items-center absolute top-0 bottom-0 right-0`}>
          {toggleMenu !== currentMenu.__editorItemTitle && <PlusIcon />}
          {toggleMenu === currentMenu.__editorItemTitle && <MinusIcon />}
        </span>
      )}
    </>
  )
}

export default MenuListMobile
