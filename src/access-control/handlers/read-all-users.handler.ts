import { User } from "src/users/entities/user.entity";
import { AppAbility } from "../casl-ability.factory";
import { IPolicyHandler } from "../policy-handler.interface";
import { Action } from "src/auth/enums/action.enum";

export class ReadAllUsersPolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility) {
        const user = new User();
        return ability.can(Action.Read, user);
    }
}