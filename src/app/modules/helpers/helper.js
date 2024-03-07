import moment from "moment";
import { months, months30 } from "../../constants/constants";

const btrcShare = 0.065;
const gpShare = 0.5;
const blShare = 0.6;
const robiShare = 0.7;
const airtelShare = 0.7;
const teletalkShare = 0.6;

export const reactSelectify = (list = [{}], accessor = 'id') => {
  return list.map(item => {
    return { ...item, label: item[accessor], value: item[accessor] }
  });
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
};

export const getVal = (ar = [], accessor = 'value', value = 'value') => {
  return ar.filter(e => e[accessor] == value)[0];
};

const getMonthLastDate = (month) => {
  if (month == 'february') {
    return '28';
  } else if (months30.indexOf(month) != -1) {
    return '30';
  } else {
    return '31';
  }
};

export const getDateRangeByMonth = (month = '') => {
  if (!month) {
    return undefined;
  }

  const monthName = month?.split('-')[0];
  const year = month?.split('-')[1];
  if (!year || !monthName) {
    return undefined;
  }

  const monthId = months.filter(e => e.name == monthName.toLocaleLowerCase())[0]?.id;

  const startDate = `${monthId}-01-${year}`;
  const endDate = `${monthId}-${getMonthLastDate(monthName.toLocaleLowerCase())}-${year}`;


  return ({
    start_date: startDate,
    end_date: endDate
  });
}

export const createGroup = (groupName, options, setValue) => {
  return {
    label: (() => {
      return (
        <div
          style={{ textAlign: 'center' }}
          className="text-dark fw-bolder"
          onClick={() =>
            setValue(value =>
              value.concat(options.filter(grpOpt => !value.includes(grpOpt)))
            )
          }
        >
          {groupName}
        </div>
      );
    })(),
    options: options
  };
};

export const getDateRange = (obj) => {
  if (!obj || !obj?.start_date || !obj?.end_date) {
    return ' LifeTime'
  };

  return (`
    ${moment(obj?.start_date, 'YYYY-MM-DD').format('ll')} to ${moment(obj?.end_date, 'YYYY-MM-DD').format('ll')}
  `)
};

export const getPackage = (obj) => {
  if (!obj || !obj?.package) {
    return '';
  }
  return ", " + obj?.package;
}

export const getPaymentStatus = (obj) => {
  if (!obj || !obj.payment_status) {
    return ''
  }

  return ", " + obj?.payment_status;
}

export const getReferenceValue = (obj) => {
  if (!obj || !obj.reference) {
    return ''
  }

  return ", " + obj?.reference;
}

export const getPurchaseType = (obj) => {
  if (!obj || !obj.purchase_type) {
    return ''
  }

  return ", " + obj?.purchase_type;
}

export const getFilterModel = (obj) => {
  if (!obj?.model) {
    return ''
  };

  return (`
    (Model: ${obj?.model})
  `)
};

export const getFilterKeyword = (obj) => {
  if (!obj?.keyword) {
    return ''
  };

  return (`
    (Keyword: ${obj?.keyword})
  `)
};

export const getFilterGame = (obj) => {
  if (!obj?.game) {
    return ''
  };

  return (`
    (Keyword: ${obj?.game})
  `)
};

export const isDate = (date) => {
  if (!date) return false;
  const d = date.split('-');
  if (d?.length < 3) return false;
  return (new Date(`${d[2]}-${d[0]}-${d[1]} 12:00:00`) !== "Invalid Date") && !isNaN(new Date(`${d[2]}-${d[0]}-${d[1]} 12:00:00`));
}

export const isChartRequired = (obj, device_type_not) => {
  if (!obj?.deviceType) return true;

  return obj?.deviceType != device_type_not;
}

export const containsDeviceType = (obj) => {
  return obj?.deviceType ? true : false;
};

//for GP
export const getBillingShareGP = (billingFee) => {
  return (1 - btrcShare) * (1 - gpShare) * (1 - billingFee);
};
export const getDiscrepencyGP = (discrepency, billingFee) => {
  return getBillingShareGP(billingFee) * (1 - discrepency);
};
export const getPartnerShareGP = (discrepency, billingFee, partnerShare) => {
  return getDiscrepencyGP(discrepency, billingFee) * partnerShare;
};
export const getAitGP = (discrepency, billingFee, partnerShare, ait) => {
  return getPartnerShareGP(discrepency, billingFee, partnerShare) * (1 - ait);
};
export const getVatGP = (discrepency, billingFee, partnerShare, ait, vat) => {
  return getAitGP(discrepency, billingFee, partnerShare, ait) * (1 - vat);
};
export const getGrandShareGP = (values) => {
  return getVatGP(values?.discrepancy, values?.billingFee, values?.partnerShare, values?.ait, values?.vat).toFixed(5);
};
//

