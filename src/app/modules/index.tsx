import React from 'react';
import { USER_MAPPING } from './User';
import { ROLE_MAPPING } from './Role';
import { LOCATION_MAPPING } from './Location';
import { TEAM_MAPPING } from './Team';
import { ROUTE_MAPPING } from './Route';
import { ASSET_MAPPING } from './Asset';
import { ASSET_MODEL_MAPPING } from './AssetModel';
import { ASSET_TYPE_MAPPING } from './AssetType';
import { CATEGORY_MAPPING } from './Category';
import { CONTRACT_MAPPING } from './Contract';
import { MANUFACTURER_MAPPING } from './Manufacturer';
import { SERVICE_MAPPING } from './Service';
import { VENDOR_MAPPING } from './Vendor';
import { WORK_ORDER_MAPPING } from './WorkOrder';
import { VENDOR_CONTACT_MAPPING } from './VendorContact';
import { VENDOR_ATTACHMENT_MAPPING } from './VendorAttachment';
import { VENDOR_IMAGE_MAPPING } from './VendorImage';
import { WORK_ORDER_ATTACHMENT_MAPPING } from './WorkOrderAttachment';
import { WORK_ORDER_IMAGE_MAPPING } from './WorkOrderImage';
import { INTERVENTION_MAPPING } from './Intervention';
import { INTERVENTION_ATTACHMENT_MAPPING } from './InterventionAttachment';
import { PART_MAPPING } from './Part';
import { ASSET_MODEL_ATTACHMENT_MAPPING } from './AssetModelAttachment';
import { ASSET_MODEL_IMAGE_MAPPING } from './AssetModelImage';
import { CONTRACT_ATTACHMENT_MAPPING } from './ContractAttachment';
import { WORK_ORDER_LOG_MAPPING } from './WorkOrderLog';
import { atomFamily } from 'recoil';
import { Params } from '../../_custom/ListingView/ListingView.types';
import { CompoundFilterOperator, PropertyFilterOperator } from '../../_custom/ListingView/Filter/Filter.types';
import { Mapping } from '../../_custom/types/types';
import { ModelEnum } from './types';
import { SERVICE_TYPE_MAPPING } from './ServiceType';
import { ViewEnum } from '../../_custom/types/ModelMapping';
import { CalendarParams } from '../../_custom/CalendarView/CalendarView.types';
import { EVENT_MAPPING } from './Event';


export const MODEL_MAPPINGS: Mapping = {
  [ModelEnum.Event]: EVENT_MAPPING,
  [ModelEnum.AssetModelAttachment]: ASSET_MODEL_ATTACHMENT_MAPPING,
  [ModelEnum.AssetModelImage]: ASSET_MODEL_IMAGE_MAPPING,
  [ModelEnum.ContractAttachment]: CONTRACT_ATTACHMENT_MAPPING,
  [ModelEnum.Intervention]: INTERVENTION_MAPPING,
  [ModelEnum.InterventionAttachment]: INTERVENTION_ATTACHMENT_MAPPING,
  [ModelEnum.Part]: PART_MAPPING,
  [ModelEnum.VendorAttachment]: VENDOR_ATTACHMENT_MAPPING,
  [ModelEnum.VendorContact]: VENDOR_CONTACT_MAPPING,
  [ModelEnum.VendorImage]: VENDOR_IMAGE_MAPPING,
  [ModelEnum.WorkOrder]: WORK_ORDER_MAPPING,
  [ModelEnum.WorkOrderAttachment]: WORK_ORDER_ATTACHMENT_MAPPING,
  [ModelEnum.WorkOrderImage]: WORK_ORDER_IMAGE_MAPPING,
  [ModelEnum.WorkOrderLog]: WORK_ORDER_LOG_MAPPING,
  [ModelEnum.Asset]: ASSET_MAPPING,
  [ModelEnum.AssetModel]: ASSET_MODEL_MAPPING,
  [ModelEnum.AssetType]: ASSET_TYPE_MAPPING,
  [ModelEnum.Category]: CATEGORY_MAPPING,
  [ModelEnum.Contract]: CONTRACT_MAPPING,
  [ModelEnum.Manufacturer]: MANUFACTURER_MAPPING,
  [ModelEnum.Service]: SERVICE_MAPPING,
  [ModelEnum.ServiceType]: SERVICE_TYPE_MAPPING,
  [ModelEnum.Vendor]: VENDOR_MAPPING,
  [ModelEnum.User]: USER_MAPPING,
  [ModelEnum.Role]: ROLE_MAPPING,
  [ModelEnum.Location]: LOCATION_MAPPING,
  [ModelEnum.Team]: TEAM_MAPPING,
  [ModelEnum.Route]: ROUTE_MAPPING
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
              filters: [
                {
                  property: 'parent',
                  operator: PropertyFilterOperator.IsNull
                }
              ]
            }
          };
        }

        break;
      case ModelEnum.WorkOrder:
        defaultValues = {
          ...defaultValues,
          sort: {
            createdAt: 'desc'
          }
        };
        break;
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