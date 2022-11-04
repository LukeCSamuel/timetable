import { StyleProvider } from '@/lib/styles/StyleProvider';

export interface ConnectionStyle {
  color: string
  width: number
}

/**
 * Composable detailing how to paint a particular node connection
 */
export class ConnectionStyleProvider extends StyleProvider<ConnectionStyle> { }
