import React, { FC } from "react";
import {
  Rating as MuiRating,
  RatingProps as MuiRatingProps,
} from "@mui/material";
import { SVG } from "../../../components/SVG/SVG";

export type RatingProps = MuiRatingProps;

export const Rating: FC<RatingProps> = ({ ...props }) => {
  return (
    <MuiRating
      // ref={ref}
      // precision={0.5}
      emptyIcon={<RatingIcon />}
      icon={<RatingIcon className='svg-icon-warning' />}
      {...props}
    />
  );
};

type RatingIconProps = {
  path?: string;
  className?: string;
};
const RatingIcon: FC<RatingIconProps> = ({ ...props }) => (
  <SVG
    path='/general/gen029.svg'
    size='1'
    {...props}
  />
);
