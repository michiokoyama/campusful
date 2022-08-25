import { Box, ChakraStyledOptions } from '@chakra-ui/react'
import { HeaderWithSidebar } from '../../../components/common/Header';
import { SearchBox } from '../../../components/common/SearchBox';
import { useArticleLists } from '../hooks/useArticleList'

export const Top = () => {
  return (
    <HeaderWithSidebar>
      <MainContents />
    </HeaderWithSidebar>
    );
}

const MainContents = () => {
  const { data } = useArticleLists()
  return (<>
    <SearchBox />
    {data?.articles.map((prop) => (
        <ArticleLists {...prop} />
    ))}
  </>)
}

const props = [
  {
    name: '氏名1',
    // universityName: '大学名1',
    title: 'タイトル1',
    content: '本文1',
    // reviewCount: 8,
    // rating: 2,
  },
  {
    name: '氏名2',
    // universityName: '大学名2',
    title: 'Toooooooooooooooooooooooooooooooooooooooooo long texts. Modern home in city center in the heart of historic Los Angeles',
    content: 'Toooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo long text',
    // reviewCount: 34,
    // rating: 4,
  },

]
const ArticleLists = (props: ChakraStyledOptions) => {

  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {/* {props.universityName} &bull; {props.userName}  */}
            {props.name}
          </Box>
        </Box>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {props.title}
        </Box>
        <Box
          noOfLines={3}
        >
            {props.content}
        </Box>
      </Box>
    </Box>
  )
}
