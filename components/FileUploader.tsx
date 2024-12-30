"use client"

import { convertFileToUrl } from '@/lib/utils'
import { Convergence } from 'next/font/google'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void,
    }

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="file-upload">
            <input {...getInputProps()} />
            {files && files?.length > 0 && files[0] instanceof File ? (
                <Image src={convertFileToUrl(files[0])} width={100} height={100} alt='uplaoded image'/>
            ): <Image src="/assets/icons/upload.svg" width={50} height={50} alt='upload icon' />}
            <div className="file-upload_label">
                <p className='text-green-500'>
                    点击或拖动文件到此处
                </p>
                <p className='text-gray-500'>
                    支持SVG PNG JPG GIF (不超过2M)
                </p>

            </div>
        </div>
    )
}

export default FileUploader