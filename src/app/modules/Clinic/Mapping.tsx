import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';



const mapping: ModelMapping<ModelEnum.Clinic> = {
  modelName: ModelEnum.Clinic,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    },
    abbreviation: {
      type: ColumnTypeEnum.String,
      length: 3,
      uppercase: true
    },
    address: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    ice: {
      type: ColumnTypeEnum.String
    },
    if: {
      type: ColumnTypeEnum.String
    },
    cnss: {
      type: ColumnTypeEnum.String
    },
    users: {
      type: ModelEnum.User,
      multiple: true
    },
    city: {
      type: ModelEnum.City
    },
    services: {
      type: ModelEnum.Service,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        if: true,
        cnss: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        if: true,
        cnss: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        if: true,
        cnss: true
      }
    },
  ]
};
export default mapping;