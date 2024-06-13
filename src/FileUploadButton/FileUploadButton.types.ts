import { ReactNode } from "react"
import { BaseButtonType } from "../utils/BaseTypes"
import { ButtonType } from "../Button"

export type FileUploadButtonType = {
    children: ReactNode,
    onFileUpload: React.ChangeEventHandler<HTMLInputElement>,
    controlId: string
} & ButtonType