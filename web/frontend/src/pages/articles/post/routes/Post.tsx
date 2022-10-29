import React, { ReactNode, useState, useCallback } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { 
  useRecoilState,
  useRecoilValue 
} from "recoil"
import {
  AtomicBlockUtils,
  EditorState,
  RichUtils,
  SelectionState,
  DraftEditorCommand,
  DefaultDraftBlockRenderMap,
  ContentBlock,
  DraftHandleValue,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import createImagePlugin from '@draft-js-plugins/image'
import { Map } from 'immutable'
import 'draft-js/dist/Draft.css';
import { stateToHTML } from "draft-js-export-html";
import { Header } from '../../../../components/common/Header';
import {
  Box,
  Button,
  Input,
  Link,
  List,
  ListItem,
  ListIcon,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdCheckCircle,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from 'react-icons/md'
import {
  BiUndo,
  BiRedo,
} from 'react-icons/bi'
import { 
  categoryState,
  currentCategoryIdState,
  currentArticleTypeState,
  currentArticleTitleState,
  currentArticleContentState,
  contentValidateState,
 } from "../../../../globalState"
import { useCreateArticle} from "../hooks/useCreateArticle"
import { ArticleType } from 'generated/graphql';
import { IconType } from 'react-icons';
import { colors, postContentsMarginX } from '../../../../const'

const PostBody = () => {
  return (
    <Box
      maxW='xg'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      px={{lg: postContentsMarginX}}
    >
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
              <ListIcon as={MdCheckCircle} color='green.500'/>
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
          const defaultValue = category.id === currentCategoryId ? category.id : ''
          return (<option value={category.id} defaultValue={defaultValue} key={category.id} >{category.name}</option>)
        })}
      </Select>
    </Flex>
  )
}

