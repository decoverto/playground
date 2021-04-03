// Uncomment the ./src/inheritance-predicate import in index.ts to run this example
import {Decoverto, inherits, model, property} from 'decoverto';

@model({
    inheritance: {
        strategy: 'predicate',
    },
})
class Vehicle {

    @property()
    name: string;
}

@model()
class MotorVehicle extends Vehicle {

    @property()
    engineDisplacement: number;
}

@inherits({matches: data => 'maxTrailerLoad' in data})
@model()
class Truck extends MotorVehicle {

    @property()
    maxTrailerLoad: number;
}

@inherits({matches: data => 'rearGears' in data})
@model()
class Bicycle extends Vehicle {

    @property()
    rearGears: number;
}

const typeHandler = new Decoverto().type(Vehicle);

const result = typeHandler.plainToInstanceArray([
    {
        engineDisplacement: 13,
        maxTrailerLoad: 50000,
        name: 'Vroom S-Haul',
    },
    {
        name: 'SuperVroom Street Racer',
        rearGears: 8,
    },
]);

console.log('instances', result);
console.log('plain', typeHandler.instanceArrayToPlain(result));
