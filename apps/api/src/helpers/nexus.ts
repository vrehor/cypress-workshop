// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { unionType } from 'nexus';

const unions: { [key: string]: any } = {};

export const union = (...unionMemberNames: NexusGen['objectNames'][]) => {
  const unionName = `Union${unionMemberNames.join('')}`;
  if (!unions[unionName]) {
    unions[unionName] = unionType({
      name: unionName,
      definition(t) {
        t.members(...unionMemberNames);
      },
      resolveType: item => item.__typename,
    });
  }

  return unions[unionName];
};

export const addTypeName = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Obj extends { [key: string]: any },
  TypeName extends NexusGen['objectNames']
>(
  obj: Obj,
  __typename: TypeName
) => ({ ...obj, __typename });
