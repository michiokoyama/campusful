import {
  useCreateArticleMutation
} from '../../../../generated/graphql'

export const useCreateArticle = () => {
    const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation()
    return {createArticleMutation, data, loading, error}
}