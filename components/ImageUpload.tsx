'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Trash2, Eye, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  multiple?: boolean
  maxFiles?: number
  acceptedFormats?: string[]
  maxSize?: number // in MB
  className?: string
  placeholder?: string
}

interface UploadedFile {
  id: string
  file: File
  url: string
  progress: number
  uploaded: boolean
  error?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  multiple = false,
  maxFiles = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxSize = 5,
  className = '',
  placeholder = 'Click to upload or drag and drop images'
}: ImageUploadProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  // Convert file to base64 data URL for local storage
  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  // Simulate upload progress for better UX
  const simulateUpload = async (fileData: UploadedFile): Promise<void> => {
    return new Promise((resolve) => {
      const steps = [0, 25, 50, 75, 100]
      let currentStep = 0
      
      const interval = setInterval(() => {
        if (currentStep < steps.length - 1) {
          currentStep++
          setFiles(prev => prev.map(f => 
            f.id === fileData.id 
              ? { ...f, progress: steps[currentStep] }
              : f
          ))
        } else {
          clearInterval(interval)
          setFiles(prev => prev.map(f => 
            f.id === fileData.id 
              ? { ...f, progress: 100, uploaded: true }
              : f
          ))
          resolve()
        }
      }, 200)
    })
  }

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedFormats.join(', ')}`
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }
    
    return null
  }

  const handleFiles = useCallback(async (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles)
    
    if (!multiple && fileArray.length > 1) {
      toast({
        title: 'Multiple files not allowed',
        description: 'Please select only one file',
        variant: 'destructive'
      })
      return
    }

    if (files.length + fileArray.length > maxFiles) {
      toast({
        title: 'Too many files',
        description: `Maximum ${maxFiles} files allowed`,
        variant: 'destructive'
      })
      return
    }

    setUploading(true)
    
    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        toast({
          title: 'Invalid file',
          description: error,
          variant: 'destructive'
        })
        continue
      }

      try {
        const dataURL = await convertFileToDataURL(file)
        const fileData: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36),
          file,
          url: dataURL,
          progress: 0,
          uploaded: false
        }

        setFiles(prev => [...prev, fileData])
        
        // Simulate upload process
        await simulateUpload(fileData)
        
        // For single file mode, immediately set the value
        if (!multiple) {
          onChange(dataURL)
        }
        
        toast({
          title: 'Upload successful',
          description: `${file.name} has been uploaded successfully`
        })
        
      } catch (error) {
        toast({
          title: 'Upload failed',
          description: `Failed to upload ${file.name}`,
          variant: 'destructive'
        })
      }
    }
    
    setUploading(false)
  }, [files.length, maxFiles, multiple, onChange, toast, acceptedFormats, maxSize])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }, [handleFiles])

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleUrlRemove = () => {
    if (onRemove) {
      onRemove()
    } else {
      onChange('')
    }
  }

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-gray-300 hover:border-primary hover:bg-primary/5'
          }
          ${uploading ? 'pointer-events-none opacity-75' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <motion.div
          animate={{
            scale: isDragging ? 1.1 : 1,
            rotate: isDragging ? 5 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {placeholder}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          Supports: {acceptedFormats.map(format => format.split('/')[1].toUpperCase()).join(', ')} 
          <br />
          Max size: {maxSize}MB {multiple ? `• Max files: ${maxFiles}` : ''}
        </p>
        
        <Button variant="outline" type="button" disabled={uploading}>
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Choose Files'}
        </Button>
      </motion.div>

      {/* Current URL Image (if provided) */}
      {value && !multiple && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={value}
                  alt="Current image"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(value, '_blank')
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUrlRemove()
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Uploaded Files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-gray-900">Uploaded Files</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative group">
                        <img
                          src={file.url}
                          alt={file.file.name}
                          className="w-full h-32 object-cover"
                        />
                        
                        {/* Progress overlay */}
                        {!file.uploaded && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <div className="text-center">
                              <Progress value={file.progress} className="w-20 mb-2" />
                              <p className="text-white text-xs">{file.progress}%</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Action buttons */}
                        {file.uploaded && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
