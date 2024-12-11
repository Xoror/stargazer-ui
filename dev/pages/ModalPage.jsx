import { useEffect, useState } from 'react'

import Button from "../../src/Button"
import Modal from "../../src/Modal"
import useScreenSize from "../../src/hooks/useScreenSize"

const ModalPage = () => {
    const [showModal, setShowModal] = useState(false)
    const {width} = useScreenSize()
    const onHide = (event) => {
        setShowModal(false)
    }
    return (
        <>
            <Button onClick={(event) => setShowModal(true)}>
                Modal
            </Button>
            <Modal fill show={showModal} onHide={onHide} size='md'>
                <Modal.Header closeButton>
                    <Modal.Title>Test Modal: {width}</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <p>
                            test
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <small>Test footer</small>
                        <button type="button" onClick={(event) => setShowModal(false)}>Cancel</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default ModalPage