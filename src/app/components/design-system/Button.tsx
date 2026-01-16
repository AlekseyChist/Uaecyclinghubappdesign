import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 disabled:bg-gray-100 disabled:text-gray-400',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-300',
  tertiary: 'bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10 disabled:text-gray-300',
  destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:bg-gray-100 disabled:text-gray-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm rounded-xl',
  md: 'px-4 py-3 text-base rounded-2xl',
  lg: 'px-6 py-4 text-base rounded-2xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all active:scale-[0.98]
        disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          {children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
