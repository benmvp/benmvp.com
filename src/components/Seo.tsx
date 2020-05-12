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
  const metaImage = `${site.siteMetadata.siteUrl}${
    image || site.siteMetadata.image
  }`
  const fullTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={site.siteMetadata.keywords.join(' ')} />
      <meta name="image" content={metaImage} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content={site.siteMetadata.social.twitterHandle}
      />
      <meta
        name="twitter:creator"
        content={site.siteMetadata.social.twitterHandle}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {meta.map((metaInfo) => (
        <meta
          key={`${metaInfo.name || metaInfo.property}${metaInfo.content}`}
          {...metaInfo}
        />
      ))}
    </Helmet>
  )
}

export default Seo
