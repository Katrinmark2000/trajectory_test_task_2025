import React from 'react';

export type TInputUIProps = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
};