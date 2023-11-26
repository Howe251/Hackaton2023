import { ContextDto } from './context.dto';
export declare class CreateTaskDto extends ContextDto {
    droneId: number;
    name: string;
    description: string;
    permission: string;
}
