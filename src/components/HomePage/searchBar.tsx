import React, { useState, useEffect, FormEvent } from 'react';
import { FiSearch, FiPaperclip, FiX } from 'react-icons/fi';
import { Box, IconButton } from '@chakra-ui/react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const placeholders = [
  'e.g., IN-HDFCBK',
  'e.g., http://fakewebsite.com',
  'e.g., 9876543210',
  'e.g., 6611 9230 1293 1293',
  'e.g., https://facebook.com/username'
];

const keyframes = `
  @keyframes rotate-border {
    from {
      border-image-source: linear-gradient(45deg, #A7A3FF, #1509FF);
    }
    to {
      border-image-source: linear-gradient(405deg, #A7A3FF, #1509FF);
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export function SearchBar({ query, setQuery }: SearchBarProps) {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attachment) {
      const formData = new FormData();
      formData.append('apk_file', attachment);

      // Use FormData to pass the file
      window.location.href = `/search?attachment=${encodeURIComponent('file')}`;
    } else if (query.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(query)}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default enter behavior
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>); // Call submit handler
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type === "application/vnd.android.package-archive") {
      setAttachment(e.target.files[0]);
    } else {
      alert('Only .apk files are allowed');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 1500); // Change placeholder every 1.5 seconds
    return () => clearInterval(interval);
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 40px 12px 12px',
    fontSize: '1rem',
    border: '2.5px solid transparent',
    borderImage: 'linear-gradient(45deg, #A7A3FF, #1509FF) 1',
    borderRadius: '8px',
    outline: 'none',
    animation: 'rotate-border 3s linear infinite',
    transition: 'border-color 0.3s ease',
    position: 'relative',
  };

  const placeholderStyle: React.CSSProperties = {
    animation: 'slide-up 0.5s ease-in-out',
  };

  const attachmentInfoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    background: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  return (
    <div style={{ width: '100%', margin: '16px 0', position: 'relative' }}>
      <style>{keyframes}</style>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'black';
            e.currentTarget.style.borderImage = 'none';
            e.currentTarget.style.animation = 'none';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.borderImage = 'linear-gradient(45deg, #A7A3FF, #1509FF) 1';
            e.currentTarget.style.animation = 'rotate-border 3s linear infinite';
          }}
        />
        {attachment && (
          <div style={attachmentInfoStyle}>
            <FiPaperclip size={16} style={{ marginRight: '4px' }} />
            {attachment.name}
            <IconButton
              aria-label="Remove attachment"
              icon={<FiX />}
              size="sm"
              onClick={() => setAttachment(null)}
              ml={2}
            />
          </div>
        )}
        <button type='submit'>
          <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', color: '#888' }}>
            <FiSearch />
          </div>
        </button>
        <label htmlFor="file-upload" style={{ position: 'absolute', top: '50%', right: '40px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}>
          <FiPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          accept=".apk"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;
