import { Badge, Box, ChakraStyledOptions } from '@chakra-ui/react'
import { HeaderWithSidebar } from '../../../components/common/Header';
import { SearchBox } from '../../../components/common/SearchBox';
import { useArticleLists } from '../hooks/useArticleList'
import {
  StarIcon
} from '@chakra-ui/icons';

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

const ArticleLists = (props: ChakraStyledOptions) => {
  console.log(props)
  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {props.category.name}
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {props.author.university.name} 
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

        <Box display='flex' mt='2' alignItems='center'>
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            投稿日: 2022/9/5
          </Box>

          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < 0 ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            13 reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )

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
        <Box>
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
            float='right'
          >
            {props.category.name}
          </Box>
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
