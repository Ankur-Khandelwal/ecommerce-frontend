import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function NewModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} size={props.size}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={props.mainButtonVariant} onClick={props.handleCloseAndSave}>
          {props.mainButtonTitle}
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            {props.secondaryButtonTitle}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default NewModal
