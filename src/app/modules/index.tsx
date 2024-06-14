import { USER_MAPPING } from "./User";
import { ROLE_MAPPING } from "./Role";
import { CATEGORY_MAPPING } from "./Category";
import { PURCHASE_NEED_MAPPING } from "./PurchaseNeed";
import { PURCHASE_NEED_ATTACHMENT_MAPPING } from "./PurchaseNeedAttachment";
import { atom, atomFamily } from "recoil";
import {
  ListingModeEnum,
  Params,
} from "../../_core/ListingView/ListingView.types";
import { CompoundFilterOperator } from "../../_core/ListingView/Filter/Filter.types";
import { Mapping } from "../../_core/types/types";
import { ModelEnum } from "./types";
import { ListingViewType, ViewEnum } from "../../_core/types/ModelMapping";
import { APPLICANT_SERVICE_MAPPING } from "./ApplicantService";
import { COMPANY_MAPPING } from "./Company";
import { PURCHASE_NEED_PRODUCT_MAPPING } from "./PurchaseNeedProduct";
import { PRODUCT_MAPPING } from "./Product";
import { STEP_MAPPING } from "./Step";
import { VALIDATION_PATH_MAPPING } from "./ValidationPath";
import { RESOURCE_MAPPING } from "./Resource";
import { OPERATION_MAPPING } from "./Operation";
import { HydraItem } from "../../_core/types/hydra.types";
import { VENDOR_ADDRESS_MAPPING } from "./VendorAddress";
import { VENDOR_MAPPING } from "./Vendor";
import { CURRENCY_MAPPING } from "./Currency";
import { PURCHASEFILETYPE_MAPPING } from "./PurchaseFileType";
import { PURCHASEFILE_MAPPING } from "./PurchaseFile";
import { PURCHASEFILEPRODUCT_MAPPING } from "./PurchaseFileProduct";
import { VENDOROFFER_MAPPING } from "./VendorOffer";
import { VENDOR_OFFER_PRODUCT_MAPPING } from "./VendorOfferProduct";
import { PRODUCT_PRICING_MAPPING } from "./ProductPricing";
import { PURCHASE_ORDER_PRODUCT_MAPPING } from "./PurchaseOrderProduct";
import { PURCHASE_ORDER_MAPPING } from "./PurchaseOrder";
import { DESIRED_PRODUCT_MAPPING } from "./DesiredProduct";
import { RECEIPT_MAPPING } from "./Receipt";
import { RECEIPT_PRODUCT_MAPPING } from "./ReceiptProduct";
import { PURCHASE_ORDER_CATEGORY_MAPPING } from "./PurchaseOrderCategory";
import { PURCHASE_ORDER_ATTACHMENT_MAPPING } from "./PurchaseOrderAttachment";
import { COMPONENT_MAPPING } from "./Component";
import { PAYMENT_MODALITY_MAPPING } from "./PaymentModality";
import { INVOICE_MAPPING } from "./Invoice";
import { PRODUCT_SECTION_MAPPING } from "./ProductSection";
import { PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING } from "./PurchaseOrderProductComponent";
import { RECEIPT_PRODUCT_COMPONENT_MAPPING } from "./ReceiptProductComponent";
import { CITY_MAPPING } from "./City";
import { BLOC_MAPPING } from "./Bloc";
import { SERVICE_MAPPING } from "./Service";
import { CLINIC_MAPPING } from "./Clinic";
import { DELIVERY_DEPOT_MAPPING } from "./DeliveryDepot";
import { PRODUCT_SECTION_BUDGET_MAPPING } from "./ProductSectionBudget";
import { BUDGET_MAPPING } from "./Budget";
import { BUDGET_EXERCISE_MAPPING } from "./BudgetExercise";
import { QUERY_MAPPING } from "./Query";
import { QUERY_PARAM_MAPPING } from "./QueryParam";
import { INVOICE_ATTACHMENT_MAPPING } from "./InvoiceAttachment";
import { PAYMENT_TERM_MAPPING } from "./PaymentTerm";
import { RECEIPT_ATTACHMENT_MAPPING } from "./RecieptAttachment";
import { VATRATE_MAPPING } from "./VatRate";
import { DEFAULT_LISTING_VIEW } from "../../_core/ListingView/ListingView.utils";

