import React from 'react';
import DP, { ReactDatePickerProps } from 'react-datepicker';

import Input from './Input';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  invalid?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick, invalid }, ref) => {
  return <Input invalid={invalid} onClick={onClick} style={{ backgroundColor: '#f7f7f7'}} ref={ref} value={value} readOnly />;
});

interface DatePickerProps extends ReactDatePickerProps {
  invalid?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ invalid, ...props }) => (
  <DP {...props} showYearDropdown customInput={<CustomInput invalid={invalid} />} />
);

export default DatePicker;
