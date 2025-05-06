import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@app/(dashboard)/-pages/Main'

export const Route = createFileRoute('/(dashboard)/')({
  component: () => <Main />,
})
