import { gql } from '@apollo/client'
import {
  useGetArticlesQuery,
} from '../../../generated/graphql'

export const useArticleLists = () => {
  // todo: globale stateから取得する。
  const categoryId = 1
  const { data, error } = useGetArticlesQuery({variables: {categoryId}})
  return { data, error }
}