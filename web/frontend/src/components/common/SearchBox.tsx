import React from 'react';
import {
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'


export const SearchBox = () => {
  return (
    <InputGroup size='sm'>
    <Input placeholder='検索キーワードを入力' />
    <InputRightAddon children={<SearchIcon></SearchIcon>} />
    </InputGroup>
  )
}
