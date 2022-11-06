import {FC, useState} from 'react'
import {Modal, Table} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const DetailsIconCell: FC<any> = ({activationHistory}: any) => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <a
        href='#'
        className={`${
          activationHistory ? '' : 'disabled'
        } btn btn-icon btn-light-primary btn-active-light-pribtn-light-primary w-30px h-30px`}
        data-kt-docs-table-filter='edit_row'
        onClick={() => setShowModal(true)}
      >
        <i className='fas fa-eye fs-6' />
      </a>
      <Modal size='xl'  show={showModal} scrollable onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Activation History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size='xxl'>
            <thead>
              <tr>
                <th className='fw-bold'>SL</th>
                <th className='fw-bold'>IMEI 1</th>
                <th className='fw-bold'>IMEI 2</th>
                <th className='fw-bold'>MSISDN</th>
                <th className='fw-bold'>Model</th>
                <th className='fw-bold'>Device Type</th>
                <th className='fw-bold'>Thana</th>
                <th className='fw-bold'>District</th>
                <th className='fw-bold'>Division</th>
                <th className='fw-bold'>Address</th>
                <th className='fw-bold'>Entry Time</th>
                <th className='fw-bold'>Operator</th>
              </tr>
            </thead>
            <tbody>
              {activationHistory &&
                activationHistory?.length > 0 &&
                activationHistory?.map((item: any, indx: any) => (
                  <tr>
                    <td>{indx + 1}</td>
                    <td>{item?.firstImei}</td>
                    <td>{item?.secondImei}</td>
                    <td>{item?.msisdn}</td>
                    <td>{item?.model}</td>
                    <td>{item?.deviceType}</td>
                    <td>{item?.thana}</td>
                    <td>{item?.district}</td>
                    <td>{item?.division}</td>
                    <td>{item?.addressDetails}</td>
                    <td>{item?.createdAt}</td>
                    <td>{item?.operator}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export {DetailsIconCell}
