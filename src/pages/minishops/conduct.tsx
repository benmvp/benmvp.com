import { resolve } from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Props, default as MdxPage } from '../../components/MdxPage'
import {
  getGetStaticPaths,
  getGetStaticProps,
  type Params,
} from '../../utils/mdx-page'

const PAGES_DIRECTORY = resolve(process.cwd(), 'src/content/pages/minishops')

export const getStaticProps: GetStaticProps<Props, Params> = async (context) =>
  getGetStaticProps(PAGES_DIRECTORY, 'conduct')

export default MdxPage
