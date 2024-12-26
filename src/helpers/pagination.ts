const pagination = (pageRecord: number, page: number) => {
  let rawOffset = page * pageRecord - pageRecord;
  return { pageRecord, rawOffset };
};

export default pagination;
