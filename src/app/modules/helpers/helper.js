import { months, months30 } from "../../constants/constants";



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