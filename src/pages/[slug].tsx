import { resolve } from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Props, default as MdxPage } from '../components/MdxPage'
import {
  getGetStaticPaths,
  getGetStaticProps,
  type Params,
} from '../utils/mdx-page'

const PAGES_DIRECTORY = resolve(process.cwd(), 'src/content/pages')

export const getStaticPaths: GetStaticPaths<Params> = async (context) =>
  getGetStaticPaths(PAGES_DIRECTORY, context)

export const getStaticProps: GetStaticProps<Props, Params> = async (context) =>
  getGetStaticProps(PAGES_DIRECTORY, context?.params?.slug)

export default MdxPage
