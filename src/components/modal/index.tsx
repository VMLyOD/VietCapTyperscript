import React, { useState } from "react";
import "./style.css";

interface ModalProps {
  title?: any;
  modalTitle?: any;
  nameTitle?: any;
  children?: any;
  UrlImg?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  modalTitle,
  nameTitle,
  UrlImg,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        {nameTitle}
        {children}
      </button>
      {modal && (
        <div className="modal w-[100%] h-[100%]">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content h-[75%] w-[65%]">
            <div className="modal-title flex items-center justify-between h-[5%]">
              <p>{modalTitle}</p>
              <button
                className="close-modal text-black justify-center flex items-center"
                onClick={toggleModal}
              >
                <img
                  className="w-[12px] h-[12px]"
                  src="/assets/close-dark.svg"
                  alt=""
                />
              </button>
            </div>
            <div className="title-modal h-[94.5%] rounded-lg">{title}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
