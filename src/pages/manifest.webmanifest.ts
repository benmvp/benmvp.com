import SITE_CONFIG from '../config/site'
import { type GetServerSideProps } from 'next'

const ICON_SIZES = [48, 72, 96, 144, 192, 256, 384, 512]

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
  const cacheDigest = process.env.VERCEL_GIT_COMMIT_SHA

  res.setHeader('Content-Type', 'application/json')

  // cache for 1 day
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

  res.write(
    JSON.stringify({
      name: SITE_CONFIG.title,
      short_name: 'benmvp',
      description: SITE_CONFIG.description,
      start_url: '/',
      background_color: '#fafafa',
      theme_color: '#3f51b5',
      display: 'standalone',
      cacheDigest,
      icons: ICON_SIZES.map((size) => {
        const dimensions = `${size}x${size}`

        return {
          src: `icons/icon-${dimensions}.png?v=${cacheDigest}`,
          sizes: dimensions,
          type: 'image/png',
        }
      }),
    }),
  )
  res.end()

  return {
    props: {},
  }
}

const ManifestPage = () => null

export default ManifestPage
