

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