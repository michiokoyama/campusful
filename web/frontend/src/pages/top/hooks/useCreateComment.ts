import * as Apollo from '@apollo/client';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  useCreateCommentMutation
} from '../../../generated/graphql'

export const useCreateComment = (
  variables: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>
) => {
  const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation(variables)
  return {createCommentMutation, data, loading, error}
}