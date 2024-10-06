import { Id, toast } from "react-toastify";

// toasts
const showWarningToastMessage = (inputName: string) => {
    toast.warning(`${inputName} is invalid.`);
};

const showErrorToastMessage = () => {
    toast.error(`Wrong file type. The file type should be csv. `);
}

const showUpdateToast = (
    toastId: Id,
    text: string,
    status: 'success' | 'error' | 'warning',
) => {
    toast.update(toastId, { render: text, type: status, autoClose: 5000, closeButton: null, isLoading: false });
};

export {
    showWarningToastMessage,
    showErrorToastMessage,
    showUpdateToast,
}