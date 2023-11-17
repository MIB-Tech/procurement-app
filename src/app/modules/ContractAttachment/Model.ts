import { ContractAttachmentModel } from './index';
import { AbstractFileModel } from '../AssetModel/Model';


type Model = {
  contract: ContractAttachmentModel
} & AbstractFileModel

export default Model;