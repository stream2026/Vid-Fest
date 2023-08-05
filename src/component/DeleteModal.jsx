import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const DeleteModal = ({ showModal, hideModal, message, deleteHandler }) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={ deleteHandler }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeleteModal
