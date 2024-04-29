import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';
import {ReceiptProductComponentModel} from '../ReceiptProductComponent';
import {StringSelectOption} from "../../../_custom/Column/String/StringColumn";
import {UserModel} from "../User";

export enum ComplianceStatus {
  None = 'NONE',
  Conform = 'CONFORM',
  ConformWithReserve = 'CONFORM_WITH_RESERVE'
}

export const COMPLIANCE_STATUS_OPTIONS: Array<StringSelectOption> = [
  {id: ComplianceStatus.None, color: 'warning'},
  {id: ComplianceStatus.Conform, color: 'primary'},
  {id: ComplianceStatus.ConformWithReserve, color: 'success'},
];

type Model = {
  quantity: number
  note: string
  complianceStatus?: ComplianceStatus
  complianceUpdatedAt: UserModel
  complianceUpdatedBy: string
  complianceReserve: string
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
  components: Array<ReceiptProductComponentModel>
  readonly received: number
} & AbstractModel

export default Model;