export interface OneClickAppService {
  image: string
  volumes?: string[]
  restart: string
  environment: { [key: string]: string }
  caproverExtra?: {
    notExposeAsWebApp?: boolean
    containerHttpPort?: string
  }
  depends_on?: string[]
}

export interface OneClickAppVariable {
  id: string
  label: string
  defaultValue: string
  description: string
  validRegex: string
}

export interface OneClickAppDefinition {
  captainVersion: number
  services: { [key: string]: OneClickAppService }

  caproverOneClickApp: {
    variables: OneClickAppVariable[]
    instructions: {
      start: string

      end: string
    }
    displayName: string
    isOfficial: boolean
    description: string
    documentation: string
  }
}
export interface AppData {
  data: OneClickAppDefinition

  modified: string
  created: string
  slug: string
  friendlyName: string
  cover: string
  similar: { cover: string; name: string }[]
}
