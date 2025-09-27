import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({children, initialOpen = ""}){
    const [openName, setOpenName] = useState(initialOpen)

    const close = () => setOpenName("");
    const open = setOpenName;

    return(
        <ModalContext.Provider value={{openName, close, open}}>
            {children}
        </ModalContext.Provider>
    )
}

function Open({children, opens: opensWindowName}){
    const {open} = useContext(ModalContext);

    return(
        cloneElement(children, {onClick: () => open(opensWindowName)})
    )
}

function Window({children, name}){
    const {openName, close} = useContext(ModalContext);

    const ref = useOutsideClick(close);

    if(name !== openName) return null;

    return createPortal(
        <div className="overlay">
            <div className="modal-box" ref={ref}>
                <button type="button" id="close-modal" onClick={() => close()}>X</button>
                <div>{cloneElement(children, {onCloseModal: close})}</div>
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal;