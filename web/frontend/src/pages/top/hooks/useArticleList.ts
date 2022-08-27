import { gql } from '@apollo/client'
import {
  useArticlesQuery,
} from '../../../generated/graphql'

export const useArticleLists = () => {
  const { data, error } = useArticlesQuery()
  return { data, error }
}