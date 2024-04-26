import { useEffect } from "react";

export const useKeepElementFocused = (elementRef) => {
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