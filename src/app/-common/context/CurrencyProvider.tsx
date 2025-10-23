import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CurrencyCode = 'AED' | 'USD' | 'EUR' | 'RUB'

type CurrencyProviderProps = {
  children: React.ReactNode
  defaultCurrency?: CurrencyCode
  storageKey?: string
}

type CurrencyProviderState = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  format: (amount: number, opts?: { locale?: string; currency?: CurrencyCode }) => string
}

const initialState: CurrencyProviderState = {
  currency: 'AED',
  setCurrency: () => null,
  format: (amount: number) => amount.toString(),
}

const CurrencyProviderContext = createContext<CurrencyProviderState>(initialState)

export function CurrencyProvider({
  children,
  defaultCurrency = 'AED',
  storageKey = 'app-currency',
  ...props
}: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem(storageKey) as CurrencyCode | null
    return saved ?? defaultCurrency
  })

  useEffect(() => {
    localStorage.setItem(storageKey, currency)
  }, [currency, storageKey])

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code)
  }

  const format = useMemo(() => {
    return (amount: number, opts?: { locale?: string; currency?: CurrencyCode }) => {
      const locale = opts?.locale ?? 'ru-RU'
      const curr = opts?.currency ?? currency
      try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(amount)
      } catch {
        return (
          new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount) + ` ${curr}`
        )
      }
    }
  }, [currency])

  const value = {
    currency,
    setCurrency,
    format,
  }

  return (
    <CurrencyProviderContext.Provider {...props} value={value}>
      {children}
    </CurrencyProviderContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyProviderContext)
  if (context === undefined) throw new Error('useCurrency must be used within a CurrencyProvider')
  return context
}

export const CURRENCIES: Record<CurrencyCode, string> = {
  AED: 'AED – درهم',
  USD: 'USD – $',
  EUR: 'EUR – €',
  RUB: 'RUB – ₽',
}