//for BL
export const getBillingShareBL = (billingFee) => {
  return (1 - btrcShare) * (1 - blShare) * (1 - billingFee);
};
export const getDiscrepencyBL = (discrepency, billingFee) => {
  return getBillingShareBL(billingFee) * (1 - discrepency);
};
export const getPartnerShareBL = (discrepency, billingFee, partnerShare) => {
  return getDiscrepencyBL(discrepency, billingFee) * partnerShare;
};
export const getAitBL = (discrepency, billingFee, partnerShare, ait) => {
  return getPartnerShareBL(discrepency, billingFee, partnerShare) * (1 - ait);
};
export const getVatBL = (discrepency, billingFee, partnerShare, ait, vat) => {
  return getAitBL(discrepency, billingFee, partnerShare, ait) * (1 - vat);
};
export const getGrandShareBL = (values) => {
  return getVatBL(values?.discrepancy, values?.billingFee, values?.partnerShare, values?.ait, values?.vat).toFixed(5);
};
//

//for Robi
export const getBillingShareRobi = (billingFee) => {
  return (1 - btrcShare) * (1 - robiShare) * (1 - billingFee);
};
export const getDiscrepencyRobi = (discrepency, billingFee) => {
  return getBillingShareRobi(billingFee) * (1 - discrepency);
};
export const getPartnerShareRobi = (discrepency, billingFee, partnerShare) => {
  return getDiscrepencyRobi(discrepency, billingFee) * partnerShare;
};
export const getAitRobi = (discrepency, billingFee, partnerShare, ait) => {
  return getPartnerShareRobi(discrepency, billingFee, partnerShare) * (1 - ait);
};
export const getVatRobi = (discrepency, billingFee, partnerShare, ait, vat) => {
  return getAitRobi(discrepency, billingFee, partnerShare, ait) * (1 - vat);
};
export const getGrandShareRobi = (values) => {
  return getVatRobi(values?.discrepancy, values?.billingFee, values?.partnerShare, values?.ait, values?.vat).toFixed(5);
};
//

// for Airtel
export const getBillingShareAirtel = (billingFee) => {
  return (1 - btrcShare) * (1 - airtelShare) * (1 - billingFee);
};
export const getDiscrepencyAirtel = (discrepency, billingFee) => {
  return getBillingShareAirtel(billingFee) * (1 - discrepency);
};
export const getPartnerShareAirtel = (discrepency, billingFee, partnerShare) => {
  return getDiscrepencyAirtel(discrepency, billingFee) * partnerShare;
};
export const getAitAirtel = (discrepency, billingFee, partnerShare, ait) => {
  return getPartnerShareAirtel(discrepency, billingFee, partnerShare) * (1 - ait);
};
export const getVatAirtel = (discrepency, billingFee, partnerShare, ait, vat) => {
  return getAitAirtel(discrepency, billingFee, partnerShare, ait) * (1 - vat);
};
export const getGrandShareAirtel = (values) => {
  return getVatAirtel(values?.discrepancy, values?.billingFee, values?.partnerShare, values?.ait, values?.vat).toFixed(5);
};
//

//for Teletalk
export const getBillingShareTeletalk = (billingFee) => {
  return (1 - btrcShare) * (1 - teletalkShare) * (1 - billingFee);
};
export const getDiscrepencyTeletalk = (discrepency, billingFee) => {
  return getBillingShareTeletalk(billingFee) * (1 - discrepency);
};
export const getPartnerShareTeletalk = (discrepency, billingFee, partnerShare) => {
  return getDiscrepencyTeletalk(discrepency, billingFee) * partnerShare;
};
export const getAitTeletalk = (discrepency, billingFee, partnerShare, ait) => {
  return getPartnerShareTeletalk(discrepency, billingFee, partnerShare) * (1 - ait);
};
export const getVatTeletalk = (discrepency, billingFee, partnerShare, ait, vat) => {
  return getAitTeletalk(discrepency, billingFee, partnerShare, ait) * (1 - vat);
};
export const getGrandShareTeletalk = (values) => {
  return getVatTeletalk(values?.discrepancy, values?.billingFee, values?.partnerShare, values?.ait, values?.vat).toFixed(5);
};

//

export const getOrgId = (list = [], key = '') => {
  if (!list || list?.length == 0) {
    return null;
  }

  const fil = list.filter(e => e?.organizationName == key);

  if (fil?.length >= 1) {
    return fil[0]?.id;
  } else return null;
}

