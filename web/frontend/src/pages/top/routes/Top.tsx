import React from 'react';
import { Box, Badge, ChakraProps, ChakraProviderProps, ChakraStyledOptions } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
// import { Header } from '../../../components/common/Header';
import { SidebarWithHeader } from '../../../components/common/SideBar';
import { SearchBox } from '../../../components/common/SearchBox';

export const Top = () => {
  const headerProps = {
    title: 'campusful',
    color: 'green',
  }
  return (
    <SidebarWithHeader>
      <MainContents />
    </SidebarWithHeader>
    );
}

const MainContents = () => {
  return (<>
    <SearchBox />
    {props.map((prop) => (
        <ArticleLists {...prop} />
    ))}
  </>)
}

const props = [
  {
    userName: '氏名1',
    universityName: '大学名1',
    title: 'Toooooooooooooooooooooooooooooooooooooooooo long texts. Modern home in city center in the heart of historic Los Angeles',
    articleBody: 'Toooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo long text',
    reviewCount: 34,
    rating: 4,
  },
  {
    userName: '氏名2',
    universityName: '大学名2',
    title: 'タイトル2',
    articleBody: '本文2',
    reviewCount: 8,
    rating: 2,
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
            {props.universityName} &bull; {props.userName} 
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
            {props.articleBody}
        </Box>
      </Box>
    </Box>
  )
}

const ArticleList = () => {
  const property = {
    // imageUrl: 'https://bit.ly/2Z4KKcF',
    // imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }
    
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} 大学名 &bull; {property.baths} 氏名
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}