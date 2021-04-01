import {ConversionContext, Decoverto, model, property, SimpleConverter} from 'decoverto';
import Decimal from 'bignumber.js';

class DecimalConverter extends SimpleConverter<Decimal, string | null | undefined> {

    constructor() {
        super(Decimal);
    }

    toInstance({source}: ConversionContext<string | null | undefined>): Decimal | null | undefined {
        return source == null ? source : new Decimal(source);
    }

    toPlain({source}: ConversionContext<Decimal | null | undefined>): string | null | undefined {
        return source == null ? source : source.toString();
    }
}

const decoverto = new Decoverto();

decoverto.converterMap.set(Decimal, new DecimalConverter());

@model()
class MappedTypes {

    @property()
    money: Decimal;
}

const result = decoverto.type(MappedTypes).plainToInstance({
    money: '12345.67',
});

console.log('Money instance of Decimal', result.money instanceof Decimal);
