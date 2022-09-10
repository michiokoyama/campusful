import * as Apollo from '@apollo/client';
import {
  CreateArticleMutation,
  CreateArticleMutationVariables,
  useCreateArticleMutation
} from '../../../../generated/graphql'

// variablesの型はgraphql.tsxからコピペした
// より良い型定義の方法はありそう
export const useCreateArticle = (
  variables: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>
) => {
  const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation(variables)
  return {createArticleMutation, data, loading, error}
}