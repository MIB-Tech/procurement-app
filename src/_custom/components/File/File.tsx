import React, {FC, HTMLAttributes, useCallback} from 'react'
import {DefaultExtensionType, defaultStyles, FileIcon} from 'react-file-icon'
import clsx from 'clsx'
import axios from 'axios'
import {IconButton} from '../Button/IconButton'
import LazyLoad from 'react-lazyload'
import {HydraItem} from '../../types/hydra.types'
import {toAbsoluteApi} from '../../../app/modules/utils'
import {bytesToSize, fileUtils} from './File.utils'

export type FileProps = {
  file: HydraItem
  isUploading?: boolean
  onDelete?: (file: HydraItem) => void
} & HTMLAttributes<HTMLDivElement>

export const File: FC<FileProps> = ({file, isUploading, onDelete, className}) => {
  const {contentUrl, size, mimeType, '@title': fileName} = file
  const preview = mimeType?.startsWith('image/')

  const onDownload = useCallback(() => {
    if (fileName && contentUrl) {
      axios.post(toAbsoluteApi('/custom/download'), {contentUrl}, {responseType: 'blob'})
        .then((response) => {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(new Blob([response.data]))
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
    }
  }, [contentUrl, fileName])

  if (!fileName) return <></>

  const ext = fileUtils(fileName) as DefaultExtensionType
  const style = ext in defaultStyles ? defaultStyles[ext] : {}

  return (
    <div className={clsx('card card-bordered', className)}>
      <div className="card-body p-3">
        <div className="d-flex align-items-center">
          <div className="w-25px me-3">
            {preview && contentUrl ?
              <LazyLoad height={75}>
                <div className="symbol symbol-30px">
                  <img src={toAbsoluteApi(contentUrl)} alt={fileName} />
                </div>
              </LazyLoad> :
              <FileIcon extension={ext} {...style} />
            }
          </div>
          <a
            href="#"
            className="text-gray-600 text-hover-primary d-inline-block text-truncate"
            onClick={e => {
              e.preventDefault()
              onDownload()
            }}
            title={`${fileName} | ${size ? bytesToSize(size) : ''}`}
          >
            {fileName}
          </a>
          {onDelete && (
            <IconButton
              activeVariant="danger"
              path="/general/gen034.svg"
              onClick={() => onDelete(file)}
              size="2"
            />
          )}
        </div>
      </div>
    </div>
  )
}
