import { ModelMapping } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING, ABSTRACT_IMAGE_LISTING_VIEW } from '../columns';
import { toAbsoluteApi } from '../utils';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { NumberFormat } from '../../../_custom/Column/Number/NumberColumn';


export const ABSTRACT_IMAGE_MAPPING: Omit<ModelMapping<any>, 'recoilState' | 'modelName'> = {
  ...ABSTRACT_FILE_MAPPING,
  icon: '/communication/com005.svg',
  columnDef: {
    preview: {
      type: ColumnTypeEnum.String
    },
    ...ABSTRACT_FILE_MAPPING.columnDef,
    dimensions: {
      type: ColumnTypeEnum.Array,
      separator: 'x'
    }
  },
  views: [
    {
      ...ABSTRACT_FILE_LISTING_VIEW,
      columns: {
        preview: {
          render: ({ item: { contentUrl } }) => (
            <>
              {
                contentUrl && (
                  <div className='symbol symbol-50px bg-light'>
                    <img src={toAbsoluteApi(contentUrl)} alt='' />
                  </div>
                )
              }
            </>
          )
        },
        ...ABSTRACT_FILE_LISTING_VIEW.columns,
        dimensions: true
      }
    }
  ]
};

const mapping: ModelMapping<ModelEnum.VendorImage> = {
  modelName: ModelEnum.VendorImage,
  icon: '/communication/com005.svg',
  uploadable: true,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    preview: {
      type: ColumnTypeEnum.String
    },
    fileName: {
      type: ColumnTypeEnum.String
    },
    originalName: {
      type: ColumnTypeEnum.String
    },
    mimeType: {
      type: ColumnTypeEnum.String
    },
    size: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.DecimalUnit
    },
    sortIndex: {
      type: ColumnTypeEnum.Number
    },
    dimensions: {
      type: ColumnTypeEnum.Array,
      separator: 'x'
    },
    contentUrl: {
      type: ColumnTypeEnum.String
    },
    vendor: {
      type: ModelEnum.Vendor
    }
  },
  views: [
    ABSTRACT_IMAGE_LISTING_VIEW
  ]
};

export default mapping;