import {
  CompoundFilterOperator,
  Filter,
  PropertyFilterOperator,
} from "./Filter.types";
import {
  ColumnDef,
  ColumnMapping,
  Model,
  TypeColum,
} from "../../types/ModelMapping";
import { MODEL_MAPPINGS } from "../../../app/modules";
import { SortInput } from "../ListingView.types";
import { stringToI18nMessageKey } from "../../utils";
import { ColumnTypeEnum } from "../../types/types";
import { ModelEnum } from "../../../app/modules/types";
import { StringFormat } from "../../Column/String/StringColumn";
import { I18nMessageKey } from "../../i18n/I18nMessages";

const getDefs = <M extends ModelEnum>(modelName: M, path: string) => {
  const parts = path.split(".");
  let result: Record<string, ColumnMapping<any>> = {};
  parts.forEach((part) => {
    const def = MODEL_MAPPINGS[modelName].columnDef;
    result[part] = def[part as keyof typeof def];
  });

  return result;
};

export const getColumnMapping = <M extends ModelEnum>({
  modelName,
  columnName,
}: {
  modelName: M;
  columnName: string | keyof Model<M>;
}) => {
  const defs = getDefs(modelName, columnName.toString());

  return Object.values(defs).at(-1) as ColumnMapping<any>;
};

export const filterToParams = <M extends ModelEnum>(
  filter: Filter<M>,
  prefix: string,
  modelName: M
) => {
  let result: Record<string, string | number> = {};

  if ("filters" in filter) {
    const { operator, filters } = filter;
    if (filters.length === 1) {
      result = {
        ...result,
        ...filterToParams(filters[0], prefix, modelName),
      };
    }

    if (filters.length > 1) {
      result[`${prefix}[operator]`] = operator;
      filters.forEach((_filter, i) => {
        result = {
          ...result,
          ...filterToParams(_filter, `${prefix}[filters][${i}]`, modelName),
        };
      });
    }

    return result;
  }

  const { property, operator, value } = filter;

  let _value = value;

  let def = getColumnMapping({ modelName, columnName: property });

  switch (def?.type) {
    case ColumnTypeEnum.String:
    case ColumnTypeEnum.Number:
    case ColumnTypeEnum.Boolean:
      break;
    default:
      switch (operator) {
        case PropertyFilterOperator.IsNull:
        case PropertyFilterOperator.IsNotNull:
        case PropertyFilterOperator.IsTrue:
        case PropertyFilterOperator.IsFalse:
          break;
        default:
          _value =
            typeof value === "object"
              ? Array.isArray(value)
                ? value.map((i) => i.id || i)
                : value?.id
              : value;
      }
  }

  return {
    ...result,
    [`${prefix}[operator]`]: operator,
    [`${prefix}[property]`]: property,
    [`${prefix}[value]`]: _value,
  };
};
export const serializeSort = (sort: SortInput<any>) =>
  Object.keys(sort).reduce(
    (obj, columnName) => ({
      ...obj,
      [`sort[${columnName}]`]: sort[columnName],
    }),
    {}
  );
export const getFilterOperators = (column: TypeColum) => {
  switch (column.type) {
    case ColumnTypeEnum.String:
      switch (column.format) {
        case StringFormat.Datetime:
        case StringFormat.Date:
        case StringFormat.Time:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.GreaterThan,
            PropertyFilterOperator.GreaterThanOrEqual,
            PropertyFilterOperator.LessThan,
            PropertyFilterOperator.LessThanOrEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull,
          ];
        case StringFormat.Select:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull,
          ];
        case StringFormat.Text:
        case StringFormat.Email:
        case StringFormat.PhoneNumber:
        case StringFormat.Link:
        case StringFormat.Qrcode:
        case undefined:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.Contain,
            PropertyFilterOperator.DoesNotContain,
            PropertyFilterOperator.Start,
            PropertyFilterOperator.End,
            PropertyFilterOperator.DoesNotStart,
            PropertyFilterOperator.DoesNotEnd,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull,
          ];
        case StringFormat.Icon:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull,
          ];
        default:
          return [];
      }
    case ColumnTypeEnum.Number:
      return [
        PropertyFilterOperator.Equal,
        PropertyFilterOperator.NotEqual,
        PropertyFilterOperator.GreaterThan,
        PropertyFilterOperator.GreaterThanOrEqual,
        PropertyFilterOperator.LessThan,
        PropertyFilterOperator.LessThanOrEqual,
        PropertyFilterOperator.IsNull,
        PropertyFilterOperator.IsNotNull,
      ];
    case ColumnTypeEnum.Boolean:
      return [PropertyFilterOperator.Equal];
    default:
      return [
        PropertyFilterOperator.Equal,
        PropertyFilterOperator.NotEqual,
        PropertyFilterOperator.IsNull,
        PropertyFilterOperator.IsNotNull,
      ];
  }
};
export const getAdvancedPropertyFilter = (props: TypeColum) => {
  switch (props.type) {
    case ColumnTypeEnum.String:
      let operator: PropertyFilterOperator;
      let value: any;
      switch (props.format) {
        case StringFormat.Text:
        case StringFormat.Email:
        case StringFormat.PhoneNumber:
        case StringFormat.Link:
        case StringFormat.Qrcode:
          operator = PropertyFilterOperator.Contain;
          break;
        default:
          operator = PropertyFilterOperator.Equal;
      }

      switch (props.format) {
        case StringFormat.Icon:
        case StringFormat.Select:
          value = null;
          break;
        default:
          value = "";
      }

      return { operator, value };
    case ColumnTypeEnum.Number:
      return {
        operator: PropertyFilterOperator.Equal,
        value: 0,
      };
    case ColumnTypeEnum.Boolean:
      return {
        operator: PropertyFilterOperator.Equal,
        value: true,
      };
    default:
      return {
        operator: PropertyFilterOperator.Equal,
        value: null,
      };
  }
};
export const getPropertyFilter = ({
  property,
  ...props
}: TypeColum & { property: string }) => {
  switch (props.type) {
    case ColumnTypeEnum.String:
      switch (props.format) {
        case StringFormat.Date:
        case StringFormat.Datetime:
        case StringFormat.Time:
          return {
            operator: CompoundFilterOperator.And,
            filters: [
              {
                property,
                operator: PropertyFilterOperator.GreaterThanOrEqual,
                value: null,
              },
              {
                property,
                operator: PropertyFilterOperator.LessThan,
                value: null,
              },
            ],
          };
      }

      break;
    default:
      break;
  }

  return {
    property,
    ...getAdvancedPropertyFilter(props),
  };
};
export const isValueless = (operator: PropertyFilterOperator) => {
  switch (operator) {
    case PropertyFilterOperator.IsNull:
    case PropertyFilterOperator.IsNotNull:
    case PropertyFilterOperator.IsTrue:
    case PropertyFilterOperator.IsFalse:
      return true;
    default:
      return false;
  }
};
export const getPropertyI18NMessageKey = (
  columnDef: ColumnDef<any>,
  columnName: keyof Model<any> | string
) => {
  let label: I18nMessageKey;
  const _option = columnName.toString();
  if (_option.includes(".")) {
    const _columnName = _option.split(".").pop() as string;

    return stringToI18nMessageKey(_columnName) as I18nMessageKey;
  } else {
    return columnDef[columnName].title || stringToI18nMessageKey(_option);
  }
};
