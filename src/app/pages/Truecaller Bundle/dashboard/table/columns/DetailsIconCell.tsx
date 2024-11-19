import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQueryRequest } from '../../core/QueryRequestProvider';

const DetailsIconCell: FC<any> = ({ data = '' }: any) => {
    const navigate = useNavigate();
    const { state } = useQueryRequest();

    const getQuery = () => {
        const query = `date=${data?.rdate}${state?.filter && state?.filter?.reference ? "&ref=" + state?.filter?.reference : ''}`;
        return query;
    }

    const filterData = () => {
        navigate(`/reports/charge-histories?${getQuery()}`)
    };

    return (
        <>
            <div
                className='btn btn-icon btn-light-primary btn-active-light-pribtn-light-primary w-30px h-30px'
                data-kt-docs-table-filter='edit_row'
                onClick={filterData}
            >
                <i className='fas fa-eye fs-6' />
            </div>
        </>
    )
}

export { DetailsIconCell }
