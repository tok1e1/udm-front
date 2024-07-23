import React from "react";
import style from "./Input.module.scss";

interface CustomInputProps {
  className?: string;
  onChange: (value: string) => void;
  value?: string;
  width?: string;
  placeholder?: string;
}

type InputProps = CustomInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof CustomInputProps>;

export function Input({
  value,
  onChange,
  placeholder,
  height = 40,
  width,
  ...rest
}: InputProps) {
  return (
    <input
      value={value}
      minLength={1}
      onChange={(event) => onChange(event.target.value)}
      className={style.input}
      width={"360"}
      placeholder={placeholder}
      {...rest}
    />
  );
}
