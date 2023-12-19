import { join, resolve } from 'path'
import glob from 'fast-glob'
import { readFile, writeFile } from 'fs-extra'

const POSTS_ROOT = resolve(__dirname, '../src/content/posts')

const getMdxFilePaths = async () => {
  return glob(join(POSTS_ROOT, '**/*.mdx'))
}

const getTargetIndex = (
  lines: string[],
  openBlockIndex: number,
  target: string,
) =>
  lines.findIndex(
    (_, futureLineIndex) =>
      futureLineIndex > openBlockIndex &&
      RegExp(`${target}$`).test(lines[futureLineIndex].trim()),
  )

const getClosingBlockIndex = (lines: string[], openBlockIndex: number) =>
  getTargetIndex(lines, openBlockIndex, '```')

const getHighlightEndIndex = (lines: string[], openBlockIndex: number) =>
  getTargetIndex(lines, openBlockIndex, '// highlight-end')

const getHighlightLineNumbers = (
  lines: string[],
  openBlockIndex: number,
): string[] => {
  const highlightNextLineIndexes: string[] = []

  for (
    let lineIndex = openBlockIndex;
    lineIndex < getClosingBlockIndex(lines, openBlockIndex);
    lineIndex++
  ) {
    const line = lines[lineIndex].trim()

    if (line.includes('// highlight-next-line')) {
      highlightNextLineIndexes.push(`${lineIndex - openBlockIndex}`)

      // remove the `highlight-next-line` comment from the lines
      lines.splice(lineIndex, 1)
    } else if (line.includes('// highlight-start')) {
      const highlightEndIndex = getHighlightEndIndex(lines, lineIndex)

      highlightNextLineIndexes.push(
        `${lineIndex - openBlockIndex}-${
          highlightEndIndex - openBlockIndex - 2
        }`,
      )

      // remove the `highlight-start` and `highlight-end` comments from the lines
      lines.splice(lineIndex, 1)
      lines.splice(highlightEndIndex - 1, 1)
    }
  }

  return highlightNextLineIndexes
}

const getReplacedHighlightComments = (fileContent: string) => {
  const lines = fileContent.split('\n')

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex].trim()

    if (!/^```\w+$/.test(line)) {
      continue
    }

    // get the indexes of the lines that should be highlighted
    const highlightNextLineNumbers = getHighlightLineNumbers(lines, lineIndex)

    // append the line numbers to the opening block, if any lines should be
    // highlighted. e.g. ```js {1,2,3}
    if (highlightNextLineNumbers.length > 0) {
      lines[lineIndex] += ` {${highlightNextLineNumbers.join(',')}}`
    }
  }

  return lines.join('\n')
}

const main = async () => {
  const mdxFilePaths = await glob(join(POSTS_ROOT, '**/*.mdx'))

  for (const mdxFilePath of mdxFilePaths) {
    const fileContent = await readFile(mdxFilePath, 'utf-8')

    if (
      !fileContent.includes('// highlight-next-line') &&
      !fileContent.includes('// highlight-start')
    ) {
      continue
    }

    console.log('Updated', mdxFilePath)

    const newFileContent = getReplacedHighlightComments(fileContent)

    await writeFile(mdxFilePath, newFileContent)
  }
}

main()
