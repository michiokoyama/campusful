import { useRecoilValue } from "recoil"
import {
  useGetArticlesQuery,
} from '../../../generated/graphql'
import { categoryState, searchKeywordState } from "../../../globalState"

export const useArticleLists = () => {
  const categories = useRecoilValue(categoryState)
  const categoryIds = categories
    .filter((category) => category.checked)
    .map((category) => category.id)
  const keyword = useRecoilValue(searchKeywordState) || null
  const { data, error } = useGetArticlesQuery({variables: {categoryIds, keyword}})
  return { data, error }
}