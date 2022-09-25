import { Article, Category, User, PrismaClient, ArticleType } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  category: Category[],
  user: User[],
): Promise<Article[]> => {
  const categoryIdMap = (name: string) => {
    return category.find((a) => a.name === name).id
  }
  const userIdMap = (name: string) => {
    return user.find((a) => a.firstName === name).id
  }

  const data = [
    {
      title:
        'コロナ禍が収束するまでは消費税を0%にすべき、という意見について皆さんはどう思いますか？',
      content: '',
      categoryId: categoryIdMap('留学'),
      authorId: userIdMap('太郎'),
      type: ArticleType.Question,
    },
    {
      title: '※サークル紹介※ 慶應塾生新聞会',
      content: `
      慶應新聞会というとお堅いサークルをイメージされるかもしれませんが、優しいメンバーが多く活動の裁量も個人に与えられているので、伸び伸びと好きなことを実現できるサークルです。 執筆した記事の多い少ないが人間関係に影響を与えることもありません。<br>
自分がやりたいことや発信したいことがある人はご自身の企画を積極的に進めることができます。慶應義塾大学はビジネス、スポーツ、芸能などあらゆる分野で活躍されている現役生、OBOGがいますので、取材相手には事欠きません。<br>
一方やりたいことが無い人も歓迎です。なんでも挑戦できる環境なので、先輩の企画を手伝ったりしながら自分の興味や関心を見極めることもできます。 何か打ち込めるものを見つけたいと思いながらなかなか見つからず葛藤している方にとっても良い環境だと思います。<br>
なお、1年生の春以降も年間通して途中入会を受け付けていますし、実際途中入会のメンバーも多いです。 活動の特性上、コロナ禍での活動制限の影響も少ないのも良いところかと思います。<br>
皆の努力の結晶である1つの紙面を作ることは何物にも替えがたい経験です。興味を持っていただいた方は、ぜひ一度入会をご検討ください！
      `,
      categoryId: categoryIdMap('部活・サークル'),
      authorId: userIdMap('太郎'),
      type: ArticleType.Article,
    },
    {
      title: '橋本環奈ちゃんが20代女優の中でぶっちぎりなのはなぜですか？',
      authorId: userIdMap('花子'),
      content: '',
      type: ArticleType.Question,
    },
    {
      title:
        '外交官になりたくてガーナに飛び込んだら、本当にやりたいことが分かった話。',
      content: `
        幼少期から計15年間サッカーに打ち込み、幼稚園、小学生、中学生、高校生とどのチームでもキャプテンを経験しました。それ以外にも児童会長や学級委員長になるなど、幼少期は組織のリーダーになることが多かったです。学業面においても、塾に通っていたことなどもあり成績は良く、お陰様で、第一志望だった千葉県立千葉高校に入学しました。<br>
        暗黒期に突入したのは、千葉県トップクラスの高校に進学したことで、学業面のアイデンティティを徐々に失っていったからです。それは、周囲のレベルが高く努力が報われづらくなったということも理由の一つではあるのですが、主には『学業を頑張ることは、自分にとってどんな意味があるのだろう？』と疑問に思い始めたからです。 <br>
        進学校だったので学業の目標は、受験を突破し志望校に合格することになります。ただ当時の私は、それに何の意味があるのかが分からなくなってしまいました。受験以外にも目標とすべきものがあるはず、というより ”あるべき” なのに、そこを考えずとりあえず勉強を頑張るようなことはしたくないと思いましたし、そこがないので勉強に対するモチベーションを維持することもできませんでした。
        `,
      categoryId: categoryIdMap('留学'),
      authorId: userIdMap('花子'),
      type: ArticleType.Article,
    },
    {
      title: '就職か進学か迷ったときにやったこと',
      content: 'テスト本文',
      categoryId: categoryIdMap('学問・進学'),
      authorId: userIdMap('太郎'),
      type: ArticleType.Article,
    },
  ]
  await conn.article.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.article.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.article.deleteMany()
}
export const article = {
  initData,
  truncateTable,
}
