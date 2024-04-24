import { AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery, createMongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "src/auth/enums/action.enum";
import { Role } from "src/auth/enums/role.enum";
import { User } from "src/users/entities/user.entity";

type Subjects = InferSubjects<typeof User> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);
    switch (user.role) {
      case Role.ADMIN:
        can(Action.Manage, 'all');
        break;
      case Role.USER:
      default:
        can([Action.Read, Action.Update], User, { id: { $eq: user.id} });
        cannot([Action.Manage], User, { id: { $ne: user.id} });
        break;
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
