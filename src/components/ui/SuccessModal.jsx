import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export function SuccessModal({ message, isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-sm w-full animate-in zoom-in-95 duration-300">
                <div className="bg-gradient-to-br from-[#5E6F5E] to-[#4D5B4D] p-8 flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                        <CheckCircle className="w-10 h-10 text-white stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white tracking-tight">Success!</h3>
                        <p className="text-white/80 font-medium text-sm px-4">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="p-4 flex justify-center bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
