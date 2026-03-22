import { cn } from "../../utils/helpers";

export function Button({ className, variant = "primary", size = "default", children, ...props }) {
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-800 shadow-sm",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-500 hover:text-white",
        outline: "border border-primary-500 text-primary-900 hover:bg-primary-50",
        ghost: "text-primary-900 hover:bg-primary-50",
        danger: "bg-danger text-white hover:bg-red-700 shadow-sm",
    };
    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 flex items-center justify-center",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
