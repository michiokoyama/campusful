import { ChangeEvent, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Center,
  ChakraStyledOptions,
  Flex,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  color,
} from '@chakra-ui/react'
import { Header } from '../../../components/common/Header';
import { useArticleLists } from '../hooks/useArticleList'
import { useCreateComment } from '../hooks/useCreateComment'
import {
  ChatIcon,
} from '@chakra-ui/icons';
import { HiAcademicCap } from 'react-icons/hi'
import { createTaggedTemplate } from 'typescript';
import sanitizeHtml from 'sanitize-html'
import { SidebarContent } from '../../../components/common/SideBar'
import { SearchBox } from '../../../components/common/SearchBox';
import { colors } from '../../../const'
import { ArticleType, GetArticlesQuery } from 'generated/graphql';

export const Top = () => {
  return (
    <>
    <Header />
    <MainContents />
    </>
    );
}

const getDisplayDate = (d: Date) => {
  const zeroPadding = (num: number) => {
    if (0 <= num && num < 10){
      return `0${num}`
    }
    return num
  }
  const minutes = zeroPadding(d.getMinutes())
  const seconds = zeroPadding(d.getSeconds())
  return `${d.getFullYear()}/${(d.getMonth() + 1)}/${(d.getDate())} 
        ${d.getHours()}:${minutes}:${seconds}`
}

const MainContents = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { data } = useArticleLists()
  return (<>
    <Flex bg={'gray.100'} px={{lg: '100px'}}>
      <Box w={{sm: '0px', md: '250px'}}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
      </Box>
      <Box w={{sm: '800px', md: '650px'}}>
        <SearchBox />
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
  const displayCreatedAt = getDisplayDate(createdAt)
  const comments = props.comments
    ? props.comments.map((comment) => {
        return {
          content: comment.content,
          displayName: comment.author.displayName,
          universityName: comment.author.university.name,
          createdAt: new Date(comment.createdAt)
        }})
    : []
  const commentCount = comments.length

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

  const Category = (props: {
    category: {name?: string},
    displayName: string
    type: ArticleType,
    universityName: string,
  }) => {
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
          color='black.500'
          fontWeight='medium'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          pl={'7px'}
        >
          {props.displayName} 
        </Box>
        <Box
          color='black.500'
          fontWeight='medium'
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

  const CommentNum = (props: {thanksNum: number, commentNum: number}) => {
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

  const AddComment = (props: {
    articleType: ArticleType
    articleId: number
    authorId: number
  }) => {
    const { articleType, articleId, authorId } = props
    const [currentComment, setCurrentComment] = useState('')
    const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value 
      setCurrentComment(text)
    }
    const { createCommentMutation, data, loading, error } = useCreateComment({variables: {
      content: currentComment,
      articleId,
      authorId,
    }})
    const handleShipIt = () => createCommentMutation()
    const ShipItButton = () => {
      return (
        <Button size='sm' mt={'10px'} bg={colors.theme} color='white' onClick={handleShipIt}>投稿</Button>
      )
    }

    if (articleType === ArticleType.Article){
      return (
        <Box pt={'20px'}>
          <Textarea
            placeholder='コメントする'
            onChange={(e) => handleComment(e)}
          />
          <ShipItButton />
        </Box>
      )
    }
    if (articleType === ArticleType.Question){
      return (
        <Box pt={'20px'}>
          <Textarea
            placeholder='質問に回答する'
            onChange={(e) => handleComment(e)}
          />
          <ShipItButton />
        </Box>
      )
    }
    return (<></>)
  }

  const ShowComment = (props: {
    comments: {
      content: string
      createdAt: Date
      displayName: string
      universityName: string
    }[]
  }) => {
    return (<>
      {
        comments.map((comment) => (
          <Box pt={'20px'} border={'medium'}>
            <Box>
              {comment.content}
            </Box>
            <Box as='span' color='gray.600' fontSize='xs'>
              {comment.displayName} {comment.universityName} {getDisplayDate(comment.createdAt)}
            </Box>
          </Box>
        ))
      }
    </>)
  }

  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden' marginBottom={'10px'}>
      <Box pt='3' pb='6' pl='6' pr='6' bg={'white'}>
        <Title title={props.title} />
        <Content content={props.content} />
        <Box mt='2' mb='5'>
          <Category
            category={{name: props.category?.name}}
            displayName={props.author.displayName}
            type={props.type}
            universityName={props.author.university.name}
          />
          <CommentNum thanksNum={props.thanksNum} commentNum={commentCount} />
        </Box> {/* カテゴリ、投稿日、thanks、コメント */}
        {isOpen
          ?
          <Box>
            <AddComment articleType={props.type} articleId={Number(props.id)} authorId={Number(props.author.id)} />
            <ShowComment
              comments={comments}
            />
          </Box>
         :
            <></>
        }
      </Box> {/* 記事全体 padding */}
    </Box>
  )
}
