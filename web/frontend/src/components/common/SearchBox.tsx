import React, { ChangeEvent, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import {
  useRecoilState,
} from 'recoil';
import { searchKeywordState } from 'globalState';

export const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState)
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value 
    setKeyword(text)
  }
  const handleOnClick = () => {
    // 検索ボタンクリック時にlocal stateのkeywordを
    // global stateのsearchKeywordにセットすることで検索を実行
    setSearchKeyword(keyword)
  }
  return (
    <InputGroup size='sm' borderColor='black' bg='white' mb={'10px'}>
      <Input placeholder='検索キーワードを入力' onChange={handleOnChange} />
      <InputRightAddon
        children={<SearchIcon></SearchIcon>}
        onClick={handleOnClick}
        _hover={{cursor: 'pointer'}}
      />
    </InputGroup>
  )
}
