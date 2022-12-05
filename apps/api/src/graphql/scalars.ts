import {
  DateResolver,
  DateTimeResolver,
  JSONObjectResolver,
} from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const DateTimeScalar = DateTimeResolver;
export const DateScalar = DateResolver;
export const JsonScalar = JSONObjectResolver;

asNexusMethod(DateTimeScalar, 'dateTime');
asNexusMethod(DateScalar, 'date');
asNexusMethod(JsonScalar, 'json');
