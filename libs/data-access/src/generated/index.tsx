import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

/** Represents an action that is not permitted for actor */
export type AuthorizationError = {
  __typename: 'AuthorizationError';
  code: Scalars['Int'];
  message: Scalars['String'];
};

/** Represents a Board */
export type Board = {
  __typename: 'Board';
  id: Scalars['Int'];
  lists?: Maybe<Array<BoardList>>;
  name: Scalars['String'];
  starred: Scalars['Boolean'];
};

export type BoardInput = {
  name: Scalars['String'];
};

/** Represents a Board list */
export type BoardList = {
  __typename: 'BoardList';
  cards?: Maybe<Array<Card>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Scalars['Int'];
  user?: Maybe<UserId>;
};

export type BoardListInput = {
  name: Scalars['String'];
  order: Scalars['Int'];
};

export type BoardListUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type BoardUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  starred?: InputMaybe<Scalars['Boolean']>;
};

/** Represents a Card */
export type Card = {
  __typename: 'Card';
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Scalars['Int'];
  user?: Maybe<UserId>;
};

export type CardInput = {
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
};

export type CardUpdateInput = {
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
};

/** Represents a Login data */
export type LoginData = {
  __typename: 'LoginData';
  token?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  createBoard: UnionValidationErrorBoard;
  createBoardList: UnionValidationErrorNotFoundErrorBoardList;
  createCard: UnionValidationErrorNotFoundErrorCard;
  deleteBoard: UnionNotFoundErrorBoard;
  deleteBoardList: UnionNotFoundErrorBoardList;
  deleteCard: UnionNotFoundErrorCard;
  login: UnionAuthorizationErrorValidationErrorLoginData;
  reset: Scalars['Boolean'];
  signup: UnionValidationErrorLoginData;
  updateBoard: UnionNotFoundErrorBoard;
  updateBoardList: UnionNotFoundErrorBoardList;
  updateCard: UnionNotFoundErrorCard;
};


export type MutationCreateBoardArgs = {
  input: BoardInput;
};


export type MutationCreateBoardListArgs = {
  boardId: Scalars['Int'];
  input: BoardListInput;
};


export type MutationCreateCardArgs = {
  input: CardInput;
  listId: Scalars['Int'];
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['Int'];
};


export type MutationDeleteBoardListArgs = {
  listId: Scalars['Int'];
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: LoginInput;
};


export type MutationUpdateBoardArgs = {
  boardId: Scalars['Int'];
  input: BoardUpdateInput;
};


export type MutationUpdateBoardListArgs = {
  input: BoardListUpdateInput;
  listId: Scalars['Int'];
};


export type MutationUpdateCardArgs = {
  cardId: Scalars['Int'];
  input: CardUpdateInput;
};

