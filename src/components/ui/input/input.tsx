import React from 'react';
import type { TInputUIProps } from './type';
import styles from './input.module.scss';

export const Input = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  disabled = false,
}: TInputUIProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};