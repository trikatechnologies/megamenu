import React, { useState } from 'react'

import Goback from './Goback'

import MenuListMobile from './MenuListMobile'
import styles from './styles.css'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}

const MegamenuMobile: StorefrontFunctionComponent = ({
  megaMenu,
}: {
  megaMenu: MegaMenuItem[]
}) => {
  const filteredMenu = megaMenu?.filter((menu) => menu.active)
  const [toggleMenu, setToggleMenu] = useState({
    menu: '',
    menuItem1: '',
    menuItem2: '',
  })

  return (
    <>
      <nav className={`${styles.megamenuMobile} flex flex-column items-left w-100 mv5`}>
        <Goback toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        {filteredMenu?.map((menuItem: MegaMenuItem) => (
          <div className={`${styles.menus}`}>
            <div
              className={`relative pv2 ma3 ${toggleMenu.menu !== '' && toggleMenu.menu !== menuItem.__editorItemTitle ? styles.hide : styles.show} ${toggleMenu.menu === menuItem.__editorItemTitle && styles.active}`}
              onClick={() => {
                (toggleMenu.menu !== menuItem.__editorItemTitle && menuItem.secondLevel && menuItem.secondLevel.length > 1)
                  ? setToggleMenu((prevState) => ({
                      ...prevState,
                      menu: menuItem.__editorItemTitle,
                      menuItem1: '',
                      menuItem2: '',
                    }))
                  : null
              }}
            >
              <MenuListMobile
                currentMenu={menuItem}
                hasChildren={menuItem.secondLevel && menuItem.secondLevel.length > 1}
                toggleMenu={toggleMenu.menu}
              />
            </div>
            <div
              className={`${styles.secondLevelMenu} ${
                toggleMenu.menu !== menuItem.__editorItemTitle ? 'dn' : ''
              }`}
            >
              {!!menuItem.secondLevel &&
                menuItem.secondLevel.map((subMenus: MegaMenuItem) => (
                  <>
                    <div
                      className={`relative ma3 pa2 pl3 ${toggleMenu.menuItem1 !== '' && toggleMenu.menuItem1 !== subMenus.__editorItemTitle ? styles.hide : styles.show} ${toggleMenu.menuItem1 === subMenus.__editorItemTitle && styles.active}`}
                      onClick={() => {
                        (toggleMenu.menuItem1 !== subMenus.__editorItemTitle && subMenus.thirdLevel && subMenus.thirdLevel.length > 1)
                          ? setToggleMenu((prevState) => ({
                              ...prevState,
                              menuItem1: subMenus.__editorItemTitle,
                              menuItem2: '',
                            }))
                          : null
                      }}
                    >
                      <MenuListMobile
                        currentMenu={subMenus}
                        hasChildren={subMenus.thirdLevel && subMenus.thirdLevel.length > 1}
                        toggleMenu={toggleMenu.menuItem1}
                      />
                    </div>
                    <div
                      className={`${styles.thirdLevelMenu} ${
                        toggleMenu.menuItem1 !== subMenus.__editorItemTitle ? 'dn' : ''
                      }`}
                    >
                      {(subMenus.thirdLevel && subMenus.thirdLevel.length > 1) &&
                        subMenus.thirdLevel.map(
                          (subItems: MegaMenuItem) => (
                            <>
                              <div
                                className={`relative ma3 pa2 pl5 ${toggleMenu.menuItem2 !== '' && toggleMenu.menuItem2 !== subItems.__editorItemTitle ? styles.hide : styles.show} ${toggleMenu.menuItem2 === subItems.__editorItemTitle && styles.active}`}
                                onClick={() => {
                                  (toggleMenu.menuItem2 !== subItems.__editorItemTitle && subMenus.fourthLevel && subMenus.fourthLevel.length > 1)
                                    ? setToggleMenu((prevState) => ({
                                        ...prevState,
                                        menuItem2: subItems.__editorItemTitle,
                                      }))
                                    : null
                                }}
                              >
                                <MenuListMobile
                                  currentMenu={subItems}
                                  hasChildren={false}
                                  toggleMenu={toggleMenu.menuItem2}
                                />
                              </div>
                            </>
                          )
                        )}
                    </div>
                  </>
                ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  )
}

MegamenuMobile.schema = {
  title: 'admin/editor.Megamenu.title',
  description: 'admin/editor.Megamenu.desc',
  type: 'object',
  properties: {
    megaMenu: {
      type: 'array',
      title: 'admin/editor.Megamenu.firstLevel',
      items: {
        properties: {
          active: {
            type: 'boolean',
            default: true,
            title: 'Active',
          },
          __editorItemTitle: {
            title: 'admin/editor.Megamenu.displayName',
            type: 'string',
          },
          href: {
            type: 'string',
            default: '',
            title: 'admin/editor.Megamenu.link',
          },
          secondLevel: {
            type: 'array',
            title: 'admin/editor.Megamenu.secondLevel',
            items: {
              properties: {
                __editorItemTitle: {
                  title: 'admin/editor.Megamenu.displayName',
                  type: 'string',
                },
                href: {
                  type: 'string',
                  default: '',
                  title: 'admin/editor.Megamenu.link',
                },
                thirdLevel: {
                  type: 'array',
                  title: 'admin/editor.Megamenu.thirdLevel',
                  items: {
                    properties: {
                      __editorItemTitle: {
                        title: 'admin/editor.Megamenu.displayName',
                        type: 'string',
                      },
                      href: {
                        type: 'string',
                        default: '',
                        title: 'admin/editor.Megamenu.link',
                      }
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

export default MegamenuMobile
