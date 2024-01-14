import { Box } from '@mui/material'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import PageHeader from '../../components/PageHeader'
import ProjectCard from '../../components/ProjectCard'
import { getUrl } from '../../utils/url'
import generateSocialImage from '../../utils/generate-social-image'
import PROJECTS from '../../content/projects'

const SEO_PAGE_TITLE = 'Dev Projects by Ben'
const SEO_PAGE_DESCRIPTION =
  "Check out Ben Ilegbodu's active and past web frontend development projects"
const SEO_IMAGE_URL = generateSocialImage({
  title: SEO_PAGE_TITLE,
  tagline: SEO_PAGE_DESCRIPTION,
})

const Projects = () => {
  return (
    <Layout>
      <Seo
        url={getUrl('projects', true)}
        title="Dev Projects"
        description={SEO_PAGE_DESCRIPTION}
        image={SEO_IMAGE_URL}
        imageAlt={SEO_PAGE_TITLE}
      />
      <PageHeader
        title="Dev Projects"
        subTitle="Ben's active and past development projects"
      />

      {PROJECTS.map((project) => (
        <>
          <Box my={4}>
            <ProjectCard key={project.title} project={project} />
          </Box>
        </>
      ))}
    </Layout>
  )
}

export default Projects
