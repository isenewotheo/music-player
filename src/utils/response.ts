export interface HttpResponse {
  status: string;
  message: string;
  data: {} | [] | undefined;
}
function getResponse(
  status: string,
  message: string,
  data?: {} | [],
): HttpResponse {
  return {
    status: status,
    message: message,
    data: data,
  };
}
export function SuccessResponse(message: string, data?: {} | []): HttpResponse {
  return getResponse('success', message, data);
}
export function FailResponse(message: string, data?: {} | []): HttpResponse {
  return getResponse('fail', message, data);
}
export function ErrorResponse(message: string, data?: {} | []): HttpResponse {
  return getResponse('error', message, data);
}
