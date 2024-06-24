import { plural } from "pluralize";
import { I18nMessageKey } from "./i18n/I18nMessages";
import {
  ColumnDef,
  ColumnMapping,
  FormFields,
  FormViewType,
  Model,
  ModelMapping,
  ViewEnum,
} from "./types/ModelMapping";
import {
  array,
  bool,
  number,
  object,
  ObjectSchema,
  string,
  StringSchema,
} from "yup";
import {
  getStringValidation,
  StringFormat,
} from "./Column/String/StringColumn";
import { MODEL_MAPPINGS } from "../app/modules";
import {
  ColumnTypeEnum,
  ValidationSchemaDef,
  ValidationSchemaProps,
} from "./types/types";
import "yup-phone";
import { ModelEnum } from "../app/modules/types";
import { datetime, relation } from "./yup";
import { getNumberValidation } from "./Column/Number/NumberColumn";
import { ObjectFormat } from "./Column/Object/ObjectColumn";

export const camelCaseToDash = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
export const dashToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
export const getRoutePrefix = (modelName: string) =>
  `/${plural(camelCaseToDash(modelName)).toLowerCase()}`;
export const stringToI18nMessageKey = (str: string) => {
  const _string = str.charAt(0) + str.slice(1).replace(/([A-Z])/g, "_$1");

  return _string.toUpperCase() as I18nMessageKey;
};
export const camelCaseToPascalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
export const pascalCaseToCamelCase = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);
export const getValidationSchema = <M extends ModelEnum>({
  columnDef,
  trans,
  fields,
  noSortEdges,
}: ValidationSchemaProps<M>) => {
  let objectSchema: Record<any, any> = {};

  (Object.keys(fields) as Array<keyof Model<M> | string>)
    .filter((columnName) => {
      if (!(columnName in columnDef)) {
        return false;
      }
      // @ts-ignore
      return columnName !== "id" || columnDef[columnName];
    })
    .forEach((columnName) => {
      const columnMapping = columnDef[columnName] as ColumnMapping<M>;
      const { type, schema, nullable } = columnMapping;
      let required: boolean = !nullable;

      let fieldSchema;

      if (typeof schema === "object") {
        fieldSchema = schema;
      } else {
        switch (type) {
          case ColumnTypeEnum.Number:
            fieldSchema = columnMapping.validation
              ? getNumberValidation({ validation: columnMapping.validation })
              : number();
            break;
          case ColumnTypeEnum.String:
            const { format } = columnMapping;
            switch (format) {
              case StringFormat.Email:
                fieldSchema = string().email();
                break;
              case StringFormat.PhoneNumber:
                fieldSchema = string().phone(
                  "MA",
                  true,
                  "VALIDATION.STRING.PHONE_NUMBER"
                );
                break;
              case StringFormat.Date:
              case StringFormat.Time:
              case StringFormat.Datetime:
                fieldSchema = datetime().nullable();
                break;
              case StringFormat.Select:
                fieldSchema = string().oneOf(
                  columnMapping.options.map((option) => option.id),
                  {
                    id: "VALIDATION.MIXED.ONE_OF",
                    params: {
                      values: columnMapping.options
                        .map(({ id, label }) =>
                          trans({ id: label || (id as I18nMessageKey) })
                        )
                        .join(", "),
                    },
                  }
                );
                break;
              default:
                fieldSchema = string();
            }

            fieldSchema = getStringValidation({
              schema: fieldSchema as StringSchema,
              validation: {
                ...columnMapping.validation,
                max:
                  format === StringFormat.Text
                    ? columnMapping.validation?.max
                    : columnMapping.validation?.max || 255,
              },
            });

            break;
          case ColumnTypeEnum.Boolean:
            fieldSchema = bool();
            break;
          case ColumnTypeEnum.Array:
            fieldSchema = array();
            break;
          case ColumnTypeEnum.Object:
            switch (columnMapping.format) {
              case ObjectFormat.File:
                fieldSchema = object();
                break;
              default:
                fieldSchema = object();
            }
            break;
          default:
            let relationSchema: ObjectSchema<any> = relation();
            if ("embeddedForm" in columnMapping) {
              const embeddedModelMapping = MODEL_MAPPINGS[
                type
              ] as ModelMapping<any>;
              const view = embeddedModelMapping.views?.find(
                (view) => view.type === ViewEnum.Create
              ) as FormViewType<M> | undefined;
              const embeddedFields =
                view?.fields ||
                (
                  Object.keys(embeddedModelMapping.columnDef) as Array<
                    keyof Model<M>
                  >
                )
                  .filter((columnName) => {
                    if (["id"].includes(columnName.toString())) {
                      return false;
                    }
                    const columnMapping =
                      embeddedModelMapping.columnDef[columnName];
                    switch (columnMapping.type) {
                      case ColumnTypeEnum.String:
                      case ColumnTypeEnum.Number:
                      case ColumnTypeEnum.Boolean:
                        return true;
                      default:
                        return false;
                    }
                  })
                  .reduce(
                    (obj, columnName) => ({ ...obj, [columnName]: true }),
                    {} as FormFields<M>
                  );

              relationSchema = getValidationSchema({
                columnDef:
                  embeddedModelMapping.columnDef as ValidationSchemaDef<M>,
                trans,
                fields: embeddedFields,
                noSortEdges,
              });
            }
            if ("multiple" in columnMapping) {
              required = false;
              fieldSchema = array().of(relationSchema);
              if (columnMapping.min) {
                fieldSchema = fieldSchema.min(columnMapping.min);
              }
              if (columnMapping.max) {
                fieldSchema = fieldSchema.max(columnMapping.max);
              }
            } else {
              fieldSchema = relationSchema.nullable();
            }

            break;
        }

        if (schema) {
          fieldSchema = schema(fieldSchema);
        }
      }

      if (fieldSchema) {
        fieldSchema = fieldSchema.nullable();
        if (required) {
          fieldSchema = fieldSchema.required();
        }

        objectSchema[columnName] = fieldSchema;
      }
    });
  // TODO
  return object().shape(objectSchema, noSortEdges);
};
export const getDetailQueryKey = (modelName: string) => `${modelName}.DETAIL`;
export const getDefaultFields = <M extends ModelEnum>(
  columnDef: ColumnDef<M>
) => {
  return (Object.keys(columnDef) as Array<keyof Model<M>>)
    .filter((columnName) => {
      if (["id", "createdAt", "updatedAt"].includes(columnName.toString())) {
        return false;
      }
      const def = columnDef[columnName];
      switch (def.type) {
        case ColumnTypeEnum.String:
        case ColumnTypeEnum.Number:
        case ColumnTypeEnum.Boolean:
          return true;
        case ColumnTypeEnum.Array:
          return false;
        default:
          return (
            !("multiple" in def) ||
            MODEL_MAPPINGS[def.type].uploadable ||
            "embeddedForm" in def
          );
      }
    })
    .reduce(
      (obj, columnName) => ({ ...obj, [columnName]: true }),
      {} as FormFields<M>
    );
};
export const getInitialValues = <M extends ModelEnum>({
  columnDef,
  fields,
}: {
  columnDef: ColumnDef<M>;
  fields: FormFields<M>;
}) => {
  let defaultValues: Record<any, any> = {};

  const columnNames = (
    Object.keys(fields) as Array<keyof Model<M> | string>
  ).filter(
    (columnName) => columnDef[columnName] as ColumnMapping<M> | undefined
  );

  columnNames.forEach((columnName) => {
    const field = fields[columnName];

    let defaultValue;
    const def = columnDef[columnName] as ColumnMapping<M>;
    const { type } = def;

    switch (type) {
      case ColumnTypeEnum.String:
        switch (def.format) {
          case StringFormat.Date:
          case StringFormat.Time:
          case StringFormat.Datetime:
            defaultValue = null;
            break;
          default:
            defaultValue = "";
        }
        break;
      case ColumnTypeEnum.Number:
        defaultValue = 0;
        break;
      case ColumnTypeEnum.Boolean:
        defaultValue = false;
        break;
      case ColumnTypeEnum.Array:
        defaultValue = [];
        break;
      case ColumnTypeEnum.Object:
        switch (def.format) {
          case ObjectFormat.File:
            defaultValue = null;
            break;
        }
        break;
      default:
        if ("embeddedForm" in def) {
          const embeddedMapping = MODEL_MAPPINGS[type] as ModelMapping<any>;
          const view = embeddedMapping.views?.find((view) => {
            return view.type === ViewEnum.Create;
          }) as FormViewType<M> | undefined;

          const embeddedFields =
            view?.fields || getDefaultFields(embeddedMapping.columnDef);

          if ("multiple" in def) {
            defaultValue = [];
          } else {
            defaultValue = getInitialValues({
              columnDef: embeddedMapping.columnDef,
              fields: embeddedFields,
            });
          }
          // console.log(defaultValue)
        } else {
          defaultValue = "multiple" in def ? [] : null;
        }

        break;
    }

    if (
      typeof field === "object" &&
      typeof field?.defaultValue !== "undefined"
    ) {
      defaultValues[columnName] = field.defaultValue;
    } else {
      defaultValues[columnName] = defaultValue;
    }
  });

  return defaultValues as Model<M>;
};
