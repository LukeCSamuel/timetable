import { StyleProvider } from '@/lib/styles/StyleProvider';

export interface StationStyle {
  color: string
  radius: number
}

export class StationStyleProvider extends StyleProvider<StationStyle> { }
