import { AbstractImageModel } from '../AssetModel/Model';
import { WorkOrderImageModel } from './index';


type Model = {
  workOrder: WorkOrderImageModel
} & AbstractImageModel

export default Model;