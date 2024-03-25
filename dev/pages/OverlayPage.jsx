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
            <h4 style={{marginLeft:"1.5rem"}}>Overlay</h4>
            <section className="overlay-container">
                <Overlay overlay={<OverlayElement/>} show={show} onToggle={handleToggle}>
                    <Button>Click</Button>
                </Overlay>
            </section>
        </>
    )
}

export default OverlayPage