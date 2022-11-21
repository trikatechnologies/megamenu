import React, { useState } from 'react'

import MenuListMobile from './MenuListMobile'

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
      <nav className={`flex items-center w-100 mv5`}>
        <div className={`flex justify-left w-100`}>
          <div className={`flex flex-column w-100`}>
            {filteredMenu.map((menuItem: MegaMenuItem) => (
              <div className={`firstLevel`}>
                <div
                  className={`relative pv5 mh5 t-semiBoldFont`}
                  onClick={() => {
                    toggleMenu.menu !== menuItem.__editorItemTitle
                      ? setToggleMenu((prevState) => ({
                          ...prevState,
                          menu: menuItem.__editorItemTitle,
                          menuItem1: '',
                          menuItem2: '',
                        }))
                      : setToggleMenu((prevState) => ({
                          ...prevState,
                          menu: '',
                          menuItem1: '',
                          menuItem2: '',
                        }))
                  }}
                >
                  <MenuListMobile
                    currentMenu={menuItem}
                    hasChildren={!!menuItem.secondLevel}
                    toggleMenu={toggleMenu.menu}
                  />
                </div>
                <div
                  className={`sublevels secondLevel ${
                    toggleMenu.menu !== menuItem.__editorItemTitle ? 'dn' : ''
                  }`}
                >
                  {!!menuItem.secondLevel &&
                    menuItem.secondLevel.map((subMenus: MegaMenuItem) => (
                      <div>
                        <div
                          className={`relative pv4 mh5 ph3 t-semiBoldFont`}
                          onClick={() => {
                            toggleMenu.menuItem1 !== subMenus.__editorItemTitle
                              ? setToggleMenu((prevState) => ({
                                  ...prevState,
                                  menuItem1: subMenus.__editorItemTitle,
                                  menuItem2: '',
                                }))
                              : setToggleMenu((prevState) => ({
                                  ...prevState,
                                  menuItem1: '',
                                  menuItem2: '',
                                }))
                          }}
                        >
                          <MenuListMobile
                            currentMenu={subMenus}
                            hasChildren={!!subMenus.thirdLevel}
                            toggleMenu={toggleMenu.menuItem1}
                          />
                        </div>
                        <div
                          className={`sublevels thirdLevel ${
                            toggleMenu.menuItem1 !== subMenus.__editorItemTitle ? 'dn' : ''
                          }`}
                        >
                          {!!subMenus.thirdLevel &&
                            subMenus.thirdLevel.map(
                              (subItems: MegaMenuItem) => (
                                <div>
                                  <div
                                    className={`relative pv4 mh5 ph5`}
                                    onClick={() => {
                                      toggleMenu.menuItem2 !== subItems.__editorItemTitle
                                        ? setToggleMenu((prevState) => ({
                                            ...prevState,
                                            menuItem2: subItems.__editorItemTitle,
                                          }))
                                        : setToggleMenu((prevState) => ({
                                            ...prevState,
                                            menuItem2: '',
                                          }))
                                    }}
                                  >
                                    <MenuListMobile
                                      currentMenu={subItems}
                                      hasChildren={!!subItems.fourthLevel}
                                      toggleMenu={toggleMenu.menuItem2}
                                    />
                                  </div>
                                  <div
                                    className={`sublevels fourthLevel bg-lightgrey ${
                                      toggleMenu.menuItem2 !== subItems.__editorItemTitle
                                        ? 'dn'
                                        : ''
                                    }`}
                                  >
                                    {!!subItems.fourthLevel &&
                                      subItems.fourthLevel.map(
                                        (lastlevel: MegaMenuItem) => (
                                          <div className={`pv3 mh5 ph5`}>
                                            <MenuListMobile
                                              currentMenu={lastlevel}
                                              hasChildren={false}
                                            />
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
                      },
                      fourthLevel: {
                        type: 'array',
                        title: 'admin/editor.Megamenu.fourthLevel',
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
      },
    },
  },
}

export default MegamenuMobile
