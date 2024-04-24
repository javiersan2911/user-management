import { CreateUserDto } from "./create-user.dto";

export class CreateUserResponseDto extends CreateUserDto{
    createdDateTime: Date;
    createdBy: string;
    lastChangedDateTime: Date;
    lastChangedBy: string;
    id: string;
}
