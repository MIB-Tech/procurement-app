import { ReactNode } from "react";
import { NumberColumn } from "../Column/Number/NumberColumn";
import { StringColumn } from "../Column/String/StringColumn";
import { ModelColumn } from "../Column/Model/ModelColumn";
import { BooleanColumn } from "../Column/Boolean/BooleanColumn";
import { ArrayColumn } from "../Column/Array/ArrayColumn";
import { I18nMessageKey } from "../i18n/I18nMessages";
import { UserModel } from "../../app/modules/User";
import { RoleKeyEnum } from "../../app/modules/Role/Model";
import { HydraItem } from "./hydra.types";
import { ModelEnum, Models } from "../../app/modules/types";
import { Variant } from "react-bootstrap/types";
import { OperationModel } from "../../app/modules/Operation";
import { GridProps } from "@mui/material";
import { FieldProps } from "../Column/controls/fields";
import { Input } from "../FormView/FormView.types";
import {
  FieldHelperProps,
  FieldInputProps,
  FormikComputedProps,
  FormikProps,
  FormikState,
} from "formik";
import { Permission } from "../hooks/UseAuth";
import { Filter } from "../ListingView/Filter/Filter.types";
import { ListingState } from "../../app/modules";
import { ObjectColumn } from "../Column/Object/ObjectColumn";
import { FormValue } from "../FormView/FormCard";
import { FieldMetaProps } from "formik/dist/types";

export type Model<M extends ModelEnum> = Models[M];
export type DisplayCallback<M extends ModelEnum> = (props: {
  item: FormValue<M>;
}) => boolean | undefined;
export type DisplayViewBaseColum<M extends ModelEnum> = {
  display?: true | RoleKeyEnum[] | DisplayCallback<M>;
  render?: (props: { item: Model<M> }) => ReactNode;
};
export type FormikStateProps<M extends ModelEnum> = FormikState<FormValue<M>> &
  FormikComputedProps<FormValue<M>>;
export type FormViewBaseColumn<M extends ModelEnum> = {
  required?: true;
} & DisplayViewBaseColum<M>;

export type ViewColumn<M extends ModelEnum> = {
  title?: I18nMessageKey;
  nullable?: boolean;
  readOnly?: boolean;
  footer?: (props: { value?: any; items: Array<FormValue<M>> }) => ReactNode;
};
export type TypeColum<M extends ModelEnum = any> =
  | NumberColumn<M>
  | StringColumn<M>
  | ModelColumn<M>
  | BooleanColumn
  | ArrayColumn
  | ObjectColumn;
export type ColumnMapping<M extends ModelEnum> = ViewColumn<M> & TypeColum<M>;
export type ColumnDef<M extends ModelEnum> = Record<
  keyof Model<M>,
  ColumnMapping<M>
>;

export enum ViewEnum {
  Listing = "LISTING",
  Create = "CREATE",
  Update = "UPDATE",
  Detail = "DETAIL",
  Delete = "DELETE",
}

// read (Listing(Listing, Calendar), Detail), write (Create, Update, Delete)

/** @deprecated */
export type ItemOperationCallback<M extends ModelEnum> = (props: {
  item: Model<M>;
  operations: OperationModel[];
}) => OperationModel[];

export type ListingColumns<M extends ModelEnum> = Partial<
  Record<
    keyof Model<M> | string,
    | boolean
    | {
        render?: (props: { item: Model<M> }) => ReactNode;
      }
  >
>;
export type FilterColumns<M extends ModelEnum> = Partial<
  Record<
    string | keyof Model<M>,
    | boolean
    | {
        quickFilter?: boolean;
        display?: (props: { user: UserModel }) => boolean | undefined;
      }
  >
>;
export type ExportableColumn<M extends ModelEnum> = Partial<
  Record<
    string | keyof Model<M>,
    | boolean
    | {
        getValue?: (props: Model<M>) => string | number;
      }
  >
