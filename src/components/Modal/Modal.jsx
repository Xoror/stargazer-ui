import React, { createContext, useContext, useEffect, useMemo, useState, forwardRef, useRef, useCallback } from "react"
import { createPortal } from "react-dom"

import {CloseButton} from "../CloseButton/CloseButton"
import {Button} from "../Button/CustomButton"

const ModalContext = createContext(false)
const ModalContextProvider = ({children, value}) => {
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}
const useModalContext = () => {
    return useContext(ModalContext)
}

const Modal = forwardRef(({
        children, 
        centered=false,
        size = "md", 
        show, 
        backdrop = "static", 
        onHide = "none",
        className,
        id,
        ...restProps 
    }, ref) => {
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        setShowModal(show)
    }, [show])

    const modalRef = useRef(null)
    useKeepElementFocused(modalRef)

    let typeCheck = typeof(show) === "boolean" && typeof(onHide) === "function" ? undefined : {show: typeof(show) === "boolean", onHide: typeof(onHide) === "function"}
    if(typeCheck) {
        console.error(
            !typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null,
            !typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null
        )
    }

    const closeModal = () => {
        if(onHide) {
            onHide()
        }
        setShowModal(false);
    }

    useEffect(() => {
        const modal = modalRef.current
        
        if(!modal) return
        if(showModal) {
            modal.showModal()
        }
        else {
            modal.close()
        }
    }, [showModal])

    let classNameComputed = `sg-modal-tag sg-modal-${size}`
    if(className) {
        classNameComputed += " "+className
    }
    if(backdrop === "static" || backdrop === "true") {
        classNameComputed += " sg-modal-static"
    }

    return (
        showModal ?
            createPortal(
                <dialog ref={modalRef} className={classNameComputed}>
                    <ModalContextProvider value={onHide}>
                        {!typeCheck ?
                            children :
                            <>
                                <Modal.Header closeButton >
                                    <Modal.Title>
                                        An Error ocurred!
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>
                                        {!typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null}
                                        {!typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null}
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" type="button" onClick={closeModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </>
                        }
                    </ModalContextProvider>
                </dialog>
            , document.body)
        : null
    )
})


const Header = forwardRef(({as="", className = "", children, closeButton = false, onClick = "none", ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    const onHide = useModalContext()
    const onCloseButtonClick = (event) => {
        if(onClick != "none") {
            onClick(event)
        }
        if(onHide != "none") {
            onHide()
        }
    }

    return (
        <Component ref={ref} className={`sg-modal-header ${className}`} {...restProps}>
            {children}
            {closeButton ? <CloseButton variant onClick={onCloseButtonClick}/> : null}
        </Component>
    )
})
Modal.Header = Header;
const Title = ({children, as="h4", className, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h4"
    return (
        <Component ref={ref} className={`sg-modal-title ${className}`} {...restProps}>
            {children}
        </Component>
    )
}
Modal.Title = forwardRef(Title);

const Body = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-body ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Modal.Body = forwardRef(Body);

const Footer = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Modal.Footer = forwardRef(Footer);

export { Modal }

const useKeepElementFocused = function (elementRef) {
    useEffect(() => {
        const onKeyDown  = (event) => {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            const modal = elementRef.current
            if(modal) {
                const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]
                const focusableContent = modal.querySelectorAll(focusableElements)
                const lastFocusableElement = focusableContent[focusableContent.length - 1]
                let isTabPressed = event.key === 'Tab' || event.keyCode === 9;
        
                if (!isTabPressed) {
                    return;
                }
        
                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus()
                        event.preventDefault()
                    }
                } else if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    event.preventDefault()
                }
            }
        }
        document.addEventListener('keydown', onKeyDown, true )

        return function cleanup() {
            document.removeEventListener('keydown', onKeyDown, true )
        }
    }, [elementRef])
}