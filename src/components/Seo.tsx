import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type Meta =
  | { property: string; content: string; name?: undefined }
  | { name: string; content: string; property?: undefined }

interface Props {
  description?: string
  image?: string
  imageAlt?: string
  lang?: string
  meta?: Meta[]
  schemaOrg?: any
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
  const { site } = useStaticQuery(
    graphql`
      query SeoSiteInfo {
        site {
          siteMetadata {
            siteUrl
            title
            description
            image
            keywords
            lang
            author {
              name
              bio
            }
            social {
              twitterHandle
            }
          }
        }
      }
    `,
  )

  const htmlLang = lang || site.siteMetadata.lang
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || site.siteMetadata.image
  const metaImageFull = metaImage.startsWith('http')
    ? metaImage
    : `${site.siteMetadata.siteUrl}${metaImage}`
  const siteTitle = site.siteMetadata.title
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const keywords = site.siteMetadata.keywords.join(' ')
  const siteSchemaOrg = {
    '@context': 'http://schema.org/',
    '@type': 'WebSite',
    url,
    name: fullTitle,
    alternateName: siteTitle,
    copyrightHolder: site.siteMetadata.author.name,
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
    <Helmet>
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
      <meta
        name="twitter:site"
        content={`@${site.siteMetadata.social.twitterHandle}`}
      />
      <meta
        name="twitter:creator"
        content={`@${site.siteMetadata.social.twitterHandle}`}
      />
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
    </Helmet>
  )
}

export default Seo
