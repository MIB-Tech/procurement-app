import { TableViewColumnMapping } from './TableView';
import { Trans } from '../../../components/Trans';
import { stringToI18nMessageKey } from '../../../utils';
import { Model } from '../../../types/ModelMapping';
import { ModelEnum } from '../../../../app/modules/types';


type TitleContentProps<M extends ModelEnum> = {
  columnName: keyof Model<M> | string
} & Pick<TableViewColumnMapping<M>, 'title'>
export const TitleContent = <M extends ModelEnum>({ title, columnName }: TitleContentProps<M>) => {

  return (
    <Trans id={title || stringToI18nMessageKey(columnName.toString())} />
  )
}


