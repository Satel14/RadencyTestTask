export const getDateFromString = (str) => {
    let resArr = str.match(/\d{1,2}(\D)\d{1,2}\1\d{4}/g);
    let resStr = resArr?.toString();
    return resStr ? resStr : "";
  };
