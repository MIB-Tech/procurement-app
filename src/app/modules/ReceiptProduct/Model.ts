import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';
import {ReceiptProductComponentModel} from '../ReceiptProductComponent';
import {StringSelectOption} from "../../../_custom/Column/String/StringColumn";

export enum ComplianceStatus {
  Aucun = 'Aucun',
  Conforme = 'Conforme',
  ConformeAvecReserve = 'Conforme avec reserve'
}

export const COMPLIANCE_STATUS_OPTIONS: Array<StringSelectOption> = [
  {id: ComplianceStatus.Aucun, color: 'warning'},
  {id: ComplianceStatus.Conforme, color: 'primary'},
  {id: ComplianceStatus.ConformeAvecReserve, color: 'success'},
];
type Model = {
  quantity: number
  note: string
  complianceStatus?: ComplianceStatus
  complianceUpdatedAt: string
  complianceUpdatedBy: string
  complianceReserve: string
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
  components: Array<ReceiptProductComponentModel>
  readonly desiredProductQuantity: number
  readonly restQuantity: number
  readonly received: number
} & AbstractModel

export default Model;