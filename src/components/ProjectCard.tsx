import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
} from '@mui/material'
import { Project } from '../config/projects'

interface Props {
  project: Project
}

const ProjectCard = ({ project }: Props) => {
  const { description, imageUrl, preLaunch = false, title, url } = project

  return (
    <Card
      component="section"
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <CardActionArea
        component="a"
        href={url}
        sx={{
          maxWidth: { sm: 250 },
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          title={title}
          sx={{
            height: { sm: '100%' },
            objectFit: 'contain',
          }}
        />
      </CardActionArea>
      <Box flex="1">
        <CardContent>
          <Typography component="h1" variant="h4">
            <Link href={url}>{title}</Link>
            {preLaunch && (
              <Typography component="span" variant="h6">
                {' '}
                (pre launch)
              </Typography>
            )}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default ProjectCard
