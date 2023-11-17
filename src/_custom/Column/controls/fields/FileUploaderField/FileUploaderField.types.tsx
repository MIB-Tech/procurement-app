import { FieldProps } from '../index';
import { DropzoneOptions } from 'react-dropzone';
import { InputHTMLAttributes } from 'react';
import { FileProps } from '../../../../components/File/File';


export type FileUploaderFieldProps = {
    isUploading?: boolean
  }
  & FieldProps
  & DropzoneOptions
  & Pick<FileProps, 'onDelete'>
  & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'onDrop'>