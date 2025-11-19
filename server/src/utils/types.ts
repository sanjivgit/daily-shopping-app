import { Response } from "express";

type resObj = {
  action: string;
  apiId: string;
  version: string;
};

interface ApiResponse {
  json: any;
  responseCode: number;
  res: Response;
  status?: boolean | true;
}

export type {
  resObj,
  ApiResponse
};
