import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomButtonProps {
  btnText?: string;
    btnText1?: string;
  bgColor?: string;
  btnLink?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const CustomButton = ({
  btnText,
  btnText1,
  bgColor,
  btnLink,
  className,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
}: CustomButtonProps) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none";

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-[#1B22E5] text-white hover:bg-[#1B22E5]/90 ",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 ",
    outline:
      "border-2 border-[#1B22E5] text-[#1B22E5] hover:bg-[#1B22E5] hover:text-white ",
    ghost: "text-[#1B22E5] hover:bg-[#1B22E5]/10 ",
  };

  // Disabled/loading styles
  const disabledStyles = "opacity-50 cursor-not-allowed";
  const loadingStyles = "cursor-wait";

  const customStyle = {};
  const finalStyle = bgColor ? { "--btn-bg": bgColor, ...customStyle } : customStyle;
  const dynamicBgClass = bgColor ? "bg-[var(--btn-bg)]" : "";

  // combine all styles
  const buttonStyles = cn(
    baseStyles,
    sizeStyles[size],
    !bgColor && variantStyles[variant],
    dynamicBgClass, // Apply the CSS variable-based background
    (disabled || loading) && disabledStyles,
    loading && loadingStyles,
    className
  );

  // Button content with loading state
  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {btnText}
      {btnText1}
    </>
  );

  // If it's a link
  if (btnLink) {
    return (
      <Link
        href={btnLink ?? "/"}
        className={buttonStyles}
        style={finalStyle as React.CSSProperties}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      className={buttonStyles}
      style={finalStyle as React.CSSProperties}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default CustomButton;
