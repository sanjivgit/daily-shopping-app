import { Request, Response } from "express";
import { resObj } from "./types";
import { sendResponse } from "./sendResponse";

const CommonRes = Object.freeze({
  CONFLICT_ERROR: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      409,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  VALIDATION_ERROR: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      403,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  SERVER_ERROR: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      500,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  CREATED: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      true,
      message,
      data,
      201,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  SUCCESS: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  NOT_FOUND: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      false,
      message,
      data,
      404,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  BAD_REQUEST: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      400,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  UNAUTHORISED: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      401,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  DEFAULT: "The underlying {kind} for model {model} does not exist.",
});

export default CommonRes;
