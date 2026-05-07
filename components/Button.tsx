import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  fullWidth = true,
  ...props 
}) => {
  const baseStyles = "h-14 rounded-xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark",
    secondary: "bg-white border border-gray-200 text-text-main hover:bg-gray-50",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    danger: "bg-error text-white shadow-lg shadow-error/20 hover:bg-red-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};