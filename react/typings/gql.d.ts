import type { DocumentNode } from 'graphql'

declare module '*.gql' {
  const Schema: DocumentNode
  export default Schema
}

declare module '*.graphql' {
  const Schema: DocumentNode
  export default Schema
}
