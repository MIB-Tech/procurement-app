import {USER_MAPPING} from './User';
import {ROLE_MAPPING} from './Role';
import {CATEGORY_MAPPING} from './Category';
import {PURCHASE_NEED_MAPPING} from './PurchaseNeed';
import {PURCHASE_NEED_ATTACHMENT_MAPPING} from './PurchaseNeedAttachment';
import {atomFamily} from 'recoil';
import {ListingModeEnum, Params} from '../../_custom/ListingView/ListingView.types';
import {CompoundFilterOperator} from '../../_custom/ListingView/Filter/Filter.types';
import {ColumnTypeEnum, Mapping} from '../../_custom/types/types';
import {ModelEnum} from './types';
import {ViewEnum} from '../../_custom/types/ModelMapping';
import {APPLICANT_SERVICE_MAPPING} from './ApplicantService';
import {COMPANY_MAPPING} from './Company';
import {PURCHASE_NEED_PRODUCT_MAPPING} from './PurchaseNeedProduct';
import {PRODUCT_MAPPING} from './Product';
import {PROJECT_MAPPING} from './Project';
import {STEP_MAPPING} from './Step';
import {VALIDATION_PATH_MAPPING} from './ValidationPath';
import {LOCATION_MAPPING} from './Location';
import {RESOURCE_MAPPING} from './Resource';
import {OPERATION_MAPPING} from './Operation';
import {HydraItem} from '../../_custom/types/hydra.types';
import {VENDOR_CONTACT_MAPPING} from './VendorContact';
import {VENDOR_MAPPING} from './Vendor';
import {CURRENCY_MAPPING} from './Currency';
import {PURCHASEFILETYPE_MAPPING} from "./PurchaseFileType";


export const MODEL_MAPPINGS: Mapping = {
  [ModelEnum.Currency]: CURRENCY_MAPPING,
  [ModelEnum.DesiredProduct]: {
    modelName: ModelEnum.DesiredProduct,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.Discount]: {
    modelName: ModelEnum.Discount,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.PurchaseFile]: {
    modelName: ModelEnum.PurchaseFile,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.PurchaseFileProduct]: {
    modelName: ModelEnum.PurchaseFileProduct,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.PurchaseFileType]: PURCHASEFILETYPE_MAPPING,
  [ModelEnum.PurchaseOrder]: {
    modelName: ModelEnum.PurchaseOrder,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.PurchaseOrderProduct]: {
    modelName: ModelEnum.PurchaseOrderProduct,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.Receipt]: {
    modelName: ModelEnum.Receipt,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.ReceiptProduct]: {
    modelName: ModelEnum.ReceiptProduct,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.Vendor]: VENDOR_MAPPING,
  [ModelEnum.VendorContact]: VENDOR_CONTACT_MAPPING,
  [ModelEnum.VendorOffer]: {
    modelName: ModelEnum.VendorOffer,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.VendorOfferProduct]: {
    modelName: ModelEnum.VendorOfferProduct,
    columnDef: {id: {type: ColumnTypeEnum.Number}, uid: {type: ColumnTypeEnum.String}}
  },
  [ModelEnum.PurchaseNeed]: PURCHASE_NEED_MAPPING,
  [ModelEnum.PurchaseNeedAttachment]: PURCHASE_NEED_ATTACHMENT_MAPPING,
  [ModelEnum.Category]: CATEGORY_MAPPING,
  [ModelEnum.User]: USER_MAPPING,
  [ModelEnum.Role]: ROLE_MAPPING,
  [ModelEnum.ApplicantService]: APPLICANT_SERVICE_MAPPING,
  [ModelEnum.Company]: COMPANY_MAPPING,
  [ModelEnum.PurchaseNeedProduct]: PURCHASE_NEED_PRODUCT_MAPPING,
  [ModelEnum.Product]: PRODUCT_MAPPING,
  [ModelEnum.Project]: PROJECT_MAPPING,
  [ModelEnum.Step]: STEP_MAPPING,
  [ModelEnum.ValidationPath]: VALIDATION_PATH_MAPPING,
  [ModelEnum.Location]: LOCATION_MAPPING,
  [ModelEnum.Resource]: RESOURCE_MAPPING,
  [ModelEnum.Operation]: OPERATION_MAPPING
};

type ListingState = {
  selectedItems: Array<HydraItem>
} & Omit<Required<Params<any>>, 'itemsPerPage'>
  & Pick<Params<any>, 'itemsPerPage'>

export const LISTING_FAMILY = atomFamily<ListingState, { modelName: ModelEnum, embedded?: boolean, view?: ViewEnum }>({
  key: 'LISTING_FAMILY',
  default: ({modelName, embedded}) => {
    let defaultValues: ListingState = {
      mode: ListingModeEnum.Listing,
      itemsPerPage: 12,
      page: 1,
      filter: {
        operator: CompoundFilterOperator.And,
        filters: []
      },
      basicFilter: {},
      sort: {},
      search: '',
      selectedItems: []
    };

    switch (modelName) {
      case ModelEnum.Category:
        if (!embedded) {
          defaultValues = {
            ...defaultValues,
            filter: {
              operator: CompoundFilterOperator.And,
              filters: []
            }
          };
        }

        break;
      // case ModelEnum.PurchaseNeed:
      //   defaultValues = {
      //     ...defaultValues,
      //     sort: {
      //       createdAt: 'desc'
      //     }
      //   };
      //   break;
      default:
        break;
    }

    return defaultValues;
  }
});