import React, { createContext, useContext, useEffect, useState, forwardRef, useRef } from "react"
import { createPortal } from "react-dom"

import { ModalBodyType, ModalContextType, ModalFooterType, ModalHeaderType, ModalTitleType, ModalType, ErrorModalType } from "./Modal.types"

import CloseButton from "../CloseButton/CloseButton"
import Button from "../Button/Button"
import mergeRefs from "../utils/MergeRefs"

const ModalContext = createContext<ModalContextType>(null)
const ModalContextProvider = ({children, value}:{children:React.ReactNode, value:ModalContextType}) => {
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}
const useModalContext = () => {
    const context = useContext(ModalContext)
    if(!context) {
        throw new Error(
            "useModalContext has to be used within ModalContextProvider!"
        )
    }
    return context
}

const Modal = forwardRef<HTMLDialogElement, ModalType>( ({ children, size = "md",  show,  backdrop = "static", fill=false,  onHide, className, id, stretch, style, ...restProps 
    }, ref) => {
    //Two "show modal" states exist to allow for the modal to not render when not used (meaning you don't have to deal with states
    //for forms or other data that has to be renedered even though the modal is "display: none"). Also allows for an in/out-going animation
    const [showModal, setShowModal] = useState<boolean>(show)
    const [renderModal, setRenderModal] = useState<boolean>(show)

    let typeCheck : {show: boolean, onHide: boolean} | undefined = typeof(show) === "boolean" && typeof(onHide) === "function" ? undefined : {show: typeof(show) === "boolean", onHide: typeof(onHide) === "function"}
    if(typeCheck) {
        console.error(
            !typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null,
            !typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null
        )
    }

    if(show != showModal) {
        setShowModal(show)
        if(show) {
            setRenderModal(true)
        }
    }

    const modalRef = useRef<HTMLDialogElement>(null)
    useKeepElementFocused(modalRef)

    const closeModal = () => {
        const modal = modalRef.current!
        modal.classList.add("close")
        modal.addEventListener('animationend', (event) => {
            if(event.animationName === "fade-out-modal") {
                if(onHide) {
                    onHide(false)
                }
                modal.close()
                setRenderModal(false)
            }
          }, {once : true});
    }

    useEffect(() => {
        const modal = modalRef.current
        
        if(!modal) return
        
        if(showModal) {
            modal.classList.remove('close')
            modal.showModal()
            
        }
        else {
            closeModal()
        }
        
    }, [showModal])

    let classNameComputed: string = `sg-modal-tag`
    if(className) {
        classNameComputed += " "+className
    }
    if(backdrop === "static" || backdrop === "true") {
        classNameComputed += " sg-modal-static"
    }
    if(fill) classNameComputed += " sg-modal-fill"
    if(size && !fill)  classNameComputed += ` sg-modal-${size}`

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        const key: string = event.key
        if(key != "Escape") {return}
            
        event.preventDefault()
        closeModal()
    }

    return (
        renderModal ?
            createPortal(
                <dialog ref={mergeRefs([ref, modalRef])} className={classNameComputed} onKeyDown={(event) => handleKeyDown(event)} {...restProps } style={{"--height":stretch ? "80%":null, ...style} as React.CSSProperties}>
                    <ModalContextProvider value={closeModal}>
                        {!typeCheck ?
                            children :
                            <ErrorModal typeCheck={typeCheck} closeModal={closeModal}/>
                        }
                    </ModalContextProvider>
                </dialog>
            , document.body)
        : null
    )
})
Modal.displayName = "Modal"

const Header = forwardRef<HTMLDivElement | HTMLSpanElement | HTMLHeadingElement, ModalHeaderType>(({children, as="", className = "", closeButton = false, onClick, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    const closeModal = useModalContext()
    const onCloseButtonClick = (event: React.MouseEvent) => {
        if(onClick) {
            onClick(event)
        }
        closeModal()
    }

    return (
        <Component ref={ref} className={`sg-modal-header ${className}`} {...restProps}>
            {children}
            {closeButton ? <CloseButton variant onClick={event => onCloseButtonClick(event)}/> : null}
        </Component>
    )
})
Header.displayName = "ModalHeader"

const Title = forwardRef<HTMLDivElement | HTMLSpanElement | HTMLHeadingElement, ModalTitleType>( ({children, as="h4", className, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h4"
    return (
        <Component ref={ref} className={`sg-modal-title ${className}`} {...restProps}>
            {children}
        </Component>
    )
})
Title.displayName = "ModalTitle"

const Body = forwardRef<HTMLDivElement, ModalBodyType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-body ${className}`} {...restProps}>
            {children}
        </div>
    )
})
Body.displayName = "ModalBody"

const Footer = forwardRef<HTMLDivElement, ModalBodyType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
})
Footer.displayName = "ModalFooter"

export default Object.assign(Modal, {
    Header: Header,
    Title: Title,
    Body: Body,
    Footer: Footer
})

export const useKeepElementFocused = function (elementRef: React.RefObject<HTMLDialogElement>) {
    useEffect(() => {
        const onKeyDown  = (event: KeyboardEvent) => {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            const modal = elementRef.current
            if(modal) {
                const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] as HTMLElement
                const focusableContent = modal.querySelectorAll(focusableElements)
                const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement
                let isTabPressed = event.key === 'Tab'
        
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

const ErrorModal = ({typeCheck, closeModal}:ErrorModalType) => {
    return (
        <>
            <Header closeButton >
                <Title>
                    An Error ocurred!
                </Title>
            </Header>
            <Body>
                <p>
                    {!typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null}
                    {!typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null}
                </p>
            </Body>
            <Footer>
                <Button variant="danger" type="button" onClick={() => closeModal()}>
                    Close
                </Button>
            </Footer>
        </>
    )
}