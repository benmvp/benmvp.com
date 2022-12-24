import React from 'react'
import Head from 'next/head'
import {
  author,
  description as siteDescription,
  image as siteImage,
  keywords as siteKeywords,
  language as siteLanguage,
  title as siteTitle,
  twitterHandle,
} from '../../config/site'
import { getFullUrl } from '../utils'

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
  lang,
  meta = [],
  schemaOrg,
  title,
  type = 'website',
  url,
}: Props) => {
  const htmlLang = lang || siteLanguage
  const metaDescription = description || siteDescription
  const metaImage = image || siteImage
  const metaImageFull = metaImage.startsWith('http')
    ? metaImage
    : getFullUrl(metaImage)
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const keywords = siteKeywords.join(' ')
  const siteSchemaOrg = {
    '@context': 'http://schema.org/',
    '@type': 'WebSite',
    url,
    name: fullTitle,
    alternateName: siteTitle,
    copyrightHolder: author,
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
      <html lang={htmlLang} />
      <title>{fullTitle}</title>

      {/* General tags */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={metaImageFull} />
      <link rel="canonical" href={url} />

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
      <meta name="twitter:site" content={`@${twitterHandle}`} />
      <meta name="twitter:creator" content={`@${twitterHandle}`} />
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
