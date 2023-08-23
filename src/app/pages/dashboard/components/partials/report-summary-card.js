import React, { useMemo } from "react"
import { useQueryResponseData, useQueryResponseLoading } from "../../core/QueryResponseProvider";
import { prepareTruecallerCardData } from "../../../../modules/helpers/helper";
import Card from "../../../../modules/partials/truecaller/reports/cards/Card";


export default function ReportSummaryCard() {
  const users = useQueryResponseData();
  const loading = useQueryResponseLoading()
  let data = useMemo(() => users, [users])
  data = data?.length === 2 ? data[0] : data;

  if (loading) return <h3 style={{ textAlign: 'center' }}>loading...</h3>;

  const cards = [
    {
      id: 1,
      title: '1st Time Subscriptions',
      data: prepareTruecallerCardData(data, 'new_success_cnt'),
      backgroundColor: 'rgb(203 244 221)'
    },
    {
      id: 2,
      title: '1st Attempt Failed',
      data: prepareTruecallerCardData(data, 'new_fail_cnt'),
      backgroundColor: 'rgb(244 203 203)'
    },
    {
      id: 3,
      title: '1st Time Subscription Revenue',
      data: prepareTruecallerCardData(data, 'new_price'),
      backgroundColor: 'rgb(159 202 237)'
    },
    {
      id: 4,
      title: 'Subscription Renewals',
      data: prepareTruecallerCardData(data, 'renew_success_cnt'),
      backgroundColor: 'rgb(203 244 221)'
    },
    {
      id: 5,
      title: 'Renewal Attempt Failed',
      data: prepareTruecallerCardData(data, 'renew_fail_cnt'),
      backgroundColor: 'rgb(244 203 203)'
    },
    {
      id: 6,
      title: 'Renewal Subscription Revenue',
      data: prepareTruecallerCardData(data, 'renew_price'),
      backgroundColor: 'rgb(159 202 237)'
    },
  ];

  return (
    <div className='card mb-8'>
      <div className='card-body p-4'>
        <div className="row g-5 g-xl-8">
          {cards.map((item, indx) => (
            <Card
              title={item?.title}
              data={item?.data}
              backgroundColor={item?.backgroundColor}
              key={indx}
              hasPrice={[2, 5].includes(indx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};