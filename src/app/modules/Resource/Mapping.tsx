import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Resource> = {
  modelName: ModelEnum.Resource,
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
    icon: {
      type: ColumnTypeEnum.String
    },
    sortIndex: {
      type: ColumnTypeEnum.Number
    },
    operations: {
      type: ModelEnum.Operation,
      multiple: true
    }
  },
  views:[
    {
      type:ViewEnum.Listing,
      columns:{
        operations:true,
      }
    },
    {
      type:ViewEnum.Create,
      fields:{
        name:true,
        icon:true,
        operations:true,
        sortIndex:true
      }
    },
    {
      type:ViewEnum.Update,
      fields:{
        name:true,
        icon:true,
        operations:true,
        sortIndex:true
      }
    },
    {
      type:ViewEnum.Detail,
      columns:{
        icon:true,
        operations:true,
        sortIndex:true
      }
    }
  ]
};
export default mapping;