>;
export type BulkAction<M extends ModelEnum> = {
  render: (props: { selectedItems: Array<HydraItem<M>> }) => ReactNode;
};
export type ListingViewType<M extends ModelEnum> = {
  type: ViewEnum.Listing;
  dateFields?: Array<DateField<M>>;
  itemOperationRoutes?: ItemOperationCallback<M>;
  columns?: ListingColumns<M>;
  filterColumns?: FilterColumns<M>;
  exportableColumns?: ExportableColumn<M>;
  sortColumns?: Partial<Record<keyof Model<M>, boolean>>;
  bulkActions?: Array<BulkAction<M>>;
  defaultState?: Partial<ListingState<M>>;
};
export type DateField<M extends ModelEnum> = {
  startProperty: keyof Model<M>;
  endProperty?: keyof Model<M>;
  variant?: Variant;
};
export type DetailColumns<M extends ModelEnum> = Partial<
  Record<
    keyof Model<M> | string,
    | boolean
    | {
        as?: "EMPTY" | "TAB";
        display?: DisplayCallback<M>;
        grantedRoles?: RoleKeyEnum[];
        render?: (props: { item: Model<M> }) => ReactNode;
      }
  >
>;
export type CustomItemActionProps<M extends ModelEnum> = { item: HydraItem<M> };
export type CustomItemAction<M extends ModelEnum> = {
  render: (props: CustomItemActionProps<M>) => ReactNode;
};
export type DetailViewType<M extends ModelEnum> = {
  type: ViewEnum.Detail;
  itemOperationRoutes?: ItemOperationCallback<M>;
  columns?: DetailColumns<M>;
  customActions?: Array<CustomItemAction<M>>;
};
/** @deprecated */
export type ImportViewType<M extends ModelEnum> = {
  columns?: Partial<Record<keyof Model<M>, boolean>>;
};
export type FieldRenderProps<M extends ModelEnum> = {
  inputProps: Pick<FieldInputProps<FormValue<M>>, "name">;
  metaProps: Pick<FieldMetaProps<FormValue<M>>, "value">;
};
export type FormField<M extends ModelEnum> = {
  display?: DisplayCallback<M>;
  grantedRoles?: RoleKeyEnum[];
  render?: (props: FieldRenderProps<M>) => ReactNode;
  defaultValue?: any;
  helperText?: I18nMessageKey;
  slotProps?: {
    root?: Omit<GridProps, "item">;
  };
};

export type FormFields<M extends ModelEnum> = Partial<
  Record<keyof Model<M> | string, boolean | FormField<M>>
>;

export enum MutationMode {
  Post = "POST",
  Put = "PUT",
}

type SubmittableProps<M extends ModelEnum> = {
  formik: FormikStateProps<M>;
  isGranted: (permissions: Permission[]) => boolean;
};
export type FormViewType<M extends ModelEnum> = {
  inlineForm?: boolean;
  submittable?: (props: SubmittableProps<M>) => boolean | undefined;
  className?: string;
  fields?: FormFields<M>;
  slotProps?: {
    root?: Omit<GridProps, "container">;
    item?: Omit<GridProps, "item">;
  };
  getMutateInput?: (input: Input<M>) => Input<M>;
  navigateTo?: (item: HydraItem<M>) => string;
};
export type CreateViewType<M extends ModelEnum> = {
  type: ViewEnum.Create;
} & Omit<FormViewType<M>, "mode">;
export type UpdateViewType<M extends ModelEnum> = {
  type: ViewEnum.Update;
  fetchUri?: string;
  mutateUri?: string;
} & Omit<FormViewType<M>, "mode">;
export type DeleteViewType = {
  type: ViewEnum.Delete;
};
export type View<M extends ModelEnum> =
  | ListingViewType<M>
  | DetailViewType<M>
  | CreateViewType<M>
  | UpdateViewType<M>
  | DeleteViewType;

export type ModelMapping<M extends ModelEnum> = {
  modelName: M;
  /** @deprecated */
  uploadable?: boolean;
  hydraTitle?: (item: HydraItem<M>) => ReactNode;
  hydraSubtitle?: (item: HydraItem<M>) => ReactNode;
  getSearchFilter?: (search: string, filter: Filter<M>) => Filter<M>;
  noSortEdges?: Array<[string, string]>;
  columnDef: ColumnDef<M>;
  views?: Array<View<M>>;
};
