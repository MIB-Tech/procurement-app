import React, { FC } from "react";
import { SVGProps } from "../../../components/SVG/SVG.types";
import { STRING_FORMAT_CONFIG } from "../../../Column/String/StringColumn";
import { SVG } from "../../../components/SVG/SVG";
import { NUMBER_FORMAT_CONFIG } from "../../../Column/Number/NumberColumn";
import { TypeColum } from "../../../types/ModelMapping";
import { ColumnTypeEnum } from "../../../types/types";

export const ColumnIcon: FC<TypeColum & Omit<SVGProps, "path">> = (props) => {
  const { type } = props;
  let icon: string | undefined;
  switch (type) {
    case ColumnTypeEnum.String:
      if (props.format) {
        icon = STRING_FORMAT_CONFIG[props.format].icon;
      } else {
        icon = "/text/txt006.svg";
      }
      break;
    case ColumnTypeEnum.Number:
      if (props.format) {
        icon = NUMBER_FORMAT_CONFIG[props.format].icon;
      } else {
        icon = "/coding/cod004.svg";
      }
      break;
    case ColumnTypeEnum.Boolean:
      icon = "/general/gen037.svg";
      break;
    case ColumnTypeEnum.Array:
      icon = "/layouts/lay002.svg";
      break;
    default:
      icon = "/coding/cod007.svg";
      break;
  }

  return icon ? (
    <SVG
      path={icon}
      {...props}
    />
  ) : (
    <></>
  );
};