export const MODEL_MAPPINGS: Mapping = {
  [ModelEnum.Currency]: CURRENCY_MAPPING,
  [ModelEnum.VatRate]: VATRATE_MAPPING,
  [ModelEnum.ProductPricing]: PRODUCT_PRICING_MAPPING,
  [ModelEnum.DesiredProduct]: DESIRED_PRODUCT_MAPPING,
  [ModelEnum.PurchaseFile]: PURCHASEFILE_MAPPING,
  [ModelEnum.PurchaseFileProduct]: PURCHASEFILEPRODUCT_MAPPING,
  [ModelEnum.PurchaseFileType]: PURCHASEFILETYPE_MAPPING,
  [ModelEnum.PurchaseOrder]: PURCHASE_ORDER_MAPPING,
  [ModelEnum.PurchaseOrderProduct]: PURCHASE_ORDER_PRODUCT_MAPPING,
  [ModelEnum.PurchaseOrderProductComponent]:
    PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING,
  [ModelEnum.PurchaseOrderCategory]: PURCHASE_ORDER_CATEGORY_MAPPING,
  [ModelEnum.Receipt]: RECEIPT_MAPPING,
  [ModelEnum.ReceiptProduct]: RECEIPT_PRODUCT_MAPPING,
  [ModelEnum.Vendor]: VENDOR_MAPPING,
  [ModelEnum.VendorAddress]: VENDOR_ADDRESS_MAPPING,
  [ModelEnum.VendorOffer]: VENDOROFFER_MAPPING,
  [ModelEnum.VendorOfferProduct]: VENDOR_OFFER_PRODUCT_MAPPING,
  [ModelEnum.PurchaseNeed]: PURCHASE_NEED_MAPPING,
  [ModelEnum.PurchaseNeedAttachment]: PURCHASE_NEED_ATTACHMENT_MAPPING,
  [ModelEnum.Category]: CATEGORY_MAPPING,
  [ModelEnum.User]: USER_MAPPING,
  [ModelEnum.Role]: ROLE_MAPPING,
  [ModelEnum.ApplicantService]: APPLICANT_SERVICE_MAPPING,
  [ModelEnum.Company]: COMPANY_MAPPING,
  [ModelEnum.PurchaseNeedProduct]: PURCHASE_NEED_PRODUCT_MAPPING,
  [ModelEnum.Product]: PRODUCT_MAPPING,
  [ModelEnum.Step]: STEP_MAPPING,
  [ModelEnum.ValidationPath]: VALIDATION_PATH_MAPPING,
  [ModelEnum.Resource]: RESOURCE_MAPPING,
  [ModelEnum.Operation]: OPERATION_MAPPING,
  [ModelEnum.PurchaseOrderCategory]: PURCHASE_ORDER_CATEGORY_MAPPING,
  [ModelEnum.PurchaseOrderAttachment]: PURCHASE_ORDER_ATTACHMENT_MAPPING,
  [ModelEnum.ReceiptAttachment]: RECEIPT_ATTACHMENT_MAPPING,
  [ModelEnum.Component]: COMPONENT_MAPPING,
  [ModelEnum.PaymentModality]: PAYMENT_MODALITY_MAPPING,
  [ModelEnum.Invoice]: INVOICE_MAPPING,
  [ModelEnum.ProductSection]: PRODUCT_SECTION_MAPPING,
  [ModelEnum.ReceiptProductComponent]: RECEIPT_PRODUCT_COMPONENT_MAPPING,
  [ModelEnum.City]: CITY_MAPPING,
  [ModelEnum.Bloc]: BLOC_MAPPING,
  [ModelEnum.Service]: SERVICE_MAPPING,
  [ModelEnum.Clinic]: CLINIC_MAPPING,
  [ModelEnum.DeliveryDepot]: DELIVERY_DEPOT_MAPPING,
  [ModelEnum.ProductSectionBudget]: PRODUCT_SECTION_BUDGET_MAPPING,
  [ModelEnum.Budget]: BUDGET_MAPPING,
  [ModelEnum.BudgetExercise]: BUDGET_EXERCISE_MAPPING,
  [ModelEnum.Query]: QUERY_MAPPING,
  [ModelEnum.QueryParam]: QUERY_PARAM_MAPPING,
  [ModelEnum.InvoiceAttachment]: INVOICE_ATTACHMENT_MAPPING,
  [ModelEnum.PaymentTerm]: PAYMENT_TERM_MAPPING,
};

export type ListingState<M extends ModelEnum> = {
  selectedItems: Array<HydraItem<M>>;
} & Omit<Required<Params<M>>, "itemsPerPage"> &
  Pick<Params<M>, "itemsPerPage">;

export const getRecoilState = <M extends ModelEnum>({
  modelName,
  nestedColumName,
}: {
  modelName: M;
  nestedColumName?: string;
}) => {
  const { views } = MODEL_MAPPINGS[modelName];
  const { defaultState } = (views?.find(
    (view) => view.type === ViewEnum.Listing
  ) || DEFAULT_LISTING_VIEW) as ListingViewType<M>;

  let defaultValues: ListingState<M> = {
    mode: ListingModeEnum.Listing,
    itemsPerPage: 12,
    page: 1,
    filter: {
      operator: CompoundFilterOperator.And,
      filters: [],
    },
    basicFilter: {},
    sort: {},
    search: "",
    selectedItems: [],
    ...defaultState,
  };

  return atom<ListingState<M>>({
    key: `${modelName}.LISTING${nestedColumName ? `.${nestedColumName}` : ""}`,
    default: defaultValues,
  });
};
