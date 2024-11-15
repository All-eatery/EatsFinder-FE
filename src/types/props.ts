import { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {}
export type SVGUsableProps = {
  isUsable?: boolean;
  width?: number;
  height?: number;
};
export type SVGFilledProps = {
  isFill?: boolean;
};
export type SVGVisibilityProps = {
  isVisible?: boolean;
};
export type SVGUpDownProps = {
  isUp?: boolean;
};
export type SVGRatingStarProps = {
  isFill?: 'fill' | 'half' | 'empty';
};
export type SVGCheckBoxProps = {
  isChecked?: 'default' | 'check' | 'blank';
};
export type SVGArrowProps = {
  direction: 'down' | 'right' | 'left';
  color?: 'default' | 'orange';
};
export type SVGCheckProps = {
  size?: 'regular' | 'large';
  color?: 'default' | 'green' | 'orange';
};
