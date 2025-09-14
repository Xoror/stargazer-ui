import { DropdownType } from "../Dropdown/Dropdown.types"
import { BaseDivType } from "../utils"

export type NavDropdownType = {
    toggleProps?: any,
    menuProps?:any
} & DropdownType & BaseDivType