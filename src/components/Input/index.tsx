import React, {InputHTMLAttributes} from 'react';
import isEmpty from "is-empty";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({label, className, error, ...props}: IProps) {
  return (
    <div>
      <label>
        <span className="block typo-body-small text-slate-700 mb-1">{label}</span>
        <input className={`w-full border ${!isEmpty(error) ?
          "border-red-500 text-red-500" : "border-slate-200  hover:border-pink-300"} 
          rounded px-3 py-3 typo-body focus:ring-pink-100 focus:ring ${className}`} {...props}/>
      </label>
      {
        !isEmpty(error) && (
          <p className="typo-caption text-red-500">{error}</p>
        )
      }
    </div>
  );
}

export default Input;
