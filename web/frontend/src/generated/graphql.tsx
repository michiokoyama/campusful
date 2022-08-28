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
};

export type Article = {
  __typename?: 'Article';
  author: User;
  category: Category;
  content: Scalars['String'];
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
};

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
  content: Scalars['String'];
  title: Scalars['String'];
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

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: string, title: string, content: string, published: boolean, author: { __typename?: 'User', id: string, name: string, email: string, university: { __typename?: 'University', name: string } }, category: { __typename?: 'Category', name: string } }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', user: Array<{ __typename?: 'User', id: string, name: string, email: string, articles: Array<{ __typename?: 'Article', id: string }>, university: { __typename?: 'University', name: string } }> };


export const ArticlesDocument = gql`
    query articles {
  articles {
    id
    title
    content
    published
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
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
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