import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {

    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    name:string;
}
