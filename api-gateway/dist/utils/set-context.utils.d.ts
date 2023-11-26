import { ContextDto } from '../dto/context.dto';
export declare function setContext<T>(dto: T, headers: {
    [key: string]: string;
}): ContextDto & T;
