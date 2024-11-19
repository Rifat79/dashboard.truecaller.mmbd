import {FC} from 'react'

type Props = {
  badge?: string
  color?: number
}

const BadgeCell: FC<Props> = ({badge}) => {
  const color =
    badge === 'Active'
      ? 'success'
      : badge === 'Parking'
      ? 'warning'
      : badge === 'Processing'
      ? 'primary'
      : badge === 'Canceled'
      ? 'danger' // Red for canceled, as it's typically seen as a negative status
      : badge === 'Failed'
      ? 'danger' // Red for failed, as it's also a negative status
      : badge === 'Stopped'
      ? 'secondary text-muted' // Gray for stopped, as it's inactive but not necessarily failed
      : 'secondary text-muted' // Default to secondary if no match

  return <div className={`badge badge-light-${color} fw-bolder`}>{badge}</div>
}

export {BadgeCell}
