import {GraphQLError, GraphQLScalarType} from 'graphql';
import {GraphQLDate, GraphQLDateTime, GraphQLTime} from 'graphql-iso-date';
import {identity} from 'lodash';
import {asNexusMethod, scalarType} from 'nexus';

export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: (data: any) => data,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseValue: (data: any) => data,
});

export const Upload = scalarType({
  name: 'Upload',
  asNexusMethod: 'upload',
  serialize: () => {
    throw new GraphQLError('Upload serialization unsupported.');
  },
  parseValue: identity,
  parseLiteral: ast => {
    throw new GraphQLError('Upload literal unsupported.', ast);
  },
});

export const Void = scalarType({
  name: 'Void',
  asNexusMethod: 'void',
  serialize: () => undefined,
  parseValue: () => {
    throw new GraphQLError('Void input parsing unsupported.');
  },

  parseLiteral: ast => {
    throw new GraphQLError('Void literal unsupported.', ast);
  },
});

export const DateTimeScalar = GraphQLDateTime;
export const DateScalar = GraphQLDate;
export const TimeScalar = GraphQLTime;

asNexusMethod(JSONScalar, 'json');
asNexusMethod(DateTimeScalar, 'dateTime');
asNexusMethod(DateScalar, 'date');
asNexusMethod(TimeScalar, 'time');
