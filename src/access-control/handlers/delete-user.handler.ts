import { User } from "src/users/entities/user.entity";
import { AppAbility } from "../casl-ability.factory";
import { IPolicyHandler } from "../policy-handler.interface";
import { Action } from "src/auth/enums/action.enum";

export class DeleteUserPolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Delete, User);
    }
}