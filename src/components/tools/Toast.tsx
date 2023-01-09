import React, { forwardRef, useImperativeHandle, useState } from "react";
import Toast from "bootstrap/js/dist/toast";

interface IToast {
    identifier: string,
}

const ToastComponent = forwardRef((props: IToast, ref) => {

    const {identifier} = props;
    
    useImperativeHandle(ref, () => ({
        showError(message: string) {
            let toast_element = document.querySelectorAll(`#${identifier}`)[0]
            let toast_node = new Toast(toast_element);
            let message_element = document.querySelectorAll('#custom-toast-message')[0];
            message_element.innerHTML = message
            toast_element.classList.add('text-bg-danger')
            toast_node.show();
        },

        showSuccess(message: string) {
            let toast_element = document.querySelectorAll(`#${identifier}`)[0]
            let toast_node = new Toast(toast_element);
            let message_element = document.querySelectorAll('#custom-toast-message')[0];
            message_element.innerHTML = message
            toast_element.classList.add('text-bg-success')
            toast_node.show();
        }
    }))

    return (
        <div className="toast-container">
            <div className={`toast align-items-center`} role="alert" aria-live="assertive" aria-atomic="true" id={identifier}>
                <div className="d-flex">
                    <div className="toast-body">
                        <span id="custom-toast-message">
                            Sample Message
                        </span>
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
})

export default ToastComponent;