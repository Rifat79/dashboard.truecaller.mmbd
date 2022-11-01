import {FC} from 'react'

const DownloadIconCell: FC<any> = ({user}: any) => {
  
  const filterData = () => {
    // navigate(`/activation/reports/overview?model=${model}`)
    window.location.href = user?.url;
  };
  return (
    <>
      {user?.status ? (
        <a
          href='#'
          className='btn btn-icon btn-light-primary btn-active-light-pribtn-light-primary w-30px h-30px'
          data-kt-docs-table-filter='edit_row'
          onClick={filterData}
        >
          <i className='fa fa-download fs-6' />
        </a>
      ) : (
        <div className="badge badge-secondary fw-bolder">processing</div>
      )}
    </>
  )
}

export {DownloadIconCell}
