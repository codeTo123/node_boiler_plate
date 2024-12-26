const { db } = require("../config/db");

const apiLogs = async (
  payload: any,
  response: any,
  actioned_by: number,
  module: any,
  action: any
) => {
  try {
    const createObj = {
      request: JSON.stringify(payload),
      response: JSON.stringify(response),
      module: module,
      action: action,
      actioned_by: actioned_by,
    };
    await db.ApiLogs.create(createObj);
  } catch (error: any) {
    return error;
  }
};
export default apiLogs;
