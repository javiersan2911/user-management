import { User } from "src/users/entities/user.entity";
import { AppAbility } from "../casl-ability.factory";
import { IPolicyHandler } from "../policy-handler.interface";
import { Action } from "src/auth/enums/action.enum";

export class ReadUserPolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility, request) {
        const user = new User();
        user.id = request.params?.id;
        return ability.can(Action.Read, user);
    }
}