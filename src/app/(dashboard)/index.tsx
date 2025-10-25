import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@app/(dashboard)/-pages/Main'
import { MainLayout } from '@app/-common/layouts/MainLayout'

export const Route = createFileRoute('/(dashboard)/')({
  component: () => (
    <MainLayout>
      <Main />
    </MainLayout>
  ),
})
