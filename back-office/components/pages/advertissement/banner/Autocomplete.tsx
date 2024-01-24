import TextField from '@mui/material/TextField';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

type AutocompleteProps = {
  // eslint-disable-next-line no-unused-vars
  setSearchedValue?: React.Dispatch<React.SetStateAction<string>>;
  searchedValue?: string;
  setSelectedElement?: any;
  loading?: boolean;
  elementList?: any[];
  placeholder?: string;
  objectKey?: string;
};

export default function Autocomplete(props: AutocompleteProps) {
  const {
    searchedValue,
    setSearchedValue,
    setSelectedElement,
    loading,
    elementList,
    placeholder,
    objectKey,
  } = props;
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  return (
    <div className="relative w-full">
      <TextField
        size="small"
        type="text"
        value={searchedValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchedValue && setSearchedValue(event.target.value);
          setShowDropdown(true);
        }}
        className="h-[36px] border border-neutral-200 rounded w-full px-2"
        label={placeholder}
      />

      {showDropdown && (
        <div className="absolute top-10 shadow-md w-[calc(100%_-_16px)] bg-gray-50 z-10 rounded">
          <div className="flex flex-col h-[160px]">
            <Scrollbars autoHide>
              <div className="flex flex-col">
                {loading && (
                  <div className="px-2 hover:bg-gray-100 cursor-pointer">
                    Chargement ...
                  </div>
                )}
                {elementList &&
                  elementList.map((element) => (
                    <a
                      key={element?.id}
                      className="px-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedElement(element);
                        setSearchedValue &&
                          setSearchedValue(element[objectKey as string]);
                        setShowDropdown(false);
                      }}
                    >
                      {element[objectKey as string]}
                    </a>
                  ))}
                {elementList && elementList?.length == 0 && (
                  <div className="px-2 hover:bg-gray-100 cursor-pointer">
                    Aucun élément trouvé
                  </div>
                )}
              </div>
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
}
