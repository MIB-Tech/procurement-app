import { CategoryModel } from '../Category';
import { ManufacturerModel } from '../Manufacturer';
import { AssetTypeModel } from '../AssetType';
import { AssetModel } from '../Asset';
import { AssetModelModel } from './index';
import { AbstractModel } from '../../../_custom/types/types';


export type AbstractFileModel = {
  readonly contentUrl?: string
  readonly fileName?: string
  readonly size?: number
  readonly originalName?: string
  readonly mimeType?: string
} & AbstractModel

export type AbstractImageModel = {
  readonly preview?: string
  sortIndex: number
  readonly dimensions?: [number, number]
} & AbstractFileModel

type AssetModelAttachmentModel = {
  assetModel: AssetModel
} & AbstractFileModel

type AssetModelImageModel = {
  assetModel: AssetModelModel
} & AbstractImageModel

type Model = {
  model: string
  description?: string
  manufacturer: ManufacturerModel
  assetType: AssetTypeModel
  assets: Array<AssetModel>
  images: Array<AssetModelImageModel>
  attachments: Array<AssetModelAttachmentModel>
} & AbstractModel

export default Model;