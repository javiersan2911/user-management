import { AppAbility } from "./casl-ability.factory";


export interface IPolicyHandler {
  handle(ability: AppAbility, request?: Request): boolean;
}