// 記事のカテゴリ（学問、留学、サークルなど）
const ArticleTitle = () => {
  const [currentArticleTitle, setCurrentArticleTitle] = useRecoilState(currentArticleTitleState)
  const [contentValidation, setContentValidation] = useRecoilState(contentValidateState)
  const isTitleValid = (text: string) => {
    if (text === ''){
      return false
    }
    //todo: ngの記号を精査する
    const ngRegExp = /[#$¥【】{}]/g
    return !ngRegExp.test(text)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentArticleTitle(e.target.value)
    const isValid = isTitleValid(e.target.value)
    if (isValid){
      setContentValidation({title: true})
    } else {
      setContentValidation({title: false})
    }
  }
  return (
    <>
      <Input p={1} 
        placeholder='タイトルを入力してください。'
        onChange={(e) => handleOnChange(e)}
        value={currentArticleTitle}
      />
    {!contentValidation.title ? <>不正文字です</> : <></>}
    </>
  )
}

const AfterPostModal = (props: {
  isOpen: boolean, onClose: any
}) => {
  const { isOpen, onClose } = props
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>投稿が完了しました</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>記事作成お疲れ様でした。</Box>
            <Box>書いていただいた記事は、必ず誰かの役に立ちます。</Box>
          </ModalBody>
          <ModalFooter>

          <Button
            backgroundColor={colors.theme}
            color={'white'}
            mr={3}
            onClick={() => window.location.reload()}
          >
            続けて記事を作成する
          </Button>
          <Link as={ReactRouterLink} to="/" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Button
              variant='ghost'
            >
              トップページに戻る
            </Button>
          </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// 記事のカテゴリ（学問、留学、サークルなど）
const ShipItButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentCategoryId = useRecoilValue(currentCategoryIdState)
  const currentArticleType = useRecoilValue(currentArticleTypeState)
  const currentArticleTitle = useRecoilValue(currentArticleTitleState)
  const currentArticleContent = useRecoilValue(currentArticleContentState)
  const validationState = useRecoilValue(contentValidateState)

  const { createArticleMutation, data, loading, error } = useCreateArticle({variables: {
    title: currentArticleTitle,
    content: currentArticleContent,
    type: currentArticleType,
    categoryId: currentCategoryId,
    authorId: 31,  // todo: 実際のユーザIDを設定する
  }})
  const handleShipIt = () => {
    if (validationState.title === false){
      alert('タイトルが不正です')
      return
    }
    createArticleMutation()
    // modalを出してtopページに遷移する
    onOpen()
  }
  return (
    <>
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
        下書き保存
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
    <AfterPostModal isOpen={isOpen} onClose={onClose} />
    </>
 )
}

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [currentArticleContent, setCurrentArticleContent] = useRecoilState(currentArticleContentState)

  const BUTTON_TYPE_STRING_LIST = [
    'header-one',
    'header-two',
    'BOLD',
    'ITALIC',
    'STRIKETHROUGH',
    'ordered-list-item',
    'unordered-list-item'
  ] as const
  type ButtonTypeString = typeof BUTTON_TYPE_STRING_LIST[number]
  const [buttonToggleState, setButtonToggle] = useState({
    'header-one': false,
    'header-two': false,
    BOLD: false,
    ITALIC: false,
    STRIKETHROUGH: false,
    'ordered-list-item': false,
    'unordered-list-item': false,
  } as {[buttonType in ButtonTypeString]: boolean})
  type DraftButtons = {
    type: ButtonTypeString,
    text: string,
    icon?: IconType,
  }
  const InlineButtons: DraftButtons[] = [
    {type: "BOLD", text: "bold", icon: MdFormatBold},
    {type: "ITALIC", text: "italic", icon: MdFormatItalic},
    {type: "STRIKETHROUGH", text: "strikthrough", icon: MdFormatStrikethrough},
  ]
  const BlockStyleButtons: DraftButtons[] = [
    {type: "header-one", text: "見出し"},
  ]

  const handleOnChange = (e: React.SetStateAction<EditorState>) => {
    setEditorState(e)
    const contentHtml = stateToHTML(editorState.getCurrentContent())
    setCurrentArticleContent(contentHtml)
  }

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Inline Style (bold, italic, ...)
  const handleInlineClick = (e: React.MouseEvent, inlineStyle: ButtonTypeString) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    toggleInlineButtons(inlineStyle)
  };
  const toggleInlineButtons = (type: ButtonTypeString) => {
    const inlineStyle = editorState.getCurrentInlineStyle()
    // このstateはdraft.js側のstateと合わせる必要がある。
    buttonToggleState[type] = !inlineStyle.has(type)
    setButtonToggle(buttonToggleState)
  }
  const getInlineButtonColor = (type: ButtonTypeString) => {
    return buttonToggleState[type] ? 'blue' : ''
  }

  // Block Style (h1, h2, orderd-list, ...)
  const handleBlockClick = (e: React.MouseEvent, blockType: ButtonTypeString) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    toggleBlockButtons(blockType)
  };
  const toggleBlockButtons = (type: ButtonTypeString) => {
    const selection = editorState.getSelection()
    const blockStyle = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
    // このstateはdraft.js側のstateと合わせる必要がある。
    buttonToggleState[type] = !(type === blockStyle)
    setButtonToggle(buttonToggleState)
  }
  const getBlockButtonColor = (type: ButtonTypeString) => {
    const selection = editorState.getSelection()
    const blockStyle = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
    return type === blockStyle ? 'blue' : ''
  }
  const blockRenderMap = Map({
    'header-one': {
      element: 'h1',
      wrapper: <Heading />,
    }
  })
  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
  const imagePlugin = createImagePlugin()

  const handleDroppedFiles = (selection: SelectionState, files: Blob[]) => {
    const formData = new FormData();
    formData.append('file',files[0]) 
    setEditorState(insertImage('https://images.pexels.com/photos/54539/pexels-photo-54539.jpeg'))
    return "handled" as DraftHandleValue
    /*
    fetch('/api/uploads', 
    {method: 'POST', body: formData})
    .then(res => res.json())
    .then(data => {
      if (data.file) { 
         setEditorState(insertImage(data.file)) //created below
      }
    }).catch(err => {
        console.log(err) 
    })
    */
  }
  
  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
  };

  const blockRendererFn = useCallback((block: ContentBlock) => {
    if(block.getType() === "atomic") {
      const entityKey = block.getEntityAt(0);
      if(!entityKey) return null;
      const entity = editorState.getCurrentContent().getEntity(entityKey);
      if (!entity) return null;
      if(entity.getType() === "image") {
        const data = entity.getData();
        return {
          component: Image,
          editable: false,
          props: {
            src: data.src,
          }
        }
      }
    }
    return null;
  }, [editorState]);

  return (
    <>
      <Flex>
        {BlockStyleButtons.map((button, idx) => {
          return <Button
            onMouseDown={(e) => handleBlockClick(e, button.type)}
            key={idx}>
            <Box color={getBlockButtonColor(button.type)}>{button.text}</Box>
          </Button>
        })}
        {InlineButtons.map((button, idx) => {
          return <Button onMouseDown={(e) => handleInlineClick(e, button.type)} key={idx}>
            <Icon as={button.icon} w={5} h={5} color={getInlineButtonColor(button.type)} />
          </Button>
        })}
        <Button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>
          <Icon as={MdFormatListNumbered} w={5} h={5} />
        </Button>
        <Button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>
          <Icon as={MdFormatListBulleted}  w={5} h={5} />
        </Button>
        <Button
          disabled={editorState.getUndoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
          <Icon as={BiUndo} w={5} h={5} />
        </Button>
        <Button
          disabled={editorState.getRedoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
          <Icon as={BiRedo} w={5} h={5} />
        </Button>

      </Flex>
        <Box
          borderWidth='2px'
          height='45vh'
          overflow='auto'
        >
          <Editor
            editorState={editorState}
            onChange={(e) => handleOnChange(e)}
            handleKeyCommand={handleKeyCommand}
            handleDroppedFiles={handleDroppedFiles}
            blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={blockRendererFn}
            plugins={[imagePlugin]}
          />
        </Box>
    </>
  );
}

export const Post = () => {
  return (
    <>
      <Header />
      <PostBody />
    </>
  )
}
