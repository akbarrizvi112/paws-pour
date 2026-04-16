import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export function Toast({ message, type, onRemove }) {
    const isSuccess = type === 'success';

    return (
        <div className={`
            flex items-center gap-3 p-4 pr-3 min-w-[300px] max-w-md
            bg-white rounded-2xl shadow-xl border border-gray-100
            animate-in slide-in-from-bottom-4 fade-in duration-300
        `}>
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${isSuccess ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}
            `}>
                {isSuccess ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>

            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">
                    {isSuccess ? 'Success' : 'Error'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-wrap">
                    {message}
                </p>
            </div>

            <button
                onClick={onRemove}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-300 hover:text-gray-500"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export function ToastContainer({ toasts, onRemove }) {
    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onRemove={() => onRemove(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
}
