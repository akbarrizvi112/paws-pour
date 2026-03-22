import { Input } from "../ui/Input";

export function InputField({ icon: Icon, rightIcon: RightIcon, className, ...props }) {
    return (
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <Input
                className={`h-12 bg-[#f4f3ec]/50 border-none rounded-xl ${Icon ? 'pl-10' : ''} ${RightIcon ? 'pr-10' : ''} ${className || ''}`}
                {...props}
            />
            {RightIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 cursor-pointer hover:text-primary-900 transition-colors">
                    {RightIcon}
                </div>
            )}
        </div>
    );
}
