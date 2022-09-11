import {
  atom,
} from 'recoil';

interface LinkItemProps {
  id: number;
  name: string;
  checked: boolean
}
const LinkItems: Array<LinkItemProps> = [
  { id: 1, name: '学問・進学', checked: false },
  { id: 2, name: '留学', checked: false},
  { id: 3, name: '就活', checked: false},
  { id: 4, name: 'インターン', checked: false },
  { id: 5, name: '部活・サークル', checked: false },
  { id: 6, name: '趣味', checked: false},
  { id: 7, name: '時事問題', checked: false },
  { id: 8, name: 'その他', checked: false},
];

export const categoryState = atom({
  key: 'categoryState',
  default: LinkItems
})

export const currentCategoryIdState = atom({
  key: 'currentCategoryIdState',
  default: 1,
})

export const currentArticleTypeState = atom({
  key: 'currentArticleTypeState',
  default: 'Article',
})

export const currentArticleTitleState = atom({
  key: 'currentArticleTitleState',
  default: '',
})

export const currentArticleContentState = atom({
  key: 'currentArticleContentState',
  default: '',
})