/** Represents a requested resource that doesn't exist */
export type NotFoundError = {
  __typename: 'NotFoundError';
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  board: UnionBoardNotFoundError;
  boardLists?: Maybe<Array<BoardList>>;
  boards?: Maybe<Array<Board>>;
  cards?: Maybe<Array<Card>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryBoardArgs = {
  boardId: Scalars['Int'];
};


export type QueryBoardListsArgs = {
  boardId: Scalars['Int'];
};


export type QueryCardsArgs = {
  listId: Scalars['Int'];
};

export type UnionAuthorizationErrorValidationErrorLoginData = AuthorizationError | LoginData | ValidationError;

export type UnionBoardNotFoundError = Board | NotFoundError;

export type UnionNotFoundErrorBoard = Board | NotFoundError;

export type UnionNotFoundErrorBoardList = BoardList | NotFoundError;

export type UnionNotFoundErrorCard = Card | NotFoundError;

export type UnionValidationErrorBoard = Board | ValidationError;

export type UnionValidationErrorLoginData = LoginData | ValidationError;

export type UnionValidationErrorNotFoundErrorBoardList = BoardList | NotFoundError | ValidationError;

export type UnionValidationErrorNotFoundErrorCard = Card | NotFoundError | ValidationError;

/** Represents an User */
export type User = {
  __typename: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
};

/** Represents an User object with id */
export type UserId = {
  __typename: 'UserId';
  id: Scalars['Int'];
};

/** Represents an invocation with unexpected parameter values */
export type ValidationError = {
  __typename: 'ValidationError';
  code: Scalars['Int'];
  fields: Array<Scalars['String']>;
  messages: Array<Scalars['String']>;
};

export type CreateBoardMutationVariables = Exact<{
  input: BoardInput;
}>;


export type CreateBoardMutation = { __typename: 'Mutation', createBoard: { __typename: 'Board', id: number, name: string, starred: boolean } | { __typename: 'ValidationError', code: number, fields: Array<string>, messages: Array<string> } };

export type UpdateBoardMutationVariables = Exact<{
  input: BoardUpdateInput;
  boardId: Scalars['Int'];
}>;


export type UpdateBoardMutation = { __typename: 'Mutation', updateBoard: { __typename: 'Board', id: number, name: string, starred: boolean } | { __typename: 'NotFoundError', code: number, message: string } };

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type DeleteBoardMutation = { __typename: 'Mutation', deleteBoard: { __typename: 'Board', id: number, name: string, starred: boolean } | { __typename: 'NotFoundError', code: number, message: string } };

export type BoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type BoardsQuery = { __typename: 'Query', boards?: Array<{ __typename: 'Board', id: number, name: string, starred: boolean }> | null };

export type BoardQueryVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type BoardQuery = { __typename: 'Query', board: { __typename: 'Board', id: number, name: string, starred: boolean, lists?: Array<{ __typename: 'BoardList', id: number, name: string, order: number, cards?: Array<{ __typename: 'Card', deadline?: any | null, description?: string | null, id: number, name: string, order: number, done: boolean }> | null }> | null } | { __typename: 'NotFoundError', code: number, message: string } };

export type CreateBoardListMutationVariables = Exact<{
  boardId: Scalars['Int'];
  input: BoardListInput;
}>;


export type CreateBoardListMutation = { __typename: 'Mutation', createBoardList: { __typename: 'BoardList', id: number, name: string, order: number, cards?: Array<{ __typename: 'Card', deadline?: any | null, description?: string | null, id: number, name: string, order: number }> | null } | { __typename: 'NotFoundError', code: number, message: string } | { __typename: 'ValidationError', code: number, fields: Array<string>, messages: Array<string> } };

export type UpdateBoardListMutationVariables = Exact<{
  listId: Scalars['Int'];
  input: BoardListUpdateInput;
}>;


export type UpdateBoardListMutation = { __typename: 'Mutation', updateBoardList: { __typename: 'BoardList', id: number, name: string, order: number, cards?: Array<{ __typename: 'Card', deadline?: any | null, description?: string | null, id: number, name: string, order: number }> | null } | { __typename: 'NotFoundError', code: number, message: string } };

export type DeleteBoardListMutationVariables = Exact<{
  listId: Scalars['Int'];
}>;


export type DeleteBoardListMutation = { __typename: 'Mutation', deleteBoardList: { __typename: 'BoardList', id: number, name: string, order: number, cards?: Array<{ __typename: 'Card', deadline?: any | null, description?: string | null, id: number, name: string, order: number }> | null } | { __typename: 'NotFoundError', code: number, message: string } };

export type CreateCardMutationVariables = Exact<{
  listId: Scalars['Int'];
  input: CardInput;
}>;


export type CreateCardMutation = { __typename: 'Mutation', createCard: { __typename: 'Card', description?: string | null, deadline?: any | null, id: number, name: string, order: number, done: boolean } | { __typename: 'NotFoundError', code: number, message: string } | { __typename: 'ValidationError', code: number, fields: Array<string>, messages: Array<string> } };

export type UpdateCardMutationVariables = Exact<{
  cardId: Scalars['Int'];
  input: CardUpdateInput;
}>;


export type UpdateCardMutation = { __typename: 'Mutation', updateCard: { __typename: 'Card', description?: string | null, deadline?: any | null, id: number, name: string, order: number, done: boolean } | { __typename: 'NotFoundError', code: number, message: string } };

export type DeleteCardMutationVariables = Exact<{
  cardId: Scalars['Int'];
}>;


export type DeleteCardMutation = { __typename: 'Mutation', deleteCard: { __typename: 'Card', description?: string | null, deadline?: any | null, id: number, name: string, order: number, done: boolean } | { __typename: 'NotFoundError', code: number, message: string } };

export type ResetMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetMutation = { __typename: 'Mutation', reset: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'AuthorizationError', code: number, message: string } | { __typename: 'LoginData', token?: string | null } | { __typename: 'ValidationError', code: number, fields: Array<string>, messages: Array<string> } };

