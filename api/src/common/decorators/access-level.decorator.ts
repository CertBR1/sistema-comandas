import { SetMetadata } from '@nestjs/common';

export const AccessLevel = (...niveis: string[]) => SetMetadata('nivelAcesso', niveis);
