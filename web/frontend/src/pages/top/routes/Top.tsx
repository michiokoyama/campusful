import { useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Center,
  ChakraStyledOptions,
  Flex,
  Input,
  useDisclosure,
  useColorModeValue,
  color,
} from '@chakra-ui/react'
import { Header } from '../../../components/common/Header';
import { useArticleLists } from '../hooks/useArticleList'
import {
  ChatIcon,
} from '@chakra-ui/icons';
import { HiAcademicCap } from 'react-icons/hi'
import { createTaggedTemplate } from 'typescript';
import sanitizeHtml from 'sanitize-html'
import { SidebarContent } from '../../../components/common/SideBar'
import { colors } from '../../../const'
import { ArticleType, GetArticlesQuery } from 'generated/graphql';

export const Top = () => {
  return (
    <Header>
      <MainContents />
    </Header>
    );
}

const MainContents = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { data } = useArticleLists()
  return (<>
    <Flex bg={'gray.100'}>
      <Box w={{sm: '0px', md: '250px'}}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
      </Box>
      <Box w={{sm: '800px', md: '650px'}}>
        {data?.articles.map((prop) => (
            <ArticleLists {...prop} />
        ))}
      </Box>
    </Flex>
  </>)
}

const ArticleLists = (props: GetArticlesQuery['articles'][number]) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const noOfLinesOfContent = isOpen ? undefined : 3
  const createdAt = new Date(props.createdAt)
  const displayCreatedAt = createdAt.getFullYear() + '/' + (createdAt.getMonth() + 1) + '/' + (createdAt.getDate())

  // タイトル
  const Title = (props: {title: string}) => {
    return (<Box
      fontWeight='bold'
      fontSize={'xl'}
      lineHeight='tight'
      mt='1'
      noOfLines={2}
      onClick={onToggle}
      _hover={{cursor: 'pointer'}}
    >
      {props.title}
    </Box>
    )
  }

  // 本文
  const Content = (props: {content: string}) => {
    return (
      <Box
        dangerouslySetInnerHTML={{__html: sanitizeHtml(props.content)}}
        noOfLines={noOfLinesOfContent}
        onClick={onToggle}
        _hover={{cursor: 'pointer'}}
      >
      </Box>
    )
  }

  const Category = (props: {category: {name?: string}, type: ArticleType, universityName: string }) => {
    return (
      <Box display='flex' float={'left'}>
        {props.category?.name ?
        <Badge variant='solid' px='2' bg={colors.theme} fontSize='xs'>
          {props.category.name}
        </Badge>
          : <></>
        }
        <Badge variant='outline' px='2' borderColor={'gray'}>
          {props.type}
        </Badge>
        <Box as='span' color='gray.600' fontSize='xs' pl={'7px'}>
          投稿日: {displayCreatedAt}
        </Box>
       <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          pl={'7px'}
        >
          {props.universityName} 
        </Box>
      </Box>
    )
  }

  const Comment = (props: {thanksNum: number, commentNum: number}) => {
    return (
      <Box display='flex' float={'right'}>
        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
          <Box as='span' float={'left'} paddingTop={0.5}>
            <HiAcademicCap size={'20px'}/>
          </Box>
          <Box as='span' paddingLeft='1' paddingRight={3}>
            {props.thanksNum}
          </Box>
        </Box>
        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
          <ChatIcon />
          <Box as='span' paddingLeft='1' paddingRight={3}>
            {props.commentNum}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden' marginBottom={'10px'}>
      <Box pt='3' pb='6' pl='6' pr='6' bg={'white'}>
        <Title title={props.title} />
        <Content content={props.content} />
      <Box mt='2' mb='5'>
         <Category
            category={props.category}
            type={props.type}
            universityName={props.author.university.name}
          />
          <Comment thanksNum={props.thanksNum} commentNum={props.commentNum} />
        </Box> {/* カテゴリ、投稿日 */}
        <Box>
          <Input placeholder='コメントを追加する' />
        </Box>
      </Box> {/* 記事全体 padding */}
    </Box>
  )
}
