import { Fragment } from "react"
import Dropdown from "../../src/Dropdown"

const DropdownPage = () => {
    const dropPossible = ["down", "up", "right", "left"]
    const alignPossible = ["start", "center", "end"]
    return (
        <>
            {dropPossible.map(drop => 
                <Fragment key={drop}>
                    <h4> Dropdown </h4>
                    <section className="dropdown-container">
                        {alignPossible.map(align => 
                                <Dropdown key={`drop-${drop}-${align}`} label={drop+" "+align} controlId={`drop-${drop}-${align}`} drop={drop} align={align}>
                                    <Dropdown.Divider />
                                    <Dropdown.Item style={{display:"none"}} id={`drop-${drop}-${align}-item-1`}>Test 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => console.log("click")} id={`drop-${drop}-${align}-item-2`}>Test 2</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item id={`drop-${drop}-${align}-item-3`}>Test 3</Dropdown.Item>
                                    <Dropdown.Item id={`drop-${drop}-${align}-item-4`}>Test 4</Dropdown.Item>
                                    <Dropdown.Divider />
                                </Dropdown>
                            )
                        }
                    </section>
                </Fragment>
            )}
        </>
    )
}

export default DropdownPage