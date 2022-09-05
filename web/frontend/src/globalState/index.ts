import {
  atom,
} from 'recoil';

interface LinkItemProps {
  name: string;
  checked: boolean
}
const LinkItems: Array<LinkItemProps> = [
  { name: '学問・進学', checked: false },
  { name: '留学', checked: false},
  { name: '就活', checked: false},
  { name: 'インターン', checked: false },
  { name: '部活・サークル', checked: false },
  { name: '趣味', checked: false},
  { name: '時事問題', checked: false },
  { name: 'その他', checked: false},
];

export const categoryState = atom({
  key: 'categoryState',
  default: LinkItems
})
