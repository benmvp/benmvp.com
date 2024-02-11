import { resolve } from 'path'
import { createGzip } from 'zlib'
import { SitemapStream, streamToPromise } from 'sitemap'
import { type GetServerSideProps } from 'next'
import { getAllPostSlugs } from '../utils/post'
import { getMinishopUrl, getPostUrl, getUrl } from '../utils/url'
import { getGetStaticPaths } from '../utils/mdx-page'
import { getAllMinishopSlugs } from '../utils/minishop'
import SITE_CONFIG from '../config/site'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await getGetStaticPaths(
    resolve(process.cwd(), 'src/content/pages'),
  )
  const posts = await getAllPostSlugs()
  const minishops = await getAllMinishopSlugs()

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Vary', 'Accept-Encoding')

  const sitemap = new SitemapStream({
    hostname: SITE_CONFIG.url,
  })
  const pipeline = sitemap.pipe(createGzip())

  // home page
  sitemap.write({ url: getUrl(''), changefreq: 'daily', priority: 0.7 })

  // main pages
  sitemap.write({
    url: getUrl('speak/'),
    changefreq: 'daily',
    priority: 0.7,
  })
  sitemap.write({
    url: getUrl('videos/'),
    changefreq: 'daily',
    priority: 0.7,
  })
  sitemap.write({
    url: getUrl('projects/'),
    changefreq: 'daily',
    priority: 0.7,
  })

  // top-level pages
  pages.paths.forEach((path) => {
    if (path && typeof path !== 'string') {
      sitemap.write({
        url: getUrl(`${path.params.slug}/`),
        changefreq: 'daily',
        priority: 0.7,
      })
    }
  })

  // blog posts
  sitemap.write({ url: getPostUrl(), changefreq: 'daily', priority: 0.7 })
  posts.forEach((slug) => {
    sitemap.write({
      url: getPostUrl(slug),
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  // minishops
  sitemap.write({ url: getMinishopUrl(), changefreq: 'daily', priority: 0.7 })
  sitemap.write({
    url: getMinishopUrl('conduct'),
    changefreq: 'daily',
    priority: 0.7,
  })
  minishops.forEach((slug) => {
    sitemap.write({
      url: getMinishopUrl(slug),
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  streamToPromise(pipeline)

  sitemap.end()

  await new Promise((resolve, reject) => {
    pipeline.pipe(res).on('finish', resolve).on('error', reject)
  })

  // no props to return, just need to write the sitemap to the response
  return {
    props: {},
  }
}

const SitemapPage = () => null

export default SitemapPage
