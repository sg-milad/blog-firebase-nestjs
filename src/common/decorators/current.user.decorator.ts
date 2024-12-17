import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const User = createParamDecorator(
    (data: keyof DecodedIdToken | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!data) return user;

        return user?.[data];
    }
);

interface DecodedIdToken {
    uid: string;
    email?: string;
    role?: string;
    [key: string]: any;
}