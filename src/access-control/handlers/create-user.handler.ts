import { User } from "src/users/entities/user.entity";
import { AppAbility } from "../casl-ability.factory";
import { IPolicyHandler } from "../policy-handler.interface";
import { Action } from "src/auth/enums/action.enum";

export class CreateUserPolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Create, User);
    }
}