export const makeDateString = (str) => {
  const string = str.split(' ')[0];
  if (!string) {
    return null;
  } else {
    const ar = string.split('-');
    if (ar?.length == 3) {
      return new Date(`${ar[2]}-${ar[0]}-${ar[1]}`)
    } else {
      return null;
    }
  }
}

export const prepareTruecallerCardData = (data = [], fieldName = '') => {
  let new_data = { daily: 0, weekly: 0, monthly: 0, total: 0 };

  for (let i = 0; i < data?.length; i++) {
    const col = data[i];

    if (col?.package_name === 'Daily Pack') {
      new_data = {
        ...new_data,
        daily: Number(new_data?.daily || 0) + Number(col?.[fieldName] || 0),
        total: Number(new_data?.total || 0) + Number(col?.[fieldName] || 0)
      }
    } else if (col?.package_name === 'Weekly Pack') {
      new_data = {
        ...new_data,
        weekly: Number(new_data?.weekly || 0) + Number(col?.[fieldName] || 0),
        total: Number(new_data?.total || 0) + Number(col?.[fieldName] || 0)
      }
    } else if (col?.package_name === 'Monthly Pack') {
      new_data = {
        ...new_data,
        monthly: Number(new_data?.monthly || 0) + Number(col?.[fieldName] || 0),
        total: Number(new_data?.total || 0)+ Number(col?.[fieldName] || 0)
      }
    }
  }

  return new_data;
}

export const prepareMonthlyCountData = (dates, data) => {

}

const getMonthFromDateString = (date_str) => {
  const date = new Date(date_str);
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  return monthName;
}

export const prepareTruecallerChartData = (data) => {
  const options = {
    chart: {
      height: 350,
        type: 'line',
          zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 2, 3],
        curve: 'straight',
          dashArray: [0, 0, 0]
    },
    title: {
      text: 'Charge Count',
        align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
        hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [],
      },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ""
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + ""
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
      }
  }

  const daily = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Daily Pack")
    : [];

  const weekly = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Weekly Pack")
    : [];

  const monthly = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Monthly Pack")
    : [];

  const dates = [...new Set(data.map(obj => obj?.rdate))];
  dates.sort();

  const diff = getTimeDifferenceInDay(dates[0], dates[dates.length - 1]);
  const months = new Set();

  const data_daily = [];
  const data_weekly = [];
  const data_monthly = [];

  if (diff > (2 * 30)) {
    dates.forEach(item => {
      months.add(getMonthFromDateString(item));
    });
    
    months.forEach(item => {
      const in_daily = daily.filter(e => getMonthFromDateString(e?.rdate) === item);
      const in_weekly = weekly.filter(e => getMonthFromDateString(e?.rdate) === item);
      const in_monthly = monthly.filter(e => getMonthFromDateString(e?.rdate) === item);

      if (in_daily) {
        const success_cnt = in_daily.reduce((sum, cur) => {
          return sum + (cur?.new_success_cnt || 0) + (cur?.renew_success_cnt || 0);
        }, 0);

        data_daily.push(success_cnt);
      } else {
        data_daily.push(0)
      }

      if (in_weekly) {
        const success_cnt = in_weekly.reduce((sum, cur) => {
          return sum + (cur?.new_success_cnt || 0) + (cur?.renew_success_cnt || 0);
        }, 0);

        data_weekly.push(success_cnt);
      } else {
        data_weekly.push(0)
      }

      if (in_monthly) {
        const success_cnt = in_monthly.reduce((sum, cur) => {
          return sum + (cur?.new_success_cnt || 0) + (cur?.renew_success_cnt || 0);
        }, 0);

        data_monthly.push(success_cnt);
      } else {
        data_monthly.push(0)
      }
    });
    
    return {
      series: [
        {
          name: 'Daily',
          data: data_daily
        },
        {
          name: 'Weekly ',
          data: data_weekly
        },
        {
          name: 'Monthly ',
          data: data_monthly
        }
      ],
      options: {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: [...months]
        }
      }
    }
  }

  dates.forEach(item => {
    const in_daily = daily.filter(e => e?.rdate === item)[0];
    const in_weekly = weekly.filter(e => e?.rdate === item)[0];
    const in_monthly = monthly.filter(e => e?.rdate === item)[0];

    if(in_daily) {
      data_daily.push((in_daily?.new_success_cnt || 0) + (in_daily?.renew_success_cnt || 0));
    } else {
      data_daily.push(0)
    }

    if (in_weekly) {
      data_weekly.push((in_weekly?.new_success_cnt || 0) + (in_weekly?.renew_success_cnt || 0));
    } else {
      data_weekly.push(0)
    }

    if (in_monthly) {
      data_monthly.push((in_monthly?.new_success_cnt || 0) + (in_monthly?.renew_success_cnt || 0));
    } else {
      data_monthly.push(0)
    }
  });

  return {
    series: [
      {
        name: 'Daily',
        data: data_daily
      },
      {
        name: 'Weekly ',
        data: data_weekly
      },
      {
        name: 'Monthly ',
        data: data_monthly
      }
    ],
    options: {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: dates
      }
    }
  }
};

