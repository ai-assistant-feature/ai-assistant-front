import { FC, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

interface IProps {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  isPending: boolean
  handleSend: () => void
}

const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const maxHeight = 200
      const newHeight = Math.min(textarea.scrollHeight, maxHeight)
      textarea.style.height = `${newHeight}px`
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }
  }, [input])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
      className='fixed bottom-0 left-0 w-full bg-white px-4 pt-3 pb-6 gap-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-2xl border-t border-gray-200'
    >
      <textarea
        ref={textareaRef}
        className='flex-1 resize-none pt-3 pb-0 text-sm focus:outline-none max-h-[200px] min-h-[40px] w-full'
        placeholder='Спросите что нибудь...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPending}
        rows={1}
      />

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={isPending}
          className='bg-black rounded-full p-2 hover:bg-gray-800 transition disabled:opacity-50'
        >
          <ArrowUp className='text-white w-4 h-4' />
        </button>
      </div>
    </form>
  )
}

export { ChatTextArea }
