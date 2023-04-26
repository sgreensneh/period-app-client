import React, {ButtonHTMLAttributes} from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

function Button({className, children, disabled, ...props}: IProps) {
  return (
    <button
      className={`h-12 ${disabled ? "bg-slate-300" : "bg-pink-700 hover:bg-pink-800" +
        " active:bg-pink-900"} px-10 typo-subtitle-small text-white rounded border-0 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
