import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader({ message = "Loading data...", fullHeight = true }) {
    return (
        <div className={`flex flex-col items-center justify-center w-full ${fullHeight ? 'min-h-[24rem]' : 'py-12'} bg-surface rounded-2xl border border-primary-100`}>
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
            <p className="text-primary-600 font-medium text-sm animate-pulse">{message}</p>
        </div>
    );
}

export function InlineLoader({ message = "Loading..." }) {
    return (
        <div className="flex items-center gap-2 text-primary-600 text-sm font-medium p-4 justify-center w-full">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{message}</span>
        </div>
    );
}

export function TableRowLoader({ colSpan = 4, message = "Loading data..." }) {
    return (
        <tr>
            <td colSpan={colSpan} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center h-full text-primary-600">
                    <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary-400" />
                    <span className="text-sm font-medium animate-pulse">{message}</span>
                </div>
            </td>
        </tr>
    );
}
