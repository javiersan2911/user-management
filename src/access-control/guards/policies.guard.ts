import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "../casl-ability.factory";
import { IPolicyHandler } from "../policy-handler.interface";
import { CHECK_POLICIES_KEY } from "../decorators/check-policies.decorator";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const policyHandlers =
            this.reflector.get<IPolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];

        const request = context.switchToHttp().getRequest();

        const { user }: { user: User } = request;
        const ability = this.caslAbilityFactory.createForUser(user);

        return policyHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability, request),
        );
    }

    private execPolicyHandler(handler: IPolicyHandler, ability: AppAbility, request: Request) {
        return handler.handle(ability, request);
    }
}