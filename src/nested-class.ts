import {model, property, MapShape, array, map, Decoverto} from 'decoverto';

@model()
class Inn {

    @property()
    maxCapacity: number;

    @property()
    name: string;
}

@model()
class Foo {

    @property()
    inn: Inn;

    @property(map(() => Number, () => Inn, {shape: MapShape.Array}))
    map: Map<number, Inn>;

    @property(array(array(() => Inn)))
    multiDimension: Array<Array<Inn>>;

    @property(array(map(() => Date, array(array(() => Inn)), {shape: MapShape.Array})))
    overlyComplex: Array<Map<Date, Array<Array<Inn>>>>;
}

const decoverto = new Decoverto();
const typeHandler = decoverto.type(Foo);

const result = typeHandler.plainToInstance({
    inn: {maxCapacity: 55, name: `The Wayland's Forge`},
    map: [
        {key: 1, value: {maxCapacity: 60, name: `The Queen's Blessing`}},
    ],
    multiDimension: [
        [
            {maxCapacity: 25, name: 'The Winespring Inn'},
            {maxCapacity: 30, name: 'The Prancing Pony'},
        ],
    ],
    overlyComplex: [[{key: new Date(), value: [[{maxCapacity: 90, name: 'The Blue Cat'}]]}]],
});

console.log(result);
