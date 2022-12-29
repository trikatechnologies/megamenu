import React, { useEffect, useState } from 'react'
import { Link } from 'vtex.render-runtime'

import MenuList from './MenuList'
import MenuContent from './MenuContent'
import MenuSecondLevelContent from './MenuSecondLevelContent'
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

const Megamenu: StorefrontFunctionComponent = ({
  megaMenu,
}: {
  megaMenu?: MegaMenuItem[]
}) => {
  const [currentMenu, setCurrentMenu] = useState<MegaMenuItem>()
  const [currentSubMenu, setCurrentSubMenu] = useState<MegaMenuItem>()
  const filteredMenu = megaMenu?.filter((menu) => menu.active)
  const [thirdSubMenu, setThirdSubMenu] = useState<MegaMenuItem[]>()
  const [selectedMenus, setSelectedMenus] = useState<any>()
  const [selectedHoverMenus, setSelectedHoverMenus] = useState<any>()

  const getNameSlug = (name: string) => {
    return name.trim().replace(/\s+/g, '').toLowerCase()
  }

  const filterBy = (arr: any, value: string) => {
    return arr && arr?.filter((elem: any) => elem.href === value)
  }

  let navigatedMenus: any

  const getSelected = () => {
    const pathName = location.pathname

    filteredMenu?.map((element) => {
      const level1 = filterBy(filteredMenu, pathName)
      if(level1 && level1.length > 0) {
        navigatedMenus = {firstLevel: level1[0].__editorItemTitle}
      } else {
        const level2 = element?.secondLevel && filterBy(element?.secondLevel, pathName)
        if(level2 && level2.length > 0) {
          navigatedMenus = {firstLevel: element.__editorItemTitle, secondLevel: level2[0].__editorItemTitle}
        } else {
          element?.secondLevel?.map((elem) => {
            const level3 = elem?.thirdLevel && filterBy(elem?.thirdLevel, pathName)
            if(level3 && level3.length > 0) {
              navigatedMenus = {firstLevel: element.__editorItemTitle, secondLevel: elem.__editorItemTitle, thirdLevel: level3[0].__editorItemTitle}
            } else {
              elem?.thirdLevel?.map((ele) => {
                const level4 = ele?.fourthLevel && filterBy(ele?.fourthLevel, pathName)
                if(level4 && level4.length > 0) {
                  navigatedMenus = {firstLevel: element.__editorItemTitle, secondLevel: elem.__editorItemTitle, thirdLevel: ele.__editorItemTitle, fourthLevel: level4[0].__editorItemTitle}
                }
              })
            }
          })
        }
      }
    })
  }

  useEffect(() => {
    if (!currentMenu) setThirdSubMenu([])

    const menus = currentMenu?.secondLevel?.filter((items) => items.thirdLevel)
    setThirdSubMenu(menus)

    sessionStorage.removeItem("currentNavigation")
    sessionStorage.removeItem("currentHoverNavigation")

    getSelected()

    if(navigatedMenus && navigatedMenus.length > 0 || (navigatedMenus && navigatedMenus?.firstLevel)) {
      sessionStorage.setItem("currentNavigation", JSON.stringify(navigatedMenus))
      navigatedMenus !== null && setSelectedMenus(navigatedMenus)
    } else {
      const selectedNav = sessionStorage.getItem("currentNavigation")
      selectedNav !== null && setSelectedMenus(JSON.parse(selectedNav))
    }
  }, [currentMenu])

  return (
    <>
      <div className={`${styles.megamenu} relative w-100`}>
        <nav className={`${styles.navigation} flex items-center overflow-hidden pa5`}>
          <div className={`w-100`}>
            <div className={`flex justify-between`}>
              {filteredMenu?.map((menuItem: MegaMenuItem) => (
                <div
                  className={`${styles.firstMenu} mh3 ${selectedMenus?.firstLevel === menuItem.__editorItemTitle
                    ? styles.firstLevelActive
                    : ''}
                    ${!selectedHoverMenus && selectedMenus?.firstLevel === menuItem.__editorItemTitle
                      ? styles.firstLevelActive
                      : ''}
                    ${selectedHoverMenus?.firstLevel === menuItem.__editorItemTitle
                      ? styles.firstLevelActive
                      : ''}`}
                  id={`${menuItem.__editorItemTitle.trim().replace(/\s+/g, '').toLowerCase()}`}
                  onClick={() => {
                    const nav = {firstLevel: `${menuItem.__editorItemTitle}`}
                    sessionStorage.setItem("currentNavigation", JSON.stringify(nav))
                  }}
                  onMouseOver={() => {
                    const nav = {firstLevel: `${menuItem.__editorItemTitle}`}
                    setCurrentMenu(menuItem)
                    setSelectedHoverMenus(nav)
                  }}
                >
                  <Link
                    to={menuItem.href}
                    className={`${styles.firstMenuItems} department no-underline`}
                  >
                    {menuItem.__editorItemTitle}
                  </Link>
                </div>
              ))}
            </div>
            <div
              className={`${styles.dropdownWrapper} absolute left-0 w-100 bg-white z-1 b--lightgrey`}
              style={{ top: '100%' }}
              onMouseLeave={() => {
                setCurrentMenu(undefined)
                setCurrentSubMenu(undefined)
                setSelectedHoverMenus(undefined)
              }}
            >
              {currentMenu?.secondLevel && currentMenu?.secondLevel.length > 0 ? (
                <div
                  className={`${styles.dropdownContainer} overflow-hidden overflow-y-auto flex-auto pv4 flex ${getNameSlug(
                    currentMenu.__editorItemTitle
                  )} flex`}
                  // style={{ height: '40vh' }}
                >
                  {thirdSubMenu && thirdSubMenu.length === 0 && (
                    <MenuSecondLevelContent
                      currentMenu={currentMenu}
                      currentSubMenu={currentSubMenu}
                      selectedMenus={selectedMenus}
                    />
                  )}
                  {thirdSubMenu && thirdSubMenu.length > 0 && (
                    <>
                      <MenuList
                        currentMenu={currentMenu}
                        currentSubMenu={currentSubMenu}
                        setCurrentSubMenu={setCurrentSubMenu}
                        selectedMenus={selectedMenus}
                        setSelectedHoverMenus={setSelectedHoverMenus}
                        selectedHoverMenus={selectedHoverMenus}
                      />
                      <MenuContent
                        currentMenu={currentMenu}
                        currentSubMenu={currentSubMenu}
                        selectedMenus={selectedMenus}
                      />
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

Megamenu.schema = {
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
                promotional: {
                  type: 'object',
                  title: 'admin/editor.Megamenu.secondLevel',
                  properties: {
                    promoImage: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoImage',
                      widget: {
                        'ui:widget': 'image-uploader',
                      },
                    },
                    promoImageAltText: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoImageAltText',
                    },
                    promoTitle: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoTitle',
                    },
                    promoContent: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoContent',
                      widget: {
                        'ui:widget': 'textarea',
                      },
                    },
                    promoLinkText: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoLinkText',
                    },
                    promoLink: {
                      type: 'string',
                      default: '',
                      title: 'admin/editor.Megamenu.promoLink',
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

export default Megamenu
