import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}

const placeholders = [
    'e.g., IN-HDFCBK',
    'e.g., http://example.com',
    'e.g., 9876543210',
    'e.g., 123456789012',
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

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder((prev) => {
                const currentIndex = placeholders.indexOf(prev);
                const nextIndex = (currentIndex + 1) % placeholders.length;
                return placeholders[nextIndex];
            });
        }, 3000); // Change placeholder every 3 seconds
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
    };

    const placeholderStyle: React.CSSProperties = {
        animation: 'slide-up 0.5s ease-in-out',
    };

    return (
        <div style={{ width: '100%', margin: '16px 0', position: 'relative' }}>
            <style>{keyframes}</style>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={inputStyle}
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
            <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', color: '#888' }}>
                <FiSearch />
            </div>
        </div>
    );
}

export default SearchBar;
