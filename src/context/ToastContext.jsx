import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/ui/Toast';
import { SuccessModal } from '../components/ui/SuccessModal';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });

    const showToast = useCallback((message, type = 'success') => {
        if (type === 'success') {
            setSuccessModal({ isOpen: true, message });
        } else {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type }]);

            // Auto-remove after 3 seconds
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        }
    }, []);

    const closeSuccessModal = useCallback(() => {
        setSuccessModal({ isOpen: false, message: '' });
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
            <SuccessModal
                isOpen={successModal.isOpen}
                message={successModal.message}
                onClose={closeSuccessModal}
            />
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
