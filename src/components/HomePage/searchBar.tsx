import React, { useState, useEffect, FormEvent, useImperativeHandle, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPaperclip, FiX } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/react';

interface SearchBarProps {
  initQuery?: string;
  initAttachment?: File
  onSubmit: (type: 'ATTACHMENT' | 'QUERY', data: File | string) => void;
}

const placeholders = [
  'e.g., IN-HDFCBK',
  'e.g., http://fakewebsite.com',
  'e.g., 9876543210',
  'e.g., 6611 9230 1293 1293',
  'e.g., https://facebook.com/username'
];

export const SearchBar = forwardRef(({ onSubmit, initQuery, initAttachment }: SearchBarProps, ref) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [attachment, setAttachment] = useState<File | null>(initAttachment ?? null);
  const [query, setQuery] = useState<string>(initQuery ?? '');
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    updateQuery: (newQuery: string) => {
      setQuery(newQuery);
    }
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attachment) {
      onSubmit('ATTACHMENT', attachment);
      navigate('/search', { state: { attachment } });
    } else if (query.trim()) {
      onSubmit('QUERY', query);
      navigate('/search', { state: { query } });
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
    }, 1500);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
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
        <button type="submit">
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
});

export default SearchBar;