export const prepareTruecallerRevenueChartData = (data) => {
  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FFF200'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 2, 3, 4],
      curve: 'straight',
      dashArray: [0, 0, 0]
    },
    title: {
      text: 'Topline Revenue',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ""
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + ""
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  }

  const daily = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Daily Pack")
    : [];

  const weekly = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Weekly Pack")
    : [];

  const monthly = Array.isArray(data) ?
    data.filter(e => e?.package_name === "Monthly Pack")
    : [];

  const dates = [...new Set(data.map(obj => obj?.rdate))];
  dates.sort();

  const diff = getTimeDifferenceInDay(dates[0], dates[dates.length - 1]);
  const months = new Set();

  const data_daily = [];
  const data_weekly = [];
  const data_monthly = [];
  const data_total = [];

  if (diff > (2 * 30)) {
    dates.forEach(item => {
      months.add(getMonthFromDateString(item));
    });

    months.forEach(item => {
      const in_daily = daily.filter(e => getMonthFromDateString(e?.rdate) === item);
      const in_weekly = weekly.filter(e => getMonthFromDateString(e?.rdate) === item);
      const in_monthly = monthly.filter(e => getMonthFromDateString(e?.rdate) === item);

      if (in_daily) {
        const success_cnt = in_daily.reduce((sum, cur) => {
          return sum + (cur?.new_price || 0) + (cur?.renew_price || 0);
        }, 0);

        data_daily.push(success_cnt);
      } else {
        data_daily.push(0)
      }

      if (in_weekly) {
        const success_cnt = in_weekly.reduce((sum, cur) => {
          return sum + (cur?.new_price || 0) + (cur?.renew_price || 0);
        }, 0);

        data_weekly.push(success_cnt);
      } else {
        data_weekly.push(0)
      }

      if (in_monthly) {
        const success_cnt = in_monthly.reduce((sum, cur) => {
          return sum + (cur?.new_price || 0) + (cur?.renew_price || 0);
        }, 0);

        data_monthly.push(success_cnt);
      } else {
        data_monthly.push(0)
      }
    });

    return {
      series: [
        {
          name: 'Daily',
          data: data_daily
        },
        {
          name: 'Weekly ',
          data: data_weekly
        },
        {
          name: 'Monthly ',
          data: data_monthly
        }
      ],
      options: {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: [...months]
        }
      }
    }
  }

  dates.forEach(item => {
    const in_daily = daily.filter(e => e?.rdate === item)[0];
    const in_weekly = weekly.filter(e => e?.rdate === item)[0];
    const in_monthly = monthly.filter(e => e?.rdate === item)[0];

    let daily_price = 0;
    let weekly_price = 0;
    let monthly_price = 0;
    let total = 0;

    if (in_daily) {
      daily_price = (in_daily?.new_price || 0) + (in_daily?.renew_price || 0);
      data_daily.push(daily_price);
    } else {
      data_daily.push(0)
    }

    if (in_weekly) {
      weekly_price = (in_weekly?.new_price || 0) + (in_weekly?.renew_price || 0);
      data_weekly.push(weekly_price);
    } else {
      data_weekly.push(0)
    }

    if (in_monthly) {
      monthly_price = (in_monthly?.new_price || 0) + (in_monthly?.renew_price || 0);
      data_monthly.push(monthly_price);
    } else {
      data_monthly.push(0)
    }

    total = daily_price + weekly_price + monthly_price;
    data_total.push(total);

  });

  return {
    series: [
      {
        name: 'Daily',
        data: data_daily
      },
      {
        name: 'Weekly',
        data: data_weekly
      },
      {
        name: 'Monthly',
        data: data_monthly
      },
    ],
    options: {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: dates
      }
    }
  }
};

export const getTimeDifferenceInDay = (start_date, end_date) => {
  const start = new Date(start_date).getTime();
  const end = new Date(end_date).getTime();

  if(!start || !end) return 0;

  const diffInSec = (end - start) / 1000;

  if(!diffInSec) return 0;

  return Math.ceil(diffInSec / 86400);
};  

