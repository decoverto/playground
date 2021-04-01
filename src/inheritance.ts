import {Decoverto, inherits, model, property} from 'decoverto';

@model({
    inheritance: {
        discriminatorKey: 'type',
        strategy: 'discriminator',
    },
})
abstract class Vehicle {

    @property()
    name: string;
}

@model()
abstract class MotorVehicle extends Vehicle {

    /**
     * Power in kW.
     */
    @property()
    power: number;
}

@inherits({discriminator: 'Car'})
@model()
class Car extends MotorVehicle {

    @property()
    entertainmentSystem: boolean;
}

@inherits({discriminator: 'Bicycle'})
@model()
class Bicycle extends Vehicle {

    @property()
    saddleMaximumLengthInCm: number;
}

const decoverto = new Decoverto();
const typeHandler = decoverto.type(Vehicle);
const subject = [
    {
        name: 'SuperVroom Street Racer',
        saddleMaximumLengthInCm: 30,
        type: 'Bicycle',
    },
    {
        name: 'AF 4C 2017',
        entertainmentSystem: false,
        power: 177,
        type: 'Car',
    },
    {
        name: 'BWM 2M 2021',
        entertainmentSystem: true,
        power: 302,
        type: 'Car',
    },
];
const result = typeHandler.plainToInstanceArray(subject);

console.log('instances', result);
console.log('plain', typeHandler.instanceArrayToPlain(result));
