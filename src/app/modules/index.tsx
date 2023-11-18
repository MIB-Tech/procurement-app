import {USER_MAPPING} from './User';
import {ROLE_MAPPING} from './Role';
import {ROUTE_MAPPING} from './Route';
import {CATEGORY_MAPPING} from './Category';
import {DRAFT_ORDER_MAPPING} from './DraftOrder';
import {DRAFT_ORDER_ATTACHMENT_MAPPING} from './DraftOrderAttachment';
import {atomFamily} from 'recoil';
import {Params} from '../../_custom/ListingView/ListingView.types';
import {CompoundFilterOperator} from '../../_custom/ListingView/Filter/Filter.types';
import {Mapping} from '../../_custom/types/types';
import {ModelEnum} from './types';
import {ViewEnum} from '../../_custom/types/ModelMapping';
import {CalendarParams} from '../../_custom/CalendarView/CalendarView.types';
import {APPLICANT_SERVICE_MAPPING} from './ApplicantService';
import {COMPANY_MAPPING} from './Company';
import {DRAFT_ORDER_LINE_MAPPING} from './DreaftOrderLine';
import {PRODUCT_MAPPING} from './Product';
import {PROJECT_MAPPING} from './Project';


export const MODEL_MAPPINGS: Mapping = {
  [ModelEnum.DraftOrder]: DRAFT_ORDER_MAPPING,
  [ModelEnum.DraftOrderAttachment]: DRAFT_ORDER_ATTACHMENT_MAPPING,
  [ModelEnum.Category]: CATEGORY_MAPPING,
  [ModelEnum.User]: USER_MAPPING,
  [ModelEnum.Role]: ROLE_MAPPING,
  [ModelEnum.Route]: ROUTE_MAPPING,
  //
  [ModelEnum.ApplicantService]: APPLICANT_SERVICE_MAPPING,
  [ModelEnum.Company]: COMPANY_MAPPING,
  [ModelEnum.DraftOrderLine]: DRAFT_ORDER_LINE_MAPPING,
  [ModelEnum.Product]: PRODUCT_MAPPING,
  [ModelEnum.Project]: PROJECT_MAPPING,
};

export const LISTING_FAMILY = atomFamily<Required<Params<any>>,{modelName: ModelEnum, embedded?: boolean, view?: ViewEnum} >({
  key: 'LISTING_FAMILY',
  default: ({ modelName, embedded }) => {
    let defaultValues: Required<Params<any>> = {
      itemsPerPage: 10,
      page: 1,
      filter: {
        operator: CompoundFilterOperator.And,
        filters: []
      },
      sort: {},
      search: ''
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
      // case ModelEnum.DraftOrder:
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

export const CALENDAR_FAMILY = atomFamily<Required<CalendarParams<any>>,{modelName: ModelEnum} >({
  key: 'CALENDAR_FAMILY',
  default: ({ modelName }) => {
    let defaultValues: Required<CalendarParams<any>> = {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: []
      },
      search: ''
    };

    return defaultValues;
  }
});