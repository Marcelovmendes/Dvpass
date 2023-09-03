import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title: string;
    
    @IsNotEmpty()
    @IsString()
    text: string;

}
