import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {CREATED_AT_COLUMN} from '../columns';
import {RouteKeyEnum} from '../Route/Model';
import {DraftOrderStatusEnum, PriorityEnum} from './Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {NestedArrayField} from '../../../_custom/Column/Model/Nested/NestedArrayField';
import React, {useState} from 'react';
import {Input} from '../../../_custom/Column/String/InputBase/Input';
import {Button} from '../../../_custom/components/Button';
import {read} from 'xlsx';


const LinesField = () => {
  const [file, setFile] = useState<File>();


  return (
    <>
      <div className='d-flex gap-5 mb-3'>
        <Input
          type='file'
          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          onChange={event => {
            const file = event.target.files?.[0];
            setFile(file);

            // if(file) {
            //   file.arrayBuffer().then(file => {
            //     setFile('workbook', file);
            //   });
            // } else {
            //   // setFieldValue('workbook', undefined);
            // }

          }}
        />
        <Button
          variant='light-primary'
          disabled={!file}
          onClick={() => {
            if (file) {
              const workbook = read(file, { dateNF: 'yyyy-mm-dd' });
              console.log(workbook)
            }}
          }
        >
          Importer
        </Button>
      </div>
      <NestedArrayField
        modelName={ModelEnum.DraftOrderLine}
        name='lines'
      />
    </>
  );
};

const mapping: ModelMapping<ModelEnum.DraftOrder> = {
  modelName: ModelEnum.DraftOrder,
  icon: '/technology/teh005.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    orderNumber: {
      type: ColumnTypeEnum.String
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    orderedFor: {
      type: ColumnTypeEnum.String
    },
    buyerFullName: {
      type: ColumnTypeEnum.String
    },
    recommendedVendors: {
      type: ColumnTypeEnum.Array
    },
    createdAt: CREATED_AT_COLUMN,
    isRegularized: {
      type: ColumnTypeEnum.Boolean
    },
    validationPath: {
      type: ColumnTypeEnum.String
    },
    priority: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        {id: PriorityEnum.Normal, color: 'primary'},
        {id: PriorityEnum.Urgent, color: 'danger'},
      ]
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        {id: DraftOrderStatusEnum.Open, color: 'primary'},
        {id: DraftOrderStatusEnum.Confirmed, color: 'info'},
        {id: DraftOrderStatusEnum.PurchaseConfirmed, color: 'success'},
        {id: DraftOrderStatusEnum.Cancelled, color: 'warning'}
      ]
    },
    createdBy: {
      type: ModelEnum.User,
    },
    project: {
      type: ModelEnum.Project,
    },
    company: {
      type: ModelEnum.Company,
    },
    receptionManager: {
      type: ModelEnum.User,
    },
    category: {
      type: ModelEnum.Category,
    },
    applicantService: {
      type: ModelEnum.ApplicantService,
    },
    lines: {
      type: ModelEnum.DraftOrderLine,
      multiple: true,
      embeddedForm: true
    },
    attachments: {
      type: ModelEnum.DraftOrderAttachment,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.DraftOrderListing,
      columns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      },
      filterColumns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.DraftOrderDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.DraftOrderDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.DraftOrderCreate,
      fields: {
        priority: {
          defaultValue: PriorityEnum.Normal
        },
        createdAt: true,
        desiredDeliveryDate: true,
        description: true,
        company: true,
        orderedFor: true,
        applicantService: true,
        buyerFullName: true,
        // validationPath: {
        //   render: ({item})=>(
        //     <div>
        //       {item.validationPath}
        //     </div>
        //   )
        // },
        project: true,
        isRegularized: true,
        attachments: true,
        receptionManager: true,
        // recommendedVendors: true,
        lines: {
          render: LinesField
        },
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.DraftOrderUpdate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put
    }
  ]
};

export default mapping;
