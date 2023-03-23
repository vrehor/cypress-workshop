import { rule } from 'graphql-shield';

import { Ctx } from '../context';

export const noUserEntity = rule({ cache: 'strict' })(async obj => {
  const { user } = obj as unknown as { user?: { id: number } };

  return !user?.id;
});

export const belongsToUserEntity = rule({ cache: 'strict' })(
  async (obj, _, { services: { CurrentUser } }: Ctx) => {
    const { user } = obj as unknown as { user?: { id: number } };

    return (
      !!user?.id &&
      !!CurrentUser?.tokenData?.user_id &&
      user?.id === CurrentUser?.tokenData?.user_id
    );
  }
);
