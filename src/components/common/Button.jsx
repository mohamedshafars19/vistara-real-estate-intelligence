import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 select-none rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-vistara-accent disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold"
  };

  const variantStyles = {
    // Primary important CTA: Solid dark primary background with clean light text
    primary: "bg-[#142334] text-white hover:bg-[#1D2E40] active:scale-[0.99] border border-transparent shadow-subtle",
    // Secondary button: White / surface background, subtle border, primary text
    secondary: "bg-vistara-surface text-vistara-primary border border-vistara-border hover:bg-vistara-elevated hover:border-vistara-accent shadow-subtle active:scale-[0.99]",
    // Accent button: selective highlights
    accent: "bg-vistara-accent text-[#142334] font-semibold hover:bg-vistara-accentHover active:scale-[0.99] border border-transparent",
    // Ghost
    ghost: "bg-transparent text-vistara-primary hover:bg-vistara-elevated active:bg-vistara-border",
    // Outline
    outline: "bg-transparent border border-vistara-border text-vistara-primary hover:border-vistara-primary"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}
