import React, { ReactNode, useState } from 'react';
import { 
  useRecoilState,
  useRecoilValue 
} from "recoil"
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Header } from '../../../../components/common/Header';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListIcon,
  Flex,
  Select,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md'
import { 
  categoryState,
  currentCategoryIdState,
  currentArticleTypeState,
 } from "../../../../globalState"
import { useCreateArticle} from "../hooks/useCreateArticle"
import { ArticleType } from 'generated/graphql';

const InlineButtons = [
  {type: "BOLD", text: "bold"},
  {type: "ITALIC", text: "italic"},
  {type: "STRIKETHROUGH", text: "strikthrough"},
]

const BlockStyleButtons = [
  {type: "header-one", text: "H1"},
  {type: "header-two", text: "H2"},
  {type: "header-three", text: "H3"},
  {type: "unstyled", text: "Normal"},
]

const PostBody = () => {
  return (
    <Box maxW='xg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <SelectArticleType />
      <SelectArticleCategory />
      <ArticleTitle />
      <TextEditor />
      <ShipItButton />
    </Box>
  )
}

// 記事 or 質問
const SelectArticleType = () => {
  const [currentArticleType, setCurrentArticleType] = useRecoilState(currentArticleTypeState)
  const handleOnClick = (articleType: ArticleType) => {
    setCurrentArticleType(articleType)
  }

  return (
    <Tabs>
      <TabList>
        <Tab data-value='Article' onClick={() => handleOnClick(ArticleType.Article)}>
          記事を投稿する
        </Tab>
        <Tab data-value='Question' onClick={() => handleOnClick(ArticleType.Question)}>
          質問をする
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>良い記事を書くコツ</p>
          <List>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              書き始める前に全体の章立てを設計しましょう。
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              記事を通して、どういった人に何を伝えたいのかを予めイメージしましょう。
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              背景や前提条件、具体的な手順は丁寧に書きましょう。
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel>
          <p>良い質問をするコツ</p>
          <List>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              知りたいことを具体的に記述しましょう。
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              それを知りたい背景や前提条件も具体的に記述しましょう。
            </ListItem>
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

// 記事のカテゴリ（学問、留学、サークルなど）
const SelectArticleCategory = () => {
  const [currentCategoryId, setCurrentCategoryId] = useRecoilState(currentCategoryIdState)
  const categories = useRecoilValue(categoryState)
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategoryId(Number(e.target.value))
  }
  return (
    <Flex p={1} alignItems={'center'}>
      <Box>【必須】カテゴリを入力してください。</Box>
      <Select maxW={150} onChange={(e) => handleOnChange(e)}>
        {categories.map((category) => {
          const selected = category.id === currentCategoryId ? true : false
          return (<option value={category.id} selected={selected}>{category.name}</option>)
        })}
      </Select>
    </Flex>
  )
}

// 記事のカテゴリ（学問、留学、サークルなど）
const ArticleTitle = () => {
  return (
    <Input p={1} placeholder='タイトルを入力してください。' />
  )
}

// 記事のカテゴリ（学問、留学、サークルなど）
const ShipItButton = () => {
  const currentCategoryId = useRecoilValue(currentCategoryIdState)
  const currentArticleType = useRecoilValue(currentArticleTypeState)
  const { createArticleMutation, data, loading, error } = useCreateArticle({variables: {
    title: `タイトルテスト ${new Date().toISOString()}`,
    content: `本文テスト ${new Date().toISOString()}`,
    type: currentArticleType,
    categoryId: currentCategoryId,
    authorId: 1,
  }})
  const handleShipIt = () => createArticleMutation()
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}>
     <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'gray'}
        backgroundColor={'white'}
        bg={'pink.400'}
        _hover={{
          bg: 'green.300',
        }}>
        キャンセル
      </Button>
     <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        backgroundColor={'#98a820'}
        bg={'pink.400'}
        _hover={{
          bg: 'green.300',
        }}
        onClick={handleShipIt}
      >
        投稿する
      </Button>
    </Stack>
 )
}

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <>
      <Button
        disabled={editorState.getUndoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
        undo
      </Button>
      <Button
        disabled={editorState.getRedoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
        redo
      </Button>
      <Flex>
      {BlockStyleButtons.map(button => {
        return <Button onMouseDown={(e) => handleBlockClick(e, button.type)}>{button.text}</Button>
      })}
      </Flex>
      <Flex>
      {InlineButtons.map(button => {
        return <Button onMouseDown={(e) => handleToggleClick(e, button.type)}>{button.text}</Button>
      })}
      <Button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>Ordered List</Button>
      <Button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>Unordered List</Button>
      </Flex>
      <Box
        borderWidth='2px'
        height='70vh'
      >
        <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
      </Box>
    </>
  );
}

export const Post = () => {
  return (
    <Header>
      <PostBody />
    </Header>
  )
}
