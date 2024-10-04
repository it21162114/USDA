import React from 'react'

function AddEmployee({showModal, setShowModal}) {

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex={-1} role='dialog' style={{ display: showModal ? 'block' : 'none' }}>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5>Add Employee</h5>
                        <button type='button' className='btn-close' onClick={() => handleClose()}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee