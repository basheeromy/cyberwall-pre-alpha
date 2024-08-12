import React, { useState, useEffect, FormEvent, useImperativeHandle, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPaperclip, FiX } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/react';

interface SearchBarProps {
  initQuery?: string;
  initAttachment?: File;
  onSubmit: (type: 'ATTACHMENT' | 'QUERY', data: File | string) => void;
}

const placeholders = [
  'e.g., IN-HDFCBK',
  'e.g., http://fakewebsite.com',
  'e.g., 9876543210',
  'e.g., 6611 9230 1293 1293',
  'e.g., https://facebook.com/username',
];

export const SearchBar = forwardRef(
  ({ onSubmit, initQuery, initAttachment }: SearchBarProps, ref) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [attachment, setAttachment] = useState<File | null>(initAttachment ?? null);
    const [query, setQuery] = useState<string>(initQuery ?? '');
    const [fileInputKey, setFileInputKey] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false); // State to track focus
    const inputRef = useRef<HTMLInputElement | null>(null); // Reference to input element

    useImperativeHandle(ref, () => ({
      updateQuery: (newQuery: string) => {
        setQuery(newQuery);
      },
    }));

    useEffect(() => {
      let placeholderIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingInterval: NodeJS.Timeout;
      let cursorInterval: NodeJS.Timeout;

      const type = () => {
        if (attachment) return; // Stop typing animation if there is an attachment

        if (isDeleting) {
          if (charIndex > 0) {
            setDisplayedText(prev => prev.slice(0, -1));
            charIndex--;
          } else {
            isDeleting = false;
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            charIndex = 0; // Reset charIndex for the new placeholder
          }
        } else {
          if (charIndex < placeholders[placeholderIndex].length) {
            setDisplayedText(prev => prev + placeholders[placeholderIndex].charAt(charIndex));
            charIndex++;
          } else {
            isDeleting = true;
          }
        }
      };

      // Set typing and cursor intervals
      typingInterval = setInterval(type, 100);
      cursorInterval = setInterval(() => setCursorVisible(prev => !prev), 500);

      return () => {
        clearInterval(typingInterval);
        clearInterval(cursorInterval);
      };
    }, [attachment]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Trigger onBlur manually
      if (inputRef.current) {
        inputRef.current.blur();
      }

      if (attachment) {
        onSubmit('ATTACHMENT', attachment);
      } else if (query.trim()) {
        onSubmit('QUERY', query);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0].type === 'application/vnd.android.package-archive') {
        setAttachment(e.target.files[0]);
        setQuery(''); // Clear query when a file is selected
        setDisplayedText(''); // Clear placeholder when a file is selected
      } else {
        alert('Only .apk files are allowed');
      }
    };

    const handleRemoveAttachment = () => {
      setAttachment(null);
      setFileInputKey(Date.now().toString()); // Reset the file input key
    };

    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 40px 12px 40px', // Adjust padding for left icon space
      fontSize: '1rem',
      border: '2.5px solid transparent',
      borderImage: isFocused
        ? 'linear-gradient(45deg, grey, #000) 1' // Focused border color
        : 'linear-gradient(45deg, #A7A3FF, #1509FF) 1', // Default border color
      borderRadius: '8px',
      outline: 'none',
      animation: 'rotate-border 3s linear infinite',
      position: 'relative',
      backgroundColor: "white"
    };

    const attachmentInfoStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '40px', // Adjust left position to accommodate the attachment icon
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      background: '#f0f0f0',
      padding: '4px 8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      zIndex: 2, // Ensure attachment info is above other elements
    };

    const fileUploadLabelStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '12px', // Position to the left side
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#888',
      zIndex: 2, // Ensure the label is clickable
      backgroundColor: '#fff', // Prevent the label from blending with the background
      padding: '4px', // Small padding to enhance clickability
      borderRadius: '4px',
    };

    return (
      <div style={{ width: '100%', margin: '16px 0', position: 'relative', }}>
        <form onSubmit={handleSubmit}>
          {/* Attachment Button Moved to the Left Side */}
          <label htmlFor="file-upload" style={fileUploadLabelStyle}>
            <FiPaperclip size={20} color='blue' />
          </label>
          <input
            id="file-upload"
            key={fileInputKey} // Use the dynamic key to force reset
            type="file"
            style={{ display: 'none' }}
            accept=".apk"
            onChange={handleFileChange}
          />
          <input
            ref={inputRef} // Attach ref to input
            type="text"
            placeholder={attachment ? '' : displayedText + (cursorVisible ? '|' : '')} // Add the fake cursor
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)} // Set focus state on focus
            onBlur={() => setIsFocused(false)} // Remove focus state on blur
            style={inputStyle}
            disabled={!!attachment} // Disable input when file is selected
          />
          {attachment && (
            <div style={attachmentInfoStyle}>
              <FiPaperclip size={16} style={{ marginRight: '4px' }} />
              {attachment.name}
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
                color: attachment != undefined || query != '' ? 'blue' : "grey",
              }}
            >
              <FiSearch />
            </div>
          </button>
        </form>
      </div>
    );
  }
);

export default SearchBar;
