import { ContextDto } from '../dto/context.dto';

export function setContext<T>(dto: T, headers: { [key: string]: string}): ContextDto & T {
  const accessToken = headers['access-token'];

  return {
    ...dto,
    accessToken,
  }
}
