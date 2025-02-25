import React, {
  useState,
  useEffect,
  FormEvent,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react'
import { FiSearch, FiPaperclip, FiX } from 'react-icons/fi'
import { IconButton, Text } from '@chakra-ui/react'
import { PiAndroidLogo } from 'react-icons/pi'

interface SearchBarProps {
  initQuery?: string
  initAttachment?: File
  onSubmit: (type: 'ATTACHMENT' | 'QUERY', data: File | string) => void
}

const placeholders = [
  'e.g., IN-HDFCBK',
  'e.g., http://fakewebsite.com',
  'e.g., 9876543210',
  'e.g., 6611 9230 1293 1293',
  'e.g., https://facebook.com/username',
]

const SearchBar = forwardRef(
  ({ onSubmit, initQuery, initAttachment }: SearchBarProps, ref) => {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(true)
    const [cursorVisible, setCursorVisible] = useState(true)
    const [attachment, setAttachment] = useState<File | null>(initAttachment ?? null)
    const [query, setQuery] = useState<string>(initQuery ?? '')
    const [fileInputKey, setFileInputKey] = useState<string>('')
    const [isFocused, setIsFocused] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const dropZoneRef = useRef<HTMLDivElement | null>(null)

    useImperativeHandle(ref, () => ({
      updateQuery: (newQuery: string) => {
        setQuery(newQuery)
      },
    }))

    useEffect(() => {
      let placeholderIndex = 0
      let charIndex = 0
      let isDeleting = false
      let typingInterval: NodeJS.Timeout
      let cursorInterval: NodeJS.Timeout

      const type = () => {
        if (attachment) return

        if (isDeleting) {
          if (charIndex > 0) {
            setDisplayedText((prev) => prev.slice(0, -1))
            charIndex--
          } else {
            isDeleting = false
            placeholderIndex = (placeholderIndex + 1) % placeholders.length
            charIndex = 0
          }
        } else {
          if (charIndex < placeholders[placeholderIndex].length) {
            setDisplayedText((prev) => prev + placeholders[placeholderIndex].charAt(charIndex))
            charIndex++
          } else {
            isDeleting = true
          }
        }
      }

      typingInterval = setInterval(type, 100)
      cursorInterval = setInterval(() => setCursorVisible((prev) => !prev), 500)

      return () => {
        clearInterval(typingInterval)
        clearInterval(cursorInterval)
      }
    }, [attachment])

    useEffect(() => {
      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        if (e.dataTransfer?.files) {
          handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>)
        }
      }

      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(true)
      }

      const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
      }

      const dropZone = dropZoneRef.current
      dropZone?.addEventListener('drop', handleDrop)
      dropZone?.addEventListener('dragover', handleDragOver)
      dropZone?.addEventListener('dragleave', handleDragLeave)

      return () => {
        dropZone?.removeEventListener('drop', handleDrop)
        dropZone?.removeEventListener('dragover', handleDragOver)
        dropZone?.removeEventListener('dragleave', handleDragLeave)
      }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (inputRef.current) {
        inputRef.current.blur()
      }

      if (attachment) {
        onSubmit('ATTACHMENT', attachment)
      } else if (query.trim()) {
        onSubmit('QUERY', query)
      }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const fileType = file.type

        // Allow both image and APK files
        if (fileType === 'application/vnd.android.package-archive' ||
          fileType.startsWith('image/')) {
          setAttachment(file)
          setQuery('')
          setDisplayedText('')
        } else {
          alert('Only .apk, .png, .jpg, and .jpeg files are allowed')
        }
      }
    }

    const handleRemoveAttachment = () => {
      setAttachment(null)
      setFileInputKey(Date.now().toString())
    }

    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 40px 12px 40px',
      fontSize: '1rem',
      border: '2.5px solid transparent',
      borderColor: isFocused ? 'blue' : 'black',
      borderRadius: '30px',
      outline: 'none',
      animation: 'rotate-border 3s linear infinite',
      position: 'relative',
      backgroundColor: isDragOver ? '#f0f0f0' : 'white', // Visual cue for drag-over
    }

    const attachmentInfoStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '40px',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      background: '#f0f0f0',
      padding: '4px 8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      zIndex: 2,
    }

    const fileUploadLabelStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#888',
      zIndex: 2,
      backgroundColor: '#fff',
      padding: '4px',
      borderRadius: '4px',
    }

    return (
      <div
        ref={dropZoneRef}
        style={{ width: '100%', margin: '16px 0', position: 'relative' }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-upload" style={fileUploadLabelStyle}>
            <FiPaperclip size={20} color="blue" />
          </label>
          <input
            id="file-upload"
            key={fileInputKey}
            type="file"
            style={{ display: 'none' }}
            accept=".apk,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={attachment ? '' : displayedText + (cursorVisible ? '|' : '')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={inputStyle}
            disabled={!!attachment}
          />
          {attachment && (
            <div style={attachmentInfoStyle}>
              {attachment.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(attachment)}
                  alt="Preview"
                  style={{ width: '20px', height: '20px', marginRight: '4px', borderRadius: '4px' }}
                />
              ) : (
                <PiAndroidLogo size={16} style={{ marginRight: '4px' }} color='green' />
              )}
              <Text>
                {attachment.name.length > 30 ? attachment.name.slice(0, 30) + '...' : attachment.name}
              </Text>
              <IconButton
                aria-label="Remove attachment"
                icon={<FiX />}
                size="sm"
                onClick={handleRemoveAttachment}
                ml={2}
              />
            </div>
          )}
          <button type="submit">
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '12px',
                transform: 'translateY(-50%)',
                color: attachment != undefined || query != '' ? 'blue' : 'grey',
              }}
            >
              <FiSearch />
            </div>
          </button>
        </form>
      </div>
    )
  }
)

export default SearchBar