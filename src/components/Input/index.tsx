/* eslint-disable react/no-children-prop */
import {
  InputGroup,
  Input as ChakraInput,
  InputRightElement,
  Icon,
  InputProps as ChakraInputProps,
  Select,
  SelectProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

// import { Container } from './styles';

type InputProps = {
  icon?: IconType;
  placeholder: string;
  inputProps?: ChakraInputProps;
};

const TextInput: React.FC<InputProps> = ({ icon, placeholder, inputProps }) => {
  return (
    <InputGroup>
      <ChakraInput
        placeholder={placeholder}
        borderColor="#F35724"
        focusBorderColor="#FF6736"
        _hover={{
          borderColor: "#FF6736",
        }}
        {...inputProps}
      />
      {icon && (
        <InputRightElement children={<Icon as={icon} color="#FF6736" />} />
      )}
    </InputGroup>
  );
};

type SelectInputProps = Omit<InputProps, "icon"> & {
  inputProps?: SelectProps;
  elements: Array<string>;
  defaultIndexSelected?: number;
  disabledIndex?: number | Array<number>;
  popHouverMessageOnDisabledItems?: string | Array<string>;
  onSelectItem?: (it: string) => void;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  inputProps,
  elements,
  defaultIndexSelected,
  disabledIndex,
  popHouverMessageOnDisabledItems,
  onSelectItem
}) => {
  const diabledPropreties = React.useCallback(
    (index) => {
      const isDisabled =
        (Array.isArray(disabledIndex) && disabledIndex.includes(index)) ||
        disabledIndex === index;

      if (!isDisabled) return {};

      const haveMessage = Array.isArray(popHouverMessageOnDisabledItems)
        ? popHouverMessageOnDisabledItems[index]
        : popHouverMessageOnDisabledItems || "";

      if (isDisabled) {
        return {
          disabled: true,
          title: haveMessage,
        };
      }
    },
    [disabledIndex, popHouverMessageOnDisabledItems]
  );
  return (
    <Select
      placeholder={placeholder}
      {...inputProps}
      borderColor="#F35724"
      focusBorderColor="#FF6736"
      _hover={{
        borderColor: "#FF6736",
      }}
      onChange={(e) => onSelectItem(e.target.value)}
    >
      {elements.map((item, index) => (
        <option
          key={`${item}+${index}`}
          selected={index === defaultIndexSelected}
          value={item}
          {...diabledPropreties(index)}
        >
          {item}
        </option>
      ))}
    </Select>
  );
};

export default TextInput;
