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
        return {...item, label: item[accessor], value: item[accessor]}
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
  if(month == 'february') {
    return '28';
  } else if(months30.indexOf(month) != -1) {
    return '30';
  } else {
    return '31';
  }
};

export const getDateRangeByMonth = (month = '') => { console.log('month: ', month)
  if(!month) {
    return undefined;
  }

  const monthName = month?.split('-')[0];
  const year = month?.split('-')[1];
  if(!year || !monthName) {
    return undefined;
  }

  const monthId = months.filter(e => e.name == monthName.toLocaleLowerCase())[0]?.id;

  const startDate = `${monthId}-01-${year}`;
  const endDate = `${monthId}-${getMonthLastDate(monthName.toLocaleLowerCase())}-${year}`;
  console.log(startDate, ': ', endDate)

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
          style={{textAlign: 'center'}}
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

export const getDateRange = (obj) => { console.log('obj: ', obj)
  if(!obj || !obj?.start_date || !obj?.end_date) {
    return ' LifeTime'
  };

  return (`
    ${moment(obj?.start_date).format('ll')} to ${moment(obj?.end_date).format('ll')}
  `)
};

export const getFilterModel = (obj) => {
  if(!obj?.model) {
    return ''
  };

  return (`
    (Model: ${obj?.model})
  `)
};

export const getFilterKeyword = (obj) => {
  if(!obj?.keyword) {
    return ''
  };

  return (`
    (Keyword: ${obj?.keyword})
  `)
};

export const getFilterGame = (obj) => {
  if(!obj?.game) {
    return ''
  };

  return (`
    (Keyword: ${obj?.game})
  `)
};

export const isDate = (date) => {
  if(!date) return false; 
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

export const isChartRequired = (obj, device_type_not) => {
  if(!obj?.deviceType) return true;

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
  return getDiscrepencyGP(discrepency, billingFee) * (1 - partnerShare);
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
  return getDiscrepencyBL(discrepency, billingFee) * (1 - partnerShare);
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
  return getDiscrepencyRobi(discrepency, billingFee) * (1 - partnerShare);
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
  return getDiscrepencyAirtel(discrepency, billingFee) * (1 - partnerShare);
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
  return getDiscrepencyTeletalk(discrepency, billingFee) * (1 - partnerShare);
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

export const getOrgId = (list = [], key='') => { console.log('list: ', list, key)
  if(!list || list?.length == 0) {
    return null;
  }

  const fil = list.filter(e => e?.organizationName == key);
  console.log('fil: ', fil)
  if(fil?.length >= 1) {
    return fil[0]?.id;
  } else return null;
}

export const makeDateString = (str) => {
  const string = str.split(' ')[0];
  if(!string) {
    return null;
  } else {
    const ar = string.split('-');
    if(ar?.length == 3) {
      return new Date(`${ar[2]}-${ar[0]}-${ar[1]}`)
    } else {
      return null;
    }
  }
}