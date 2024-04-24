import { SetMetadata } from "@nestjs/common";
import { IPolicyHandler } from "../policy-handler.interface";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: IPolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);