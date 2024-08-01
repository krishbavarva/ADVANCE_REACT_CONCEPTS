import React, { createContext, useContext, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

const SelectContext = createContext();

const Select = React.forwardRef(({ children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedOption, setSelectedOption }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
});

const Trigger = ({ children }) => {
  const { isOpen, setIsOpen, selectedOption } = useContext(SelectContext);
  return (
    <button type="button" onClick={() => setIsOpen(!isOpen)}>
      {selectedOption ? selectedOption.label : children}
    </button>
  );
};

const Options = ({ children }) => {
  const { isOpen } = useContext(SelectContext);
  if (!isOpen) return null;
  return <div>{children}</div>;
};

const Option = ({ value, children }) => {
  const { setIsOpen, setSelectedOption } = useContext(SelectContext);
  return (
    <div
      onClick={() => {
        setSelectedOption({ value, label: children });
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
};

Select.Trigger = Trigger;
Select.Options = Options;
Select.Option = Option;

const FormSelect = ({ name, control }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return (
    <Select ref={ref} {...inputProps}>
      <Select.Trigger>Select an option</Select.Trigger>
      <Select.Options>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Options>
    </Select>
  );
};

export default function FirstStep() {
  const { control } = useForm();
  return (
    <div>
      <form>
        <FormSelect name="myselect" control={control} />
      </form>
    </div>
  );
}
