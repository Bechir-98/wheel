import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        {toasts.map(t => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow-lg p-4 mb-2 border border-gray-200"
          >
            <h4 className="font-medium text-gray-900">{t.title}</h4>
            {t.description && (
              <p className="text-sm text-gray-600">{t.description}</p>
            )}
          </div>
        ))}
      </div>
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
