import {CreateViewType, ModelMapping, UpdateViewType, ViewEnum} from '../../../_custom/types/ModelMapping'
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {CellContent} from '../../../_custom/ListingView/views/Table/BodyCell';
import {QUANTITY_STATUS_COLUMN} from '../PurchaseOrderProduct/Mapping';
import {BooleanField} from '../../../_custom/Column/Boolean/BooleanField';
import React from 'react';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';
import {ref} from 'yup';
import {NestedArrayField} from '../../../_custom/Column/Model/Nested/NestedArrayField';
import {DesiredProductModel} from '../DesiredProduct';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";
import {COMPLIANCE_STATUS_OPTIONS, ComplianceStatus} from "./Model";


const mapping: ModelMapping<ModelEnum.ReceiptProduct> = {
  modelName: ModelEnum.ReceiptProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      schema: schema => schema.when('id', {
        is: (id: number | undefined) => !!id,
        then: schema => schema.positive().max(ref('desiredProduct.quantity')),
        otherwise: schema => schema.when('desiredProduct', {
          is: ({id, status, restQuantity}: DesiredProductModel) => {
            if (id) return true

            return status !== QuantityStatusEnum.FullyReceived && restQuantity > 0
          },
          then: schema => schema.positive().max(ref('desiredProduct.restQuantity')),
        })
      })
      // schema: schema => schema.when('desiredProduct', {
      //   is: ({id, status, restQuantity}: DesiredProductModel) =>  {
      //     if (id) return true
      //
      //     return status !== QuantityStatusEnum.FullyReceived && restQuantity > 0
      //   },
      //   then: schema => schema.positive().max(ref('desiredProduct.restQuantity')),
      // })
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    received: {
      type: ColumnTypeEnum.Boolean,
      nullable: true
    },
    complianceUpdatedBy: {
      type: ColumnTypeEnum.String
    },
    complianceStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      nullable: true,
      options: COMPLIANCE_STATUS_OPTIONS,
    },
    complianceUpdatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    complianceReserve: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    receipt: {
      type: ModelEnum.Receipt
    },
    desiredProduct: {
      type: ModelEnum.DesiredProduct
    },
    components: {
      type: ModelEnum.ReceiptProductComponent,
      multiple: true,
      embeddedForm: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        quantity: true,
        // desiredProduct: true,
        note: true,
        complianceStatus: true,
        complianceReserve: true,
        // complianceUpdatedAt:true,
        complianceUpdatedBy: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: {
          render: ({item}) => (
            <div className='w-400px'>
              {item.desiredProduct.designation}
            </div>
          )
        },
        desiredProductQuantity: {
          render: ({item}) => item.desiredProduct.quantity
        },
        restQuantity: {
          render: ({item}) => item.desiredProduct.restQuantity
        },
        quantity: true,
        note: true,
        complianceStatus: {defaultValue: ComplianceStatus.None},
        complianceReserve: true,
        status: {
          render: ({item}) => {
            return (
              <CellContent
                {...QUANTITY_STATUS_COLUMN}
                value={item.desiredProduct.status}
              />
            );
          }
        },
        received: {
          render: ({fieldProps, item}) => (
            <BooleanField
              {...fieldProps}
              disabled={item.desiredProduct.status === QuantityStatusEnum.FullyReceived}
            />
          )
        },
        components: {
          render: ({fieldProps}) => {
            const view: CreateViewType<ModelEnum.ReceiptProductComponent> = {
              type: ViewEnum.Create,
              fields: {
                purchaseOrderProductComponent: {
                  render: ({item}) => (
                    <div className='text-truncate'>
                      {/*@ts-ignore*/}
                      {item.purchaseOrderProductComponent['@title']}
                    </div>
                  )
                },
                orderedQuantity: {
                  render: ({item}) => item.purchaseOrderProductComponent.quantity
                },
                restQuantity: {
                  render: ({item}) => item.restQuantity
                },
                quantity: true,
                status: {
                  render: ({item}) => {
                    return (
                      <CellContent
                        {...QUANTITY_STATUS_COLUMN}
                        value={item.purchaseOrderProductComponent.status}
                      />
                    );
                  }
                },
                received: {
                  render: ({fieldProps, item}) => (
                    <BooleanField
                      {...fieldProps}
                      disabled={item.purchaseOrderProductComponent.status === QuantityStatusEnum.FullyReceived}
                    />
                  )
                },
              }
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.ReceiptProductComponent}
                view={view}
                disableDelete
                disableInsert
                {...fieldProps}
              />
            );
          }
        }
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: {
          render: ({item}) => (
            <div className='w-400px'>
              {item.desiredProduct.designation}
            </div>
          )
        },
        desiredProductQuantity: {
          render: ({item}) => item.desiredProduct.quantity
        },
        restQuantity: {
          render: ({item}) => item.desiredProduct.quantity - item.quantity
        },
        quantity: true,
        note: true,
        status: {
          render: ({item}) => {
            return (
              <CellContent
                {...QUANTITY_STATUS_COLUMN}
                value={item.desiredProduct.status}
              />
            );
          }
        },
        components: {
          render: ({fieldProps}) => {
            const view: UpdateViewType<ModelEnum.ReceiptProductComponent> = {
              type: ViewEnum.Update,
              fields: {
                purchaseOrderProductComponent: {
                  render: ({item}) => (
                    <div className='text-truncate'>
                      {/*@ts-ignore*/}
                      {item.purchaseOrderProductComponent['@title']}
                    </div>
                  )
                },
                orderedQuantity: {
                  render: ({item}) => item.purchaseOrderProductComponent.quantity
                },
                restQuantity: {
                  render: ({item}) => item.restQuantity
                },
                quantity: true,
                status: {
                  render: ({item}) => {
                    return (
                      <CellContent
                        {...QUANTITY_STATUS_COLUMN}
                        value={item.purchaseOrderProductComponent.status}
                      />
                    );
                  }
                },
                received: {
                  render: ({fieldProps, item}) => (
                    <BooleanField
                      {...fieldProps}
                      disabled={item.purchaseOrderProductComponent.status === QuantityStatusEnum.FullyReceived}
                    />
                  )
                },
              }
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.ReceiptProductComponent}
                view={view}
                disableDelete
                disableInsert
                {...fieldProps}
              />
            );
          }
        }
      }
    }
  ]
};

export default mapping;
