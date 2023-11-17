import { HTMLAttributes } from 'react';
import { Variant } from 'react-bootstrap/types';


export type SVGProps = {
  variant?: Variant
  path: string
  svgClassName?: string
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'base' | 'fluid' | '2x' | '2qx' | '2hx' | '2tx' | '3x' | '3qx' | '3hx' | '3tx' | '4x' | '4qx' | '4hx' | '4tx' | '5x' | '5qx' | '5hx' | '5tx'
} & HTMLAttributes<HTMLSpanElement>

export interface DItem {
  name: string;
  path: string;
}