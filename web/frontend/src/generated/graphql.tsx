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
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  author: User;
  category: Category;
  commentNum: Scalars['Int'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  thanksNum: Scalars['Int'];
  title: Scalars['String'];
  type: ArticleType;
};

export enum ArticleType {
  Article = 'Article',
  Question = 'Question'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createarticle: Article;
  createuser: User;
};


export type MutationCreatearticleArgs = {
  authorId: Scalars['Float'];
  categoryId: Scalars['Float'];
  commentNum: Scalars['Float'];
  content: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};


export type MutationCreateuserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  user: Array<User>;
};


export type QueryArticlesArgs = {
  categoryIds: Array<Scalars['Float']>;
};

export type University = {
  __typename?: 'University';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  articles: Array<Article>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  university: University;
};

export type CreateArticleMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateArticleMutation = { __typename?: 'Mutation', createarticle: { __typename?: 'Article', title: string, content: string, type: ArticleType, commentNum: number, category: { __typename?: 'Category', id: string }, author: { __typename?: 'User', id: string } } };

export type GetArticlesQueryVariables = Exact<{
  categoryIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: string, type: ArticleType, title: string, content: string, published: boolean, thanksNum: number, commentNum: number, createdAt: any, author: { __typename?: 'User', id: string, name: string, email: string, university: { __typename?: 'University', name: string } }, category: { __typename?: 'Category', name: string } }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', user: Array<{ __typename?: 'User', id: string, name: string, email: string, articles: Array<{ __typename?: 'Article', id: string }>, university: { __typename?: 'University', name: string } }> };


export const CreateArticleDocument = gql`
    mutation CreateArticle {
  createarticle(
    title: "mutationテスト"
    content: "テスト本文"
    type: "Article"
    commentNum: 1
    categoryId: 1
    authorId: 1
  ) {
    title
    content
    type
    commentNum
    category {
      id
    }
    author {
      id
    }
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const GetArticlesDocument = gql`
    query getArticles($categoryIds: [Float!]!) {
  articles(categoryIds: $categoryIds) {
    id
    type
    title
    content
    published
    thanksNum
    commentNum
    createdAt
    author {
      id
      name
      email
      university {
        name
      }
    }
    category {
      name
    }
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      categoryIds: // value for 'categoryIds'
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const UsersDocument = gql`
    query users {
  user {
    id
    name
    email
    articles {
      id
    }
    university {
      name
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