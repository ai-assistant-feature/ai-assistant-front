import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ChatInput } from './ChatInput'
import { ChatActions } from './ChatActions'
import { useSidebar } from '@/components/ui/sidebar'

interface IProps {
  input: string
  setInput: (value: string | ((prev: string) => string)) => void
  isPending: boolean
  handleSend: () => void
  hasError?: boolean
}

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend }) => {
  const { state } = useSidebar()

  const quickQuestions = [
    {
      title: 'Выбрать квартиру',
      subtitle: 'напиши топ 5 самых лучших квартир',
      value: 'напиши топ 5 самых лучших квартир',
    },
    {
      title: 'С видом на парк',
      subtitle: 'покажи новостройки с видом на парк',
      value: 'покажи новостройки с видом на парк',
    },
    {
      title: 'Максимум тишины',
      subtitle: 'выбери квартиры в самых тихих районах',
      value: 'выбери квартиры в самых тихих районах',
    },
    {
      title: 'Для семьи с детьми',
      subtitle: 'подбери жильё рядом с детским садом и школой',
      value: 'подбери жильё рядом с детским садом и школой',
    },
    {
      title: 'Пешком до метро',
      subtitle: 'ищу квартиру в 10 минутах от метро',
      value: 'ищу квартиру в 10 минутах от метро',
    },
    {
      title: 'С хорошей отделкой',
      subtitle: 'покажи квартиры с чистовой отделкой',
      value: 'покажи квартиры с чистовой отделкой',
    },
    {
      title: 'До 10 миллионов',
      subtitle: 'какие варианты есть до 10 миллионов рублей',
      value: 'какие варианты есть до 10 миллионов рублей',
    },
    {
      title: 'На старте продаж',
      subtitle: 'ищу квартиры в новостройках на старте продаж',
      value: 'ищу квартиры в новостройках на старте продаж',
    },
    {
      title: 'Для инвестиций',
      subtitle: 'что лучше купить для сдачи в аренду',
      value: 'что лучше купить для сдачи в аренду',
    },
    {
      title: 'Рядом с парком',
      subtitle: 'покажи квартиры у парков или скверов',
      value: 'покажи квартиры у парков или скверов',
    },
    {
      title: 'С панорамными окнами',
      subtitle: 'подбери апартаменты с панорамными окнами',
      value: 'подбери апартаменты с панорамными окнами',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-white'>
      <div
        className={cn(
          'mb-0 md:mb-6',
          'w-full mx-auto transition-all duration-200 ease-linear',
          'md:[transform:translateX(var(--sidebar-shift))]',
          'md:max-w-[var(--chat-width)]',
        )}
        style={
          {
            '--sidebar-shift': state === 'expanded' ? '8rem' : '0',
            '--chat-width': state === 'expanded' ? 'calc(60% - 8rem)' : '60%',
          } as React.CSSProperties
        }
      >
        <div className='w-full overflow-x-auto pb-4 px-2 scrollbar-hide'>
          <div className='flex gap-2 pr-2'>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                type='button'
                className='flex flex-col px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition w-auto max-w-[200px]'
                onClick={() => setInput(q.value)}
              >
                <div className='text-sm font-bold truncate self-start'>{q.title}</div>
                <div className='text-gray-400 text-xs leading-tight truncate w-full'>
                  {q.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className='isolate z-[3] w-full flex flex-col md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent'
        >
          <div className='relative w-full'>
            <div className='relative border rounded-t-4xl md:rounded-4xl p-6 pt-2'>
              <div className='flex-1 mb-2'>
                <ChatInput value={input} onChange={setInput} />
              </div>
              <ChatActions isPending={isPending} isDisabled={!input.trim()} onSubmit={handleSend} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
