// import { useBoolean } from '@chakra-ui/react'
// import { useGraphQLClientQueries } from '@/globalStates/graphQLClientState'
// import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  useArticlesQuery,
} from '../../../generated/graphql'

const FETCH_ARTICLE_LIST = gql`
  query {
    user {
      id
      name
      email
      articles {
        id
      }
    }
  }
`


export const useArticleLists = () => {
  // const { data: { articleList } = {} } = useQuery(FETCH_ARTICLE_LIST)
  const { data, error } = useArticlesQuery()
  return { data, error }
}

/*
export const useArticleLists = (): {
    articleLists: any  // ArticleLists[]
    isCalculating: boolean
    status: 'error' | 'idle' | 'loading' | 'success'
    error: unknown
    isFetching: boolean
  } => {
    const [articleList, setArticless] = useState<ArticleLists[]>([])
    const [isCalculating, setIsCalculating] = useBoolean(false)
    const { graphQLClient } = useGraphQLClientQueries()
  
    const { status, data, error, isFetching } = useArticleListQuery(
      graphQLClient.client,
      {},
    )
  
    useEffect(() => {
      if (data) {
        setIsCalculating.on()
        setArticless((data.articleLists))
        setIsCalculating.off()
      }
    }, [data, setIsCalculating])
  
    return { articleLists, isCalculating, status, error, isFetching }
  }
  */