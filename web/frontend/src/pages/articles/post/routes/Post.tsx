import React, { ReactNode, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Header } from '../../../../components/common/Header';

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

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <>
      <button
        disabled={editorState.getUndoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
        undo
      </button>
      <button
        disabled={editorState.getRedoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
        redo
      </button>
      <button className='RichEditor-styleButton' onMouseDown={(e) => handleBlockClick(e, "header-one")}>H1</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-two")}>H2</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-three")}>H3</button>
      <button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>Normal</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>italic</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>strikthrough</button>
      <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>Ordered List</button>
      <button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>Unordered List</button>
      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
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
