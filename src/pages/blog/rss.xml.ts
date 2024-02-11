import RSS from 'rss'
import { type GetServerSideProps } from 'next'
import { getPosts } from '../../utils/post'
import { getPostUrl, getUrl } from '../../utils/url'
import SITE_CONFIG from '../../config/site'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPosts()

  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site_url: getUrl(''),
    feed_url: getUrl('/blog/rss.xml'),
    image_url: getUrl('/icons/icon-192x192.png'),
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: getPostUrl(post.slug, true),
      date: post.date,
      guid: post.slug,
      author: SITE_CONFIG.author,
      categories: post.tags,
    })
  })

  const rssXml = feed.xml({ indent: true })

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Vary', 'Accept-Encoding')

  res.write(rssXml)
  res.end()

  // no props to return, just need to write the rss feed to the response
  return {
    props: {},
  }
}

const RssPage = () => null

export default RssPage
