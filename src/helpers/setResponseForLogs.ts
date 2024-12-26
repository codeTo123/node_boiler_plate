const fs = require("fs");
import moment from "moment";

export default async function setResponseForApiLog(obj: any) {
  try {
    let resData =
      "------------------------------------------------------------------------------------------\n";
    resData += "";
    resData += "Time : " + moment().format("YYYY-MM-DD HH:mm:ss") + "\n";
    resData +=
      "Url : " + `${obj.req?.hostname}:8800${obj.req?.originalUrl}` + "\n";
    resData += "Method : " + obj.req?.method + "\n";
    resData += "Headers : " + JSON.stringify(obj.req?.headers) + "\n";
    resData += "Body : " + JSON.stringify(obj.req?.body) + "\n";
    resData += "Params : " + JSON.stringify(obj.req?.params) + "\n";
    resData += "Query Data : " + JSON.stringify(obj.query) + "\n";
    resData += "Status code : " + obj.res?.statusCode + "\n";
    resData +=
      "---------------------------------------------------------------------------------------------\n";
    fs.appendFileSync(
      "logs/" + "resLogs" + moment(new Date()).format("DD-MM-YYYY") + ".txt",
      "\n" + resData
    );
  } catch (error: any) {
    return error;
  }
}
