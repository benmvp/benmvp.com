import Head from 'next/head'
import SITE_CONFIG from '../config/site'
import { useTheme } from '@mui/material'

type Meta =
  | { property: string; content: string; name?: undefined }
  | { name: string; content: string; property?: undefined }

interface Props {
  description?: string
  image?: string
  imageAlt?: string
  lang?: string
  meta?: Meta[]
  schemaOrg?: Record<string, unknown>
  title?: string
  type?: string
  url: string
}

const Seo = ({
  description,
  image,
  imageAlt,
  meta = [],
  schemaOrg,
  title,
  type = 'website',
  url,
}: Props) => {
  const { palette } = useTheme()

  const metaDescription = description || SITE_CONFIG.description
  const metaImage = image || SITE_CONFIG.image
  const metaImageFull = metaImage.startsWith('http')
    ? metaImage
    : `${SITE_CONFIG.url}${metaImage}`
  const siteTitle = SITE_CONFIG.title
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const keywords = SITE_CONFIG.keywords.join(' ')
  const siteSchemaOrg = {
    '@context': 'http://schema.org/',
    '@type': 'WebSite',
    url,
    name: fullTitle,
    alternateName: siteTitle,
    copyrightHolder: SITE_CONFIG.author,
    copyrightYear: 2015,
    description: metaDescription,
    image: {
      '@type': 'ImageObject',
      url: metaImageFull,
    },
    keywords,
    ...schemaOrg,
  }

  return (
    <Head>
      <title>{fullTitle}</title>

      {/* General tags */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={metaImageFull} />
      <link rel="canonical" href={url} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=2"
      />
      <link rel="manifest" href="/site.webmanifest?v=2" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg?v=2"
        color={palette.primary.main}
      />
      <link rel="shortcut icon" href="/favicon.ico?v=2" />
      <meta name="msapplication-TileColor" content={palette.primary.main} />
      <meta name="theme-color" content={palette.primary.main} />

      {/* OpenGraph tags */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImageFull} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${SITE_CONFIG.twitterHandle}`} />
      <meta name="twitter:creator" content={`@${SITE_CONFIG.twitterHandle}`} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImageFull} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Additional tags */}
      {meta.map((metaInfo) => (
        <meta
          key={`${metaInfo.name || metaInfo.property}${metaInfo.content}`}
          {...metaInfo}
        />
      ))}

      {/* schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(siteSchemaOrg)}
      </script>
    </Head>
  )
}

export default Seo
