import { cn } from "../../utils/helpers";

export function Badge({ className, variant = "default", children, ...props }) {
    const variants = {
        default: "bg-section text-primary-900 border border-primary-100",
        success: "bg-[#4caf50] text-white",
        warning: "bg-[#f4a261] text-white",
        danger: "bg-[#e63946] text-white",
        info: "bg-[#4c8bf5] text-white",
    };

    return (
        <div className={cn("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors", variants[variant], className)} {...props}>
            {children}
        </div>
    );
}
