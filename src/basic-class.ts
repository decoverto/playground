import {model, map, MapShape, property, Decoverto} from 'decoverto';

@model()
class User {

    @property()
    createdAt: Date;

    @property()
    givenName: string;

    @property(() => String)
    referralToken: string | null;

    @property(map(() => String, () => Boolean, {shape: MapShape.Object}))
    permissions: Map<string, boolean>;
}

const typeHandler = new Decoverto().type(User);

const result = typeHandler.plainToInstance({
    createdAt: 150000000000,
    givenName: 'Mark',
    permissions: {
        canCreateProducts: true,
        canManageUsers: false,
    },
});

console.log('instance', result);

console.log('plain', typeHandler.instanceToPlain(result));
