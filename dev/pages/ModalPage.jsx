import { useEffect, useState } from 'react'

import Button from "../../src/Button"
import Modal from "../../src/Modal"

const ModalPage = () => {
    const [showModal, setShowModal] = useState(false)
    const onHide = (event) => {
        console.log("test")
        setShowModal(false)
    }
    return (
        <>
            <Button onClick={(event) => setShowModal(true)}>
                Modal
            </Button>
            <Modal show={showModal} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Test Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Test Body</p>
                </Modal.Body>
                <Modal.Footer>
                    <small>Test footer</small>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPage