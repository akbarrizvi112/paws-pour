import { cn } from "../../utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export function Pagination({ currentPage, totalPages, onPageChange, className }) {
    return (
        <div className={cn("flex items-center justify-between py-4 w-full", className)}>
            <span className="text-sm text-primary-600">
                Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
