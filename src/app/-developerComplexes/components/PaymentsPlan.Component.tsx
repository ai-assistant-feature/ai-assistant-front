import { useTranslation } from 'react-i18next'
import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { Separator } from '@/components/ui/separator'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const PaymentsPlanComponent = ({ developerObjectData }: IProps) => {
  const { t } = useTranslation()
  const paymentsPlans = developerObjectData.payment_plans
  if (!paymentsPlans || paymentsPlans.length === 0) return null

  return (
    <>
      <h3 className='text-2xl font-semibold mb-3 mt-12'>
        {t('property.paymentPlans', 'Payment plans')}
      </h3>
      <div className='mb-4 overflow-x-auto scrollbar-hide'>
        <div className='flex gap-3 snap-x snap-mandatory pb-2'>
          {paymentsPlans.map((plan, idx) => {
            const flatPayments = (plan?.Payments ?? [])
              .flat()
              .filter(Boolean)
              .sort((a, b) => (a?.Order ?? 0) - (b?.Order ?? 0))

            return (
              <div
                key={`${plan.Plan_name}-${idx}`}
                className='rounded-md border border-border overflow-hidden bg-accent flex-shrink-0 snap-start min-w-[260px] max-w-[320px]'
              >
                <div className='p-3'>
                  <div className='text-base font-semibold text-primary line-clamp-2'>
                    {plan.Plan_name}
                  </div>
                  {typeof plan.months_after_handover === 'number' &&
                    plan.months_after_handover > 0 && (
                      <div className='mt-1 text-xs text-muted-foreground'>
                        {t('property.postHandover', 'Post-handover')}: {plan.months_after_handover}{' '}
                        {t('property.months', 'months')}
                      </div>
                    )}

                  <Separator className='my-2' />

                  <div className='flex flex-col'>
                    {flatPayments.map((item, i) => (
                      <div
                        key={`${item?.Order}-${i}`}
                        className='flex items-center justify-between py-1.5'
                      >
                        <div className='flex items-center gap-2 min-w-0 flex-1'>
                          <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-muted-foreground border border-border'>
                            {item?.Order ?? i + 1}
                          </span>
                          <span className='block truncate pr-2 text-sm text-foreground'>
                            {item?.Payment_time}
                          </span>
                        </div>
                        <span className='ml-2 flex-shrink-0 text-sm font-semibold text-primary'>
                          {item?.Percent_of_payment ? `${item.Percent_of_payment}%` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { PaymentsPlanComponent }
