export function errorHandler(err, req, res, next) {
  let [statusError, message] = err.message.split("+")
  let statusCode;

  if(!message && !statusError) {
     message = "해당 접속 URL을 찾을 수 없습니다."
     statusError = "Not Found";
  }

  switch(statusError){
    case "Bad Request":
      statusCode = 400
      break;
    case "Not Found":
      statusCode = 404
      break;
    case "Forbidden": 
      statusCode = 403
      break;
    case "Unauthorized":
      statusCode = 401
      break;
    default:
      statusCode = 500
      message = "Interncal Server Error"
      console.log(err.stack)
      break;
  }
 

  return res.status(statusCode).send({status_code: statusCode, message});
}