import { useState } from 'react'

import Overlay from '../../src/Overlay/Overlay'
import Button from "../../src/Button"

const OverlayElement = () => {
    return (
      <div style={{height:"20px", width:"20px", backgroundColor:"red"}}></div>
    )
}

const OverlayPage = () => {
    const [show, setShow] = useState(false)
    const handleToggle = (event) => {
        setShow(prev => !prev)
    }
    return (
        <>
            <h4>Overlay</h4>
            <section className="overlay-container">
                <Overlay overlay={<OverlayElement/>}  trigger={"hover"}>
                    <Button>Click</Button>
                </Overlay>
            </section>
            <h4>Tooltip</h4>
            <section className="overlay-container">
                <Overlay tooltip={"Testing a tooltip with a long message. This messsage is so long it hsould in theory trigger a wrap."} trigger={"hover"}>
                    <span>Click</span>
                </Overlay>
            </section>
        </>
    )
}

export default OverlayPage