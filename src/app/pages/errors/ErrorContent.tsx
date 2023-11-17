import { FC } from 'react';
import { Trans, useTrans } from '../../../_custom/components/Trans';
import { useParams } from 'react-router-dom';


type ErrorCode = '403' | '404' | '500'
const ErrorContent: FC = () => {
  const values = useParams<{ code: ErrorCode }>();
  const { trans } = useTrans();

  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>
        <Trans id='ERROR_PAGE.TITLE' values={values} />
        {/*Page Not Found*/}
      </h1>

      <div
        className='fw-bold fs-3 text-gray-400 mb-15'
        dangerouslySetInnerHTML={{__html: trans({id: 'ERROR_PAGE.DESCRIPTION', values})}}
      />
    </>
  )
}

export {ErrorContent}
