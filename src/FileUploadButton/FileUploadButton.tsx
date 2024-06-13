import React, { useRef, forwardRef, useImperativeHandle } from "react"

import { FileUploadButtonType } from "./FileUploadButton.types"
import Button, { ButtonType } from "../Button"
import mergeRefs from "../utils/MergeRefs"

const FileUploadButton = forwardRef<HTMLButtonElement, FileUploadButtonType>( ({children, onClick, onFileUpload, controlId, ...props}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!inputRef.current) return
        inputRef.current.click()
        if(onClick) {
            onClick(event)
        }
    }
    
    return (
        <>
            <Button ref={ref} id={controlId} onClick={handleClick} {...props}>
                {children}
            </Button>
            <input aria-labelledby={controlId} ref={inputRef} className="custom-upload" type="file" onChange={onFileUpload}></input>
        </>
    )
})

export default FileUploadButton