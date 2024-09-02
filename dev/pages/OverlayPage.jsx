import { useEffect, useRef, useState } from 'react'

import Overlay from '../../src/Overlay/Overlay'
import Button from "../../src/Button"

const OverlayElement = () => {
    return (
      <div style={{height:"20px", width:"20px", backgroundColor:"red"}}></div>
    )
}

const OverlayPage = () => {
    const buttonRef = useRef(null)
    const [show, setShow] = useState(false)
    const handleToggle = (event) => {
        setShow(prev => !prev)
    }
    useEffect(() => {
        //if(buttonRef.current) console.log(buttonRef.current)
    }, [buttonRef.current])
    return (
        <>
            <h4>Overlay</h4>
            <section className="overlay-container">
                <Overlay overlay={<OverlayElement/>}  trigger={"click"}>
                    <Button ref={buttonRef} onClick={(event) => console.log(buttonRef.current)}>Click</Button>
                </Overlay>
            </section>
            <h4>Tooltip</h4>
            <section className="overlay-container">
                <Overlay tooltip={"Testing a tooltip with a long message. This messsage is so long it hsould in theory trigger a wrap."} trigger={"hover"}>
                    <span style={{display:"block",border:"2px solid white"}}>Click</span>
                </Overlay>
            </section>
        </>
    )
}

export default OverlayPage