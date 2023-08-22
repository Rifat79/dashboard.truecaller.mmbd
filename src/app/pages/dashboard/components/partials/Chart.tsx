
import React, { useEffect, useMemo } from 'react'
import LineApexChart from '../../../../../_metronic/partials/widgets/charts/LineApexChat'
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { getQueryRequest } from '../../../../library/api.helper';
import { ORDER_LIST } from '../../../../constants/api.constants';
import { stringifyRequestQueryWithoutPage } from '../../../../../_metronic/helpers';
import { getTimeDifferenceInDay, prepareTruecallerChartData, prepareTruecallerRevenueChartData } from '../../../../modules/helpers/helper';
import { prepareHourlyData } from '../../../../modules/helpers/chart/data.generator';
import { useQueryResponseData, useQueryResponseLoading } from '../../core/QueryResponseProvider';

const DashboardChart = () => {
    const users = useQueryResponseData();
    const loading = useQueryResponseLoading()
    let data = useMemo(() => users, [users])
    data = data?.length === 2 ? data[0] : data;

    if (loading) return <h3 style={{ textAlign: 'center' }}>loading...</h3>;


    return (
        <div className='card card-flush overflow-hidden h-lg-100'>
            <div className='card-header pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold text-dark'>Charge History</span>
                    <span className='text-gray-400 mt-1 fw-semibold fs-6'>
                        {data.length} Rows{' '}
                        {/* {Object.keys(datePickerData).length > 0
                            ? datePickerData?.selected?.label ||
                            `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                                datePickerData.end_date
                            ).format('MMM DD, YY')}`
                            : 'Today'} */}
                    </span>
                </h3>
            </div>
            <div className='card-body d-flex align-items-end p-0'>
                <LineApexChart height={400} data={prepareTruecallerChartData(data)} title='Order' yaxis='Order' />
            </div>
            <div className='card-body d-flex align-items-end p-0'>
                <LineApexChart height={400} data={prepareTruecallerRevenueChartData(data)} title='Order' yaxis='Order' />
            </div>
        </div>
    )
}

export default DashboardChart
