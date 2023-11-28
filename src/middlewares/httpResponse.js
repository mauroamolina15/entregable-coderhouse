import { HTTP_STATUS } from "../constants/http";

export class HttpResponse {
  ok(res, data) {
    return res.status(HTTP_STATUS.OK.code).json({
      status: HTTP_STATUS.OK.code,
      message: HTTP_STATUS.OK.message,
      data,
    });
  }

  notFound(res, data) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).json({
      status: HTTP_STATUS.NOT_FOUND.code,
      message: HTTP_STATUS.NOT_FOUND.message,
      error: data,
    });
  }

  unauthorized(res, data) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      status: HTTP_STATUS.UNAUTHORIZED.code,
      message: HTTP_STATUS.UNAUTHORIZED.message,
      error: data,
    });
  }

  forbidden(res, data) {
    return res.status(HTTP_STATUS.FORBIDDEN.code).json({
      status: HTTP_STATUS.FORBIDDEN.code,
      message: HTTP_STATUS.FORBIDDEN.message,
      error: data,
    });
  }

  serverError(res, data) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
      error: data,
    });
  }
}
