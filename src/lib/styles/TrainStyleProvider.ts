import { StyleProvider } from '@/lib/styles/StyleProvider';

export interface TrainStyle {
  width: number
  length: number
  color: string
}

export class TrainStyleProvider extends StyleProvider<TrainStyle> { }
