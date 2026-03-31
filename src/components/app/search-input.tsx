'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';


interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export function SearchInput({ onSearch, placeholder = "Buscar...", value: externalValue }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue || '');

  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (externalValue === undefined) {
      setInternalValue(newValue);
    }
    onSearch(newValue);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  );
}