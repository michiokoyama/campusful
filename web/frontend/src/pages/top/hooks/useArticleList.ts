import { useRecoilValue } from "recoil"
import {
  useGetArticlesQuery,
} from '../../../generated/graphql'
import { categoryState } from "../../../globalState"

export const useArticleLists = () => {
  const categories = useRecoilValue(categoryState)
  const categoryIds = categories
    .filter((category) => category.checked)
    .map((category) => category.id)
  const { data, error } = useGetArticlesQuery({variables: {categoryIds}})
  return { data, error }
}