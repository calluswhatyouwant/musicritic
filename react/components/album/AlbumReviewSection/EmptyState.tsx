import { defineMessages, FormattedMessage } from 'react-intl'
import { Heading, Flex } from 'theme-ui'
import type { FC } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'

const messages = defineMessages({
  emptyState: { id: 'musicritic.album-page.empty-state' },
})

const styles: ThemeUIStyleObject = {
  border: '1px dashed darkgray',
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  padding: 12,
  backgroundColor: 'rgb(0, 0, 0, 0.01)',
}

const EmptyState: FC = () => (
  <Flex sx={styles}>
    <Heading as="h3" variant="section">
      <FormattedMessage {...messages.emptyState} />
    </Heading>
  </Flex>
)

export default EmptyState
