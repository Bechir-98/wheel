import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for managing toast notifications
 * @returns {Object} An object containing toast functions and the current toast list
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a new toast notification
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast options
   * @param {string} [options.type='info'] - Toast type (info, success, warning, error)
   * @param {number} [options.duration=3000] - Duration in ms before auto-dismiss
   * @param {string} [options.position='top-right'] - Toast position (top-right, top-left, bottom-right, bottom-left)
   * @param {boolean} [options.dismissible=true] - Whether the toast can be manually dismissed
   * @param {Function} [options.onClose] - Callback when toast closes
   */
  const showToast = useCallback((message, options = {}) => {
    const {
      type = 'info',
      duration = 3000,
      position = 'top-right',
      dismissible = true,
      onClose
    } = options;

    const id = uuidv4();

    const newToast = {
      id,
      message,
      type,
      position,
      dismissible,
      onClose
    };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Dismiss a specific toast by id
   * @param {string} id - The id of the toast to dismiss
   */
  const dismissToast = useCallback((id) => {
    setToasts(prev => {
      const toastToRemove = prev.find(toast => toast.id === id);
      if (toastToRemove?.onClose) {
        toastToRemove.onClose();
      }
      return prev.filter(toast => toast.id !== id);
    });
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    setToasts(prev => {
      prev.forEach(toast => {
        if (toast.onClose) toast.onClose();
      });
      return [];
    });
  }, []);

  return { 
    showToast, 
    dismissToast, 
    clearToasts, 
    toasts 
  };
}