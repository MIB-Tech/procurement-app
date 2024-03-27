import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping'
import {ColumnTypeEnum} from '../../../_custom/types/types'
import {ModelEnum} from '../types'
import {NestedArrayField} from '../../../_custom/Column/Model/Nested/NestedArrayField'
import {StringFormat} from '../../../_custom/Column/String/StringColumn'
import {FieldProps} from '../../../_custom/Column/controls/fields'
import {useField} from 'formik'
import {useEffect} from 'react'
import {QueryParamModel} from '../QueryParam'

const getQueryParams = (query: string) => {
  const params = []
  const regex = /:(\w+)/g
  let match

  while ((match = regex.exec(query)) !== null) {
    params.push(match[1])
  }

  return params
}


const ParamsField = ({...props}: FieldProps) => {
  const [{value: queryString}] = useField<string>({name: 'queryString'})
  const [{value: params}, , {setValue: setParams}] = useField<Array<Partial<QueryParamModel>>>({name: props.name})

  useEffect(() => {
    // Get new params from the query string
    const newParams = getQueryParams(queryString).map(queryParam => ({
      label: '',
      name: queryParam,
      paramType: ColumnTypeEnum.String,
    } as Partial<QueryParamModel>));

    // Check for new parameters and add them
    let updatedParams = [...params];
    newParams.forEach(newParam => {
      if (!updatedParams.some(param => param.name === newParam.name)) {
        updatedParams.push(newParam);
      }
    });

    // Check for deleted parameters and remove them
    updatedParams = updatedParams.filter(param =>
      newParams.some(newParam => newParam.name === param.name)
    );

    // Update state with the updated parameters
    setParams(updatedParams).then(() => {});
  }, [queryString])

  return (
    <NestedArrayField
      {...props}
      modelName={ModelEnum.QueryParam}
      disableInsert
      disableDelete
    />
  )
}

const mapping: ModelMapping<ModelEnum.Query> = {
  modelName: ModelEnum.Query,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    queryString: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
    },
    params: {
      type: ModelEnum.QueryParam,
      multiple: true,
      embeddedForm: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        queryString: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        queryString: true,
        params: {
          render: ({fieldProps}) => <ParamsField {...fieldProps} />,
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        queryString: true,
        params: {
          render: ({fieldProps}) => <ParamsField {...fieldProps} />,
        },
      },
    },
  ],
}

export default mapping
