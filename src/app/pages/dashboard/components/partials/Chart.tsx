
import React, { useMemo } from 'react'
import LineApexChart from '../../../../../_metronic/partials/widgets/charts/LineApexChat'
import { getTimeDifferenceInDay, prepareTruecallerChartData, prepareTruecallerRevenueChartData } from '../../../../modules/helpers/helper';
import { useQueryResponseData, useQueryResponseLoading } from '../../core/QueryResponseProvider';

const DashboardChart = () => {
    const users = useQueryResponseData();
    const loading = useQueryResponseLoading()
    let data = useMemo(() => users, [users])
    data = data?.length === 2 ? data[0] : data;

    if (loading) return <h3 style={{ textAlign: 'center' }}>loading...</h3>;


    return (
        <div className='card card-flush overflow-hidden h-lg-100'>
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
