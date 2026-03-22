import { cn } from "../../utils/helpers";

export function Badge({ className, variant = "default", children, ...props }) {
    const variants = {
        default: "bg-primary-100 text-primary-900",
        success: "bg-accent-soft text-accent",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-danger-soft text-danger",
    };

    return (
        <div className={cn("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors", variants[variant], className)} {...props}>
            {children}
        </div>
    );
}
