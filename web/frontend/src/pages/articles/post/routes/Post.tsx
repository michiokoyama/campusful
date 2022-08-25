import React, { ReactNode, useState } from 'react';
import {
  ContentBlock,
  Editor,
  EditorState,
  RichUtils,
  SelectionState,
  getDefaultKeyBinding,
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

// const RichEditorExample = () => {
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
//   const onChange = (editorState: React.SetStateAction<EditorState>) => setEditorState(editorState)
//   // const focus = () => refs.editor.focus();
//   const focus = () => void 0
// 
//   const handleKeyCommand = (command: string, editorState: EditorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       onChange(newState);
//       return true;
//     }
//     return false;
//   }
// 
//   const mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>, editorState: EditorState) => {
//     if (e.keyCode === 9 /* TAB */) {
//       const newEditorState = RichUtils.onTab(
//         e,
//         editorState,
//         4, /* maxDepth */
//       );
//       if (newEditorState !== editorState) {
//         onChange(newEditorState);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   }
// 
//   const toggleBlockType = (blockType: string, state: { editorState: EditorState; }) => {
//     onChange(
//       RichUtils.toggleBlockType(
//         state.editorState,
//         blockType
//       )
//     );
//   }
// 
//   const toggleInlineStyle = (inlineStyle: string, editorState: EditorState) => {
//     onChange(
//       RichUtils.toggleInlineStyle(
//         editorState,
//         inlineStyle
//       )
//     );
//   }
// 
//   // Custom overrides for "code" style.
//   const styleMap = {
//     CODE: {
//       backgroundColor: 'rgba(0, 0, 0, 0.05)',
//       fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//       fontSize: 16,
//       padding: 2,
//     },
//   };
// 
//   const getBlockStyle = (block: any ) => {
//     switch (block.getType()) {
//       case 'blockquote': return 'RichEditor-blockquote';
//       default: return null;
//     }
//   }
// 
//   // If the user changes block type before entering any text, we can
//   // either style the placeholder or hide it. Let's just hide it now.
//   let className = 'RichEditor-editor';
//   var contentState = editorState.getCurrentContent();
//   if (!contentState.hasText()) {
//     if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//       className += ' RichEditor-hidePlaceholder';
//     }
//   }
// 
//   return (
//     <div className="RichEditor-root">
//       <BlockStyleControls
//         editorState={editorState}
//         onToggle={toggleBlockType}
//       />
//       <InlineStyleControls
//         editorState={editorState}
//         onToggle={toggleInlineStyle}
//       />
//       <div className={className} onClick={focus}>
//         <Editor
//           // blockStyleFn={getBlockStyle}
//           customStyleMap={styleMap}
//           editorState={editorState}
//           // handleKeyCommand={(e) => { handleKeyCommand(e, editorState) }}
//           // keyBindingFn={(e) => { mapKeyToEditorCommand(e, editorState) } }
//           onChange={onChange}
//           placeholder="Tell a story..."
//           ref="editor"
//           spellCheck={true}
//         />
//       </div>
//     </div>
//   );
// }
// 
// const StyleButton = (props: {
//   key: string,
//   active: boolean,
//   label: string,
//   onToggle: any,
//   style: string,
// }) => {
//   const onToggle = (e: { preventDefault: () => void; }) => {
//       e.preventDefault();
//       props.onToggle(props.style);
//   }
// 
//   let className = 'RichEditor-styleButton';
//   if (props.active) {
//     className += ' RichEditor-activeButton';
//   }
// 
//   return (
//     <span className={className} onMouseDown={onToggle}>
//       {props.label}
//     </span>
//   );
// }
// 
// const BlockStyleControls = (props: { onToggle?: any; editorState?: any; }) => {
//   const {editorState} = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();
//   const BLOCK_TYPES = [
//     {label: 'H1', style: 'header-one'},
//     {label: 'H2', style: 'header-two'},
//     {label: 'H3', style: 'header-three'},
//     {label: 'H4', style: 'header-four'},
//     {label: 'H5', style: 'header-five'},
//     {label: 'H6', style: 'header-six'},
//     {label: 'Blockquote', style: 'blockquote'},
//     {label: 'UL', style: 'unordered-list-item'},
//     {label: 'OL', style: 'ordered-list-item'},
//     {label: 'Code Block', style: 'code-block'},
//   ];
// 
//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };
// 
// const InlineStyleControls = (props: { editorState: { getCurrentInlineStyle: () => any; }; onToggle: any; }) => {
//   const INLINE_STYLES = [
//     {label: 'Bold', style: 'BOLD'},
//     {label: 'Italic', style: 'ITALIC'},
//     {label: 'Underline', style: 'UNDERLINE'},
//     {label: 'Monospace', style: 'CODE'},
//   ];
//   const currentStyle = props.editorState.getCurrentInlineStyle();
//   
//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

export const Post = () => {
  return (
    <Header>
      <TextEditor />
    </Header>
  )
  // return (<RichEditorExample />)
  /*
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const onChange = (editorState: React.SetStateAction<EditorState>) => setEditorState(editorState)
  return (
    <>
      <InlineStyleControls editorState={{
        getCurrentInlineStyle: function () {
          throw new Error('Function not implemented.');
        }
      }} onToggle={undefined} />
      <Editor editorState={editorState} onChange={onChange} placeholder="Enter some text..."></Editor>
    </>
  )
  */
}
