import type { History } from 'history'

export interface RenderContext
  extends Pick<
    RenderRuntime,
    | 'account'
    | 'amp'
    | 'binding'
    | 'components'
    | 'contentMap'
    | 'culture'
    | 'defaultExtensions'
    | 'deviceInfo'
    | 'emitter'
    | 'hints'
    | 'inspect'
    | 'messages'
    | 'page'
    | 'pages'
    | 'platform'
    | 'preview'
    | 'production'
    | 'publicEndpoint'
    | 'query'
    | 'renderMajor'
    | 'rootPath'
    | 'route'
    | 'workspace'
  > {
  addMessages: (newMessages: RenderRuntime['messages']) => Promise<void>
  addNavigationRouteModifier: (modifier: NavigationRouteModifier) => void
  ensureSession: () => Promise<void>
  fetchComponent: (component: string) => Promise<unknown>
  fetchComponents: (
    components: RenderRuntime['components'],
    extensions?: RenderRuntime['extensions']
  ) => Promise<void>
  goBack: () => void
  device: string
  history: History | null
  extensions: {
    [key: string]: {
      content?: {
        active: boolean
      }
      after?: string[]
      around?: string[]
      before?: string[]
      blockId?: string
      blocks?: BlockInsertion[]
      context?: {
        component: string
        props?: unknown
      }
      component: string
      track?: string[]
      props?: unknown
      content?: Record<string, unknown>
      render?: RenderStrategy
      preview?: Preview
      hydration?: HydrationType
      composition?: Composition
      hasContentSchema?: boolean
      contentIds?: string[]
    }
  }
  navigate: (options: NavigateOptions) => boolean
  onPageChanged: (location: RenderHistoryLocation) => void
  prefetchDefaultPages: (routeIds: string[]) => Promise<void>
  prefetchPage: (name: string) => void
  setDevice: (device: ConfigurationDevice) => void
  updateComponentAssets: (availableComponents: Components) => void
  updateExtension: (name: string, extension: Extension) => Promise<void>
  updateRuntime: (options?: PageContextOptions) => Promise<void>
  navigationRouteModifiers: Set<NavigationRouteModifier>
}
declare const usePublicRuntime: () => PublicRuntime
export default RenderContext
