import { Response } from "express";
// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  ACCEPTED = 202,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T
  ): Response {
    try {
      //@ts-ignore
      res.access_level = async () => await accessLevel(res.req.user_id);
    } catch (e: any) {
      console.log(e);
    }
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = "Authentication Failure") {
    super(StatusCode.UNAUTHORIZED, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = "Not Found") {
    super(StatusCode.NOT_FOUND, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(StatusCode.FORBIDDEN, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.BAD_REQUEST, ResponseStatus.BAD_REQUEST, message);
  }
}

export class NotFoundCusResponse extends ApiResponse {
  constructor(message = "result not found") {
    super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.INTERNAL_ERROR, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class CreatedMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.CREATED, ResponseStatus.CREATED, message);
  }
}

export class NoContentMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.INTERNAL_ERROR, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  access_level: any;
  constructor(message: string, private result: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): any {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class CreatedResponse<T> extends ApiResponse {
  access_level: any;
  constructor(message: string, private result: T) {
    super(StatusCode.CREATED, ResponseStatus.CREATED, message);
  }

  send(res: Response): any {
    return super.prepare<CreatedResponse<T>>(res, this);
  }
}

export class NoContentResponse<T> extends ApiResponse {
  constructor(message: string, private result: T) {
    super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
  }

  send(res: Response): any {
    return super.prepare<NoContentResponse<T>>(res, this);
  }
}

export class FailureResponse<T> extends ApiResponse {
  constructor(message: string, private result: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<FailureResponse<T>>(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";
  constructor(message = "Access token invalid") {
    super(StatusCode.UNAUTHORIZED, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader("instruction", this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
