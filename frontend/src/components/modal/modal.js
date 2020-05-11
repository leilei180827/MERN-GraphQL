import React from "react";
import "./modal.css";
import ModalDrop from "./modalDrop/modalDrop";
const Modal = (props) => {
  return (
    <ModalDrop>
      <div className="modal-wrap">
        <div className="modal-title">{props.title}</div>
        <div className="modal-content">{props.children}</div>
        <div className="modal-control">
          {props.canCancel && (
            <button className="modal-btn" onClick={props.onCancel}>
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button className="modal-btn" onClick={props.onConfirm}>
              {props.confirmText ? props.confirmText : "Confirm"}
            </button>
          )}
        </div>
      </div>
    </ModalDrop>
  );
};
export default Modal;