export type SignupMutationVariables = Exact<{
  input: LoginInput;
}>;


export type SignupMutation = { __typename: 'Mutation', signup: { __typename: 'LoginData', token?: string | null } | { __typename: 'ValidationError', code: number, fields: Array<string>, messages: Array<string> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users?: Array<{ __typename: 'User', id: number, email: string }> | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename: 'Query', user?: { __typename: 'User', id: number, email: string } | null };


export const CreateBoardDocument = gql`
    mutation CreateBoard($input: BoardInput!) {
  createBoard(input: $input) {
    ... on ValidationError {
      code
      fields
      messages
    }
    ... on Board {
      id
      name
      starred
    }
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($input: BoardUpdateInput!, $boardId: Int!) {
  updateBoard(input: $input, boardId: $boardId) {
    ... on NotFoundError {
      code
      message
    }
    ... on Board {
      id
      name
      starred
    }
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      input: // value for 'input'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation DeleteBoard($boardId: Int!) {
  deleteBoard(boardId: $boardId) {
    ... on NotFoundError {
      code
      message
    }
    ... on Board {
      id
      name
      starred
    }
  }
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const BoardsDocument = gql`
    query Boards {
  boards {
    id
    name
    starred
  }
}
    `;

/**
 * __useBoardsQuery__
 *
 * To run a query within a React component, call `useBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoardsQuery(baseOptions?: Apollo.QueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
      }
export function useBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
        }
export type BoardsQueryHookResult = ReturnType<typeof useBoardsQuery>;
export type BoardsLazyQueryHookResult = ReturnType<typeof useBoardsLazyQuery>;
export type BoardsQueryResult = Apollo.QueryResult<BoardsQuery, BoardsQueryVariables>;
export const BoardDocument = gql`
    query Board($boardId: Int!) {
  board(boardId: $boardId) {
    ... on Board {
      id
      name
      starred
      lists {
        cards {
          deadline
          description
          id
          name
          order
          done
        }
        id
        name
        order
      }
    }
    ... on NotFoundError {
      code
      message
    }
  }
}
    `;

