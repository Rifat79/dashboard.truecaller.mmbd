/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])


  return (
    <>
      <Link
        to={`/orders/print/${id}`}
        className="btn btn-sm btn-icon btn-light-info w-30px h-30px">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Product quick link</Tooltip>}
        >
          <i className="fas fa-print fs-3"></i>
        </OverlayTrigger>
      </Link>
      <Link
        to={`edit/${id}`}
        className="btn btn-sm btn-icon btn-light-primary w-30px h-30px">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Edit Order</Tooltip>}
        >
        <i className="fas fa-pencil-alt fs-3"></i>
        </OverlayTrigger>
      </Link>

    </>
  )
}

export { ActionsCell }
