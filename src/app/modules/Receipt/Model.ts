import {AbstractModel} from '../../../_custom/types/types';
import {ReceiptProductModel} from '../ReceiptProduct';
import {VendorModel} from '../Vendor';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {LineType, PurchaseOrderPrint} from '../PurchaseOrder/Model';
import {PaymentModalityModel} from '../PaymentModality';


type Model = {
  receiptNumber: string
  receivedAt?: string
  externalRef?: string
  receiptProducts: Array<ReceiptProductModel>
  readonly vendor: VendorModel
  readonly paymentModality: PaymentModalityModel
  readonly purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel

export type ReceiptLineProductPrint = {
  type: LineType.Product
  reference: string
  name: string
} & Pick<ReceiptProductModel, 'quantity' | 'desiredProductQuantity'>
export type ReceiptLineComponentPrint = {
  type: LineType.Component
} & Omit<ReceiptLineProductPrint, 'type'>
export type ReceiptPrintLine = ReceiptLineProductPrint | ReceiptLineComponentPrint
export type ReceiptPrint = {
  lines: Array<ReceiptPrintLine>
} & Pick<Model, 'receiptNumber' | 'receivedAt'>
  & Pick<PurchaseOrderPrint, 'vendor' | 'address' | 'paymentModality' | 'comment'>

// const EXAMPLE: ReceiptPrint = {
//   'address': '',
//   'comment': '',
//   'paymentModality': {
//     'name': 'Example'
//   },
//   'receiptNumber': 'BR-2023/000001',
//   'receivedAt': '07/01/2024',
//   'vendor': {
//     'name': 'ULTRANET MULTIMEDIA',
//     'phoneNumber': '',
//     'defaultAddress': {
//       'postalCode': '',
//       'address': 'MARRAKECH-MAROC',
//     }
//   },
//   'lines': [
//     {
//       'reference': '01',
//       'name': 'PORTOIR PIPETTE ESR',
//       'quantity': 18,
//       'desiredProductQuantity': 18,
//     },
//     {
//       'reference': '01',
//       'name': 'PORTOIR PIPETTE ESR',
//       'quantity': 18,
//       'desiredProductQuantity': 18,
//     },
//     {
//       'reference': '01',
//       'name': 'PORTOIR PIPETTE ESR',
//       'quantity': 18,
//       'desiredProductQuantity': 18,
//     },
//   ]
// };

export default Model;