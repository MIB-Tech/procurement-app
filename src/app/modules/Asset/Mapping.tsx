import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { NumberFormat } from '../../../_custom/Column/Number/NumberColumn';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { AssetTimeline } from './components/AssetTimeline';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { RoleKeyEnum } from '../Role/Model';
import { toAbsoluteApi } from '../utils';
import { Trans } from '../../../_custom/components/Trans';
import { relation } from '../../../_custom/yup';
import { ModelCell } from '../../../_custom/ListingView/TableView/ModelCell';
import { Bullet } from '../../../_custom/components/Bullet';
import { HydraItem } from '../../../_custom/types/hydra.types';
import clsx from 'clsx';
import { string } from 'yup';


export const INVENTORY_NUMBER_ALLOW_UPDATE = [RoleKeyEnum.Responsible, RoleKeyEnum.SuperAdmin];

const mapping: ModelMapping<ModelEnum.Asset> = {
  modelName: ModelEnum.Asset,
  icon: '/technology/teh009.svg',
  hydraTitle: item => (
    <div className={clsx(item.invalidInventoryNumber ? 'text-danger' : 'text-muted')}>
      {item['@title']}
    </div>
  ),
  hydraSubtitle: item => (
    <div className='text-truncate'>
      {item['@subTitle']}
    </div>
  ),
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    inventoryNumber: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Qrcode,
      schema: string().matches(/[A-Z]{3}-[A-Z]{2}-[0-9]{4}$/, { message: { id: 'VALIDATION.MIXED.INVALID' } }),
      nullable: true
    },
    service: {
      type: ModelEnum.Service
    },
    assetModel: {
      type: ModelEnum.AssetModel
    },
    vendor: {
      type: ModelEnum.Vendor
    },
    serialNumber: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    purchasePriceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Currency,
      nullable: true
    },
    installedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      title: 'INSTALLATION_TIME',
      nullable: true
    },
    guaranteeExpiryAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      title: 'GUARANTEED_END_DATE',
      nullable: true
    },
    underContract: {
      type: ColumnTypeEnum.Boolean,
      nullable: true
    },
    invalidInventoryNumber: {
      type: ColumnTypeEnum.Boolean,
    },
    contract: {
      type: ModelEnum.Contract,
      nullable: true,
      schema: relation().when('underContract', {
        is: true,
        then: schema => schema.nullable().required(),
        otherwise: schema => schema.nullable()
      })
    },
    modelImage: {
      type: ModelEnum.AssetModelImage,
      nullable: true,
      title: 'IMAGE'
    },
    workOrders: {
      type: ModelEnum.WorkOrder,
      multiple: true
    },
    events: {
      type: ModelEnum.Event,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.AssetListing,
      filterColumns: {
        'assetModel.assetType': {
          display: ({ user }) => !user.location
        },
        vendor: true,
        assetModel: true,
        service: true,
        inventoryNumber: true,
        underContract: true,
        serialNumber: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        contract: true,
        'service.location': {
          display: ({user}) => !user.location
        },

        'assetModel.assetType.category': true
      },
      columns: {
        service: true,
        assetModel: true,
        vendor: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        underContract: true,
        contract: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.AssetDetail,
      columns: {
        timeline: {
          as: 'TAB',
          render: ({ item }) => <AssetTimeline id={item.id} />
        },
        modelImage: {
          render: ({ item }) => {
            const contentUrl = item.modelImage?.contentUrl;
            const originalName = item.modelImage?.originalName;

            return (
              <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px'>
                {contentUrl ?
                  <img className='mw-50px mw-lg-75px' src={toAbsoluteApi(contentUrl)} alt={originalName} /> :
                  <Trans id='NO_IMAGE' />
                }
              </div>
            );
          }
        },
        inventoryNumber: true,
        service: true,
        assetModel: true,
        'assetModel.assetType': {
          render: ({item}) => {
            const {assetType} = item.assetModel

            return assetType ?
              <ModelCell item={assetType as HydraItem} />:
              <Bullet />
          }
        },
        vendor: true,
        workOrders: true,
        serialNumber: true,
        purchasePriceExclTax: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        underContract: true,
        contract: {
          display: ({ item }) => item.underContract
        },
        events: true,
      }
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.AssetDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.AssetCreate,
      fields: {
        service: true,
        assetModel: true,
        vendor: true,
        serialNumber: true,
        purchasePriceExclTax: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        underContract: true,
        contract: {
          display: ({ item: { underContract } }) => underContract
        }
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.AssetUpdate,
      fields: {
        inventoryNumber: true,
        service: true,
        assetModel: true,
        vendor: true,
        serialNumber: true,
        purchasePriceExclTax: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        underContract: true,
        contract: {
          display: ({ item: { underContract } }) => underContract
        }
      }
    },
    {
      type: ViewEnum.Import,
      routeKey: RouteKeyEnum.AssetImport,
      columns: {
        inventoryNumber: true,
        service: true,
        assetModel: true,
        vendor: true,
        serialNumber: true,
        purchasePriceExclTax: true,
        installedAt: true,
        guaranteeExpiryAt: true,
        underContract: true,
        contract: true
      }
    }
  ]
};

export default mapping;
