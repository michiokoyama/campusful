import {
  Badge,
  Box,
  Center,
  ChakraStyledOptions,
  Flex,
  useDisclosure,
  useColorModeValue,
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

const ArticleLists = (props: ChakraStyledOptions) => {
  const createdAt = new Date(props.createdAt)
  const displayCreatedAt = createdAt.getFullYear() + '/' + (createdAt.getMonth() + 1) + '/' + (createdAt.getDate())
  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden' marginBottom={'10px'}>
      <Box p='6' bg={'white'}>
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

        <Box noOfLines={3} dangerouslySetInnerHTML={{__html: sanitizeHtml(props.content)}}></Box>

        <Box mt='2' mb='5'>
          <Box display='flex' float={'left'}>
            <Box as='span' color='gray.600' fontSize='sm'>
            投稿日: {displayCreatedAt}
            </Box>
          </Box>
          <Box display='flex' float={'right'}>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              <ChatIcon />
              <Box as='span' paddingLeft='1' paddingRight={3}>
                {props.commentNum}
              </Box>
            </Box>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              <Box as='span' float={'left'} paddingTop={0.5}>
                <HiAcademicCap size={'20px'}/>
              </Box>
              <Box as='span' paddingLeft='1' paddingRight={3}>
                {props.thanksNum}
              </Box>
            </Box>
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