/**
 * __useBoardQuery__
 *
 * To run a query within a React component, call `useBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardQuery(baseOptions: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
      }
export function useBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardQuery, BoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
        }
export type BoardQueryHookResult = ReturnType<typeof useBoardQuery>;
export type BoardLazyQueryHookResult = ReturnType<typeof useBoardLazyQuery>;
export type BoardQueryResult = Apollo.QueryResult<BoardQuery, BoardQueryVariables>;
export const CreateBoardListDocument = gql`
    mutation CreateBoardList($boardId: Int!, $input: BoardListInput!) {
  createBoardList(boardId: $boardId, input: $input) {
    ... on ValidationError {
      code
      fields
      messages
    }
    ... on NotFoundError {
      code
      message
    }
    ... on BoardList {
      cards {
        deadline
        description
        id
        name
        order
      }
      id
      name
      order
    }
  }
}
    `;
export type CreateBoardListMutationFn = Apollo.MutationFunction<CreateBoardListMutation, CreateBoardListMutationVariables>;

/**
 * __useCreateBoardListMutation__
 *
 * To run a mutation, you first call `useCreateBoardListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardListMutation, { data, loading, error }] = useCreateBoardListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoardListMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardListMutation, CreateBoardListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardListMutation, CreateBoardListMutationVariables>(CreateBoardListDocument, options);
      }
export type CreateBoardListMutationHookResult = ReturnType<typeof useCreateBoardListMutation>;
export type CreateBoardListMutationResult = Apollo.MutationResult<CreateBoardListMutation>;
export type CreateBoardListMutationOptions = Apollo.BaseMutationOptions<CreateBoardListMutation, CreateBoardListMutationVariables>;
export const UpdateBoardListDocument = gql`
    mutation UpdateBoardList($listId: Int!, $input: BoardListUpdateInput!) {
  updateBoardList(listId: $listId, input: $input) {
    ... on NotFoundError {
      code
      message
    }
    ... on BoardList {
      cards {
        deadline
        description
        id
        name
        order
      }
      id
      name
      order
    }
  }
}
    `;
export type UpdateBoardListMutationFn = Apollo.MutationFunction<UpdateBoardListMutation, UpdateBoardListMutationVariables>;

/**
 * __useUpdateBoardListMutation__
 *
 * To run a mutation, you first call `useUpdateBoardListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardListMutation, { data, loading, error }] = useUpdateBoardListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBoardListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardListMutation, UpdateBoardListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardListMutation, UpdateBoardListMutationVariables>(UpdateBoardListDocument, options);
      }
export type UpdateBoardListMutationHookResult = ReturnType<typeof useUpdateBoardListMutation>;
export type UpdateBoardListMutationResult = Apollo.MutationResult<UpdateBoardListMutation>;
export type UpdateBoardListMutationOptions = Apollo.BaseMutationOptions<UpdateBoardListMutation, UpdateBoardListMutationVariables>;
export const DeleteBoardListDocument = gql`
    mutation DeleteBoardList($listId: Int!) {
  deleteBoardList(listId: $listId) {
    ... on NotFoundError {
      code
      message
    }
    ... on BoardList {
      cards {
        deadline
        description
        id
        name
        order
      }
      id
      name
      order
    }
  }
}
    `;
export type DeleteBoardListMutationFn = Apollo.MutationFunction<DeleteBoardListMutation, DeleteBoardListMutationVariables>;

/**
 * __useDeleteBoardListMutation__
 *
 * To run a mutation, you first call `useDeleteBoardListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardListMutation, { data, loading, error }] = useDeleteBoardListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteBoardListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardListMutation, DeleteBoardListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardListMutation, DeleteBoardListMutationVariables>(DeleteBoardListDocument, options);
      }
export type DeleteBoardListMutationHookResult = ReturnType<typeof useDeleteBoardListMutation>;
export type DeleteBoardListMutationResult = Apollo.MutationResult<DeleteBoardListMutation>;
export type DeleteBoardListMutationOptions = Apollo.BaseMutationOptions<DeleteBoardListMutation, DeleteBoardListMutationVariables>;
export const CreateCardDocument = gql`
    mutation CreateCard($listId: Int!, $input: CardInput!) {
  createCard(listId: $listId, input: $input) {
    ... on ValidationError {
      code
      fields
      messages
    }
    ... on NotFoundError {
      code
      message
    }
    ... on Card {
      description
      deadline
      id
      name
      order
      done
    }
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($cardId: Int!, $input: CardUpdateInput!) {
  updateCard(cardId: $cardId, input: $input) {
    ... on NotFoundError {
      code
      message
    }
    ... on Card {
      description
      deadline
      id
      name
      order
      done
    }
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation DeleteCard($cardId: Int!) {
  deleteCard(cardId: $cardId) {
    ... on NotFoundError {
      code
      message
    }
    ... on Card {
      description
      deadline
      id
      name
      order
      done
    }
  }
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const ResetDocument = gql`
    mutation Reset {
  reset
}
    `;
export type ResetMutationFn = Apollo.MutationFunction<ResetMutation, ResetMutationVariables>;

/**
 * __useResetMutation__
 *
 * To run a mutation, you first call `useResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMutation, { data, loading, error }] = useResetMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetMutation(baseOptions?: Apollo.MutationHookOptions<ResetMutation, ResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument, options);
      }
export type ResetMutationHookResult = ReturnType<typeof useResetMutation>;
export type ResetMutationResult = Apollo.MutationResult<ResetMutation>;
export type ResetMutationOptions = Apollo.BaseMutationOptions<ResetMutation, ResetMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ... on AuthorizationError {
      code
      message
    }
    ... on ValidationError {
      code
      fields
      messages
    }
    ... on LoginData {
      token
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: LoginInput!) {
  signup(input: $input) {
    ... on ValidationError {
      code
      fields
      messages
    }
    ... on LoginData {
      token
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ... on User {
      id
      email
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    ... on User {
      id
      email
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;