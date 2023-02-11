import { BadRequestError } from "@/models/errors";
import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export type RequestValidation<TParams, TQuery, TBody> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<TBody>;
};

// Validate request params, query and body using zod schemas
// If the request is invalid, throw an invalid request error
export const validateRequest: <TParams, TQuery, TBody>(
  schemas: RequestValidation<TParams, TQuery, TBody>,
) => RequestHandler<TParams, unknown, TBody, TQuery> =
  ({ params, query, body }) =>
  (req, _, next) => {
    const zodErrors: ZodError[] = [];
    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        zodErrors.push(parsed.error);
      }
    }
    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        zodErrors.push(parsed.error);
      }
    }
    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        zodErrors.push(parsed.error);
      }
    }
    if (zodErrors.length > 0) {
      throw new BadRequestError(zodErrors.toString());
    }
    next();
  };
