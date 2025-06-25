import { IItem } from './item.infra'

export interface IGPTResponse {
  answer: {
    title: string
    results: IItem[]
  }
}
