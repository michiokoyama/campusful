import React, { ReactNode, useState } from 'react';
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
  Flex,
} from '@chakra-ui/react';

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
      <TextEditor />
    </Header>
  )
}
