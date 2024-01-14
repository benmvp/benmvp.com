import { GetStaticPaths, GetStaticProps } from 'next'
import { type Minishop, getMinishops, getMinishop } from '../../utils/minishop'
import { getMinishopUrl, getUrl } from '../../utils/url'
import generateSocialImage from '../../utils/generate-social-image'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import SITE_CONFIG from '../../config/site'
import PageHeader from '../../components/PageHeader'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Content from '../../components/Content'
import Share from '../../components/Share'
import Link from '../../components/Link'
import MinishopCard from '../../components/MinishopCard'
import MinishopRegister from '../../components/MinishopRegister'
import MinishopTestimonials from '../../components/MinishopTestimonials'

interface Props {
  minishop: Minishop
  others: Minishop[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const minishops = await getMinishops()

  return {
    paths: minishops.map((minishop) => ({
      params: { slug: minishop.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : undefined
  const minishop = slug ? await getMinishop(slug) : undefined

  if (!minishop) {
    return { notFound: true }
  }

  let minishops = await getMinishops({
    size: 4,
    filter: { when: 'upcoming', excluded: slug },
  })

  if (minishops.length === 0) {
    minishops = await getMinishops({
      size: 4,
      filter: { when: 'remaining', excluded: slug },
      sortBy: 'title',
    })
  }

  return {
    props: {
      minishop,
      others: minishops,
    },
  }
}

const useEventView = (slug: string, isUpcoming: boolean, title: string) => {
  useEffect(() => {
    if (isUpcoming) {
      window.gtag?.('event', 'view_item', {
        items: [{ id: slug, name: title, price: 100 }],
      })
    }
  }, [slug, isUpcoming, title])
}

const useEventViewOthers = (others: Minishop[]) => {
  useEffect(() => {
    if (others.length > 0) {
      window.gtag?.('event', 'view_item_list', {
        items: others
          .filter((minishop) => minishop.isUpcoming)
          .map((minishop, index) => ({
            id: minishop.slug,
            name: minishop.title,
            list_name: 'Other Minishops',
            list_position: index + 1,
            price: 100,
          })),
      })
    }
  }, [others])
}

const Minishop = ({ minishop, others }: Props) => {
  const {
    category,
    compiledSource,
    excerpt,
    eventId,
    eventEnd,
    eventStart,
    isUpcoming,
    level,
    shortDescription,
    slug,
    tags,
    title,
  } = minishop
  const url = getMinishopUrl(slug)
  const fullTitle = `${title} Minishop`
  const summary = shortDescription || excerpt
  const seoImageUrl = generateSocialImage({
    title: fullTitle,
    tagline: shortDescription,
  })

  useEventView(slug, isUpcoming, title)
  useEventViewOthers(others)

  const minishopRegister = isUpcoming && eventId && eventStart && (
    <MinishopRegister
      eventId={eventId}
      eventStart={eventStart}
      isTop
      title={title}
    />
  )

  return (
    <Layout>
      <Seo
        title={`${fullTitle}/Workshop`}
        url={url}
        description={summary}
        image={seoImageUrl}
        imageAlt={fullTitle}
        type="events.event"
        meta={[
          ...(eventStart && eventEnd
            ? [
                { property: 'event:start_time', content: eventStart },
                { property: 'event:end_time', content: eventEnd },
              ]
            : []),
        ]}
        schemaOrg={{
          '@type': 'EducationEvent',
          name: fullTitle,
          eventAttendanceMode: 'OnlineEventAttendanceMode',
          educationLevel: level,
          location: {
            '@type': 'VirtualLocation',
            url,
          },
          organizer: {
            '@type': 'Person',
            name: SITE_CONFIG.author,
            url: getUrl('', true),
          },
          teaches: category,
          ...(eventStart && eventEnd
            ? {
                startDate: eventStart,
                endDate: eventEnd,
                eventStatus: 'EventScheduled',
              }
            : {}),
        }}
      />

      <Stack spacing={5} direction="column">
        <PageHeader title={fullTitle} subTitle={shortDescription} />

        {minishopRegister}

        <Content compiledSource={compiledSource} slug={slug} type="minishop" />

        <MinishopTestimonials minishop={minishop} />

        {minishopRegister}

        <Box component="footer">
          <Share
            url={url}
            title={`${fullTitle} by Ben Ilegbodu`}
            summary={summary}
            tags={tags}
            type="minishop"
          />
          {!!others.length && (
            <Box component="section" mt={5}>
              <Typography component="h3" variant="h5">
                Other minishops
              </Typography>
              <Grid container spacing={2}>
                {others.map((minishop) => (
                  <Grid key={minishop.slug} item xs={12}>
                    <MinishopCard mode="min" minishop={minishop} />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent={{ xs: 'center', sm: 'flex-end' }}
                    width="100%"
                  >
                    <Link href={getMinishopUrl()} variant="h6">
                      View all minishops &gt;
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Stack>
    </Layout>
  )
}

export default Minishop
