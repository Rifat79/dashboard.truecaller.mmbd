
import Chart from 'react-apexcharts'

export default function BarChart({settings = {}, height=350, width=450, total_active=0, total_field_name='Total Active'}) {
    return (
        <div className="col">
            {/*begin::Card widget 8*/}
            <div className="card overflow-hidden border border-dashed border-gray-400 rounded-3 card-flush ">
                <div className="card-header py-3 px-4">
                    <div className="clearfix">
                        <div className="d-flex align-items-center">
                            {/* <span className="fs-4 fw-bold text-gray-400 align-self-start me-1>">
                                ৳
                            </span> */}
                            <span className="fs-2hx fw-bolder text-gray-800 me-2 lh-1">
                                {total_active}
                            </span>
                        </div>
                        <span className="fs-6 fw-bold text-gray-400">
                            {total_field_name}
                        </span>
                    </div>
                    {/* <div className="card-toolbar">
                        <a
                            href="#"
                            className="btn btn-icon btn-light-primary btn-active-light-primary w-30px h-30px me-3"
                            data-kt-docs-table-filter="edit_row"
                        >
                            <i className="fas fa-eye fs-6" />
                        </a>
                    </div> */}
                </div>
                {/*begin::Card body*/}
                <div className="card-body p-0">
                    <div className="separator separator-dashed border-dark" />
                    <Chart className='card-xl-stretch mb-xl-8' {...settings} type='bar' width={width} height={height}/>
                </div>
            </div>
        </div>
    )
};