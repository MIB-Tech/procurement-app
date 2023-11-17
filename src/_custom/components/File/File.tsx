import React, { FC, HTMLAttributes, useCallback } from 'react';
import { DefaultExtensionType, defaultStyles, FileIcon } from 'react-file-icon';
import clsx from 'clsx';
import axios from 'axios';
import { IconButton } from '../Button/IconButton';
import LazyLoad from 'react-lazyload';
import { HydraItem } from '../../types/hydra.types';
import { toAbsoluteApi } from '../../../app/modules/utils';
import { bytesToSize, fileUtils } from './File.utils';


const width = 150;

export type FileProps = {
  file: HydraItem
  isUploading?: boolean
  onDelete?: (file: HydraItem) => void
} & HTMLAttributes<HTMLDivElement>

export const File: FC<FileProps> = ({ file, isUploading, onDelete, className }) => {
  const { contentUrl, size, mimeType, '@title': fileName } = file;
  const preview = mimeType?.startsWith('image/');

  const onDownload = useCallback(() => {
    if (fileName && contentUrl) {
      axios.post(toAbsoluteApi('/custom/download'), { contentUrl }, { responseType: 'blob' })
      .then((response) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([response.data]));
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
    }
  }, [contentUrl, fileName]);

  if (!fileName) return <></>;

  const ext = fileUtils(fileName) as DefaultExtensionType;
  const style = ext in defaultStyles ? defaultStyles[ext] : {};

  return (
    <div className={clsx('card card-bordered', className)}>
      <div
        className='card-body text-center position-relative'
        style={{ width }}
      >
        <div>
          {preview && contentUrl ?
            <LazyLoad height={200}>
              <div className='symbol symbol-75px'>
                <img src={toAbsoluteApi(contentUrl)} alt={fileName} />
              </div>
            </LazyLoad> :
            <FileIcon extension={ext} {...style} />
          }
        </div>
        <div className='text-center'>
          <a
            href='src/_custom/Column/controls/components#'
            className='text-gray-600 text-hover-primary d-inline-block text-truncate'
            style={{ maxWidth: width - 10 }}
            onClick={e => {
              e.preventDefault();
              onDownload();
            }}
            title={`${fileName} | ${size ? bytesToSize(size) : ''}`}
          >
            {fileName}
          </a>
          <div className='position-absolute top-0 end-0'>
            <div className='ms-auto'>
              {onDelete && (
                <IconButton
                  activeVariant='danger'
                  path='/general/gen034.svg'
                  onClick={() => {
                    onDelete(file);
                  }}
                  size='2'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
