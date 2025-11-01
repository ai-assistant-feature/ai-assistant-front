import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ApplicationFormComponent = () => {
  return (
    <Tabs defaultValue='form' className='w-full'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <div className='text-xl sm:text-xl'>Let’s help you secure the best deal</div>
          <div className='text-sm mt-2 leading-6'>
            Share a few quick details — I’ll connect you with a licensed agent who can reserve your
            preferred unit or find similar options.
          </div>
        </div>
      </div>
      <TabsList>
        <TabsTrigger value='form'>Form</TabsTrigger>
        <TabsTrigger value='chat'>Chat</TabsTrigger>
      </TabsList>
      <Card className=''>
        <CardHeader className='px-6 sm:px-8'></CardHeader>
        <CardContent className='px-6 sm:px-8'>
          <TabsContent value='form' className='focus-visible:outline-none'>
            <form className='flex flex-col gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='fullName'>Full name</Label>
                <Input id='fullName' placeholder='Full name' />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='contact'>WhatsApp number or Email</Label>
                <Input id='contact' placeholder='WhatsApp number or Email' />
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='grid gap-3'>
                  <Label htmlFor='citizenship'>Country</Label>
                  <select
                    id='citizenship'
                    className='border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]'
                    defaultValue='United Kingdom'
                  >
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='residence'>Current location</Label>
                  <select
                    id='residence'
                    className='border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]'
                    defaultValue='United Kingdom'
                  >
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='budget'>Budget</Label>
                <select
                  id='budget'
                  className='border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]'
                  defaultValue='200K – 400K'
                >
                  <option>Up to 200K</option>
                  <option>200K – 400K</option>
                  <option>400K – 700K</option>
                  <option>700K – 1M</option>
                  <option>1M+</option>
                </select>
              </div>

              <div className='mt-2 space-y-3'>
                <div className='text-sm font-medium'>Purpose of purchase</div>
                <div className='flex flex-wrap gap-4'>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='purpose'
                      defaultChecked
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    Investment
                  </label>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='purpose'
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    For living
                  </label>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='purpose'
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    Holiday home
                  </label>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='text-sm font-medium'>Preferred contact method</div>
                <div className='flex flex-wrap gap-4'>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='contactMethod'
                      defaultChecked
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    WhatsApp
                  </label>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='contactMethod'
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    Email
                  </label>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='radio'
                      name='contactMethod'
                      className='h-4 w-4 appearance-none rounded-full border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                    />
                    Phone call
                  </label>
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='message'>Message (optional)</Label>
                <Textarea
                  id='message'
                  rows={4}
                  placeholder='I’m interested in Samana Imperial Garden, 1BR unit with post-handover payment plan.'
                />
              </div>

              <label className='mt-2 flex items-start gap-3 text-sm'>
                <input
                  type='checkbox'
                  defaultChecked
                  className='mt-1 size-4 appearance-none rounded border border-input outline-none ring-2 ring-transparent transition-[box-shadow] checked:border-primary checked:bg-primary checked:ring-primary/20'
                />
                <span>I agree to be contacted by a licensed real estate agent in Dubai.</span>
              </label>

              <div className='pt-2'>
                <Button className='h-12 w-full text-base'>Send Request</Button>
              </div>
            </form>
          </TabsContent>
        </CardContent>
      </Card>

      <TabsContent value='chat' className='focus-visible:outline-none'>
        <div className='mx-auto w-full max-w-2xl'>
          <div className='rounded-2xl border shadow-sm'>
            <div className='flex items-center gap-2 border-b px-4 py-3'>
              <div className='size-7 rounded-full bg-primary/10' />
              <div className='font-medium'>Halo Support</div>
              <div className='ml-auto text-xs text-muted-foreground'>Today</div>
            </div>

            <div className='space-y-3 p-4'>
              <div className='flex items-start gap-2'>
                <div className='size-6 rounded-full bg-primary/10' />
                <div className='max-w-[80%] rounded-2xl bg-muted px-4 py-2 text-sm'>
                  Hey John! 👋
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <div className='size-6 rounded-full bg-primary/10' />
                <div className='max-w-[80%] rounded-2xl bg-muted px-4 py-2 text-sm'>
                  I’m Jane, and i’m here to help you with all of your questions
                </div>
              </div>

              <div className='flex justify-end'>
                <div className='max-w-[80%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-sm'>
                  Hey Jane!
                </div>
              </div>

              <div className='flex justify-end pr-8'>
                <div className='max-w-[80%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-sm'>
                  Today i’m withdrawing my wallet but not sure if it’s sent to my bank account
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <div className='size-6 rounded-full bg-primary/10' />
                <div className='max-w-[80%] rounded-2xl bg-muted px-4 py-2 text-sm'>
                  Before proceeding, can you give me your ID number please 😊
                </div>
              </div>
            </div>

            <div className='flex flex-wrap gap-2 border-t px-3 py-3'>
              <button className='rounded-full border px-3 py-1.5 text-xs shadow-sm'>
                Plan for beginners
              </button>
              <button className='rounded-full border px-3 py-1.5 text-xs shadow-sm'>
                How do i upgrade?
              </button>
              <button className='rounded-full border px-3 py-1.5 text-xs shadow-sm'>
                Exporting data
              </button>
              <button className='rounded-full border px-3 py-1.5 text-xs shadow-sm'>
                Report a bug
              </button>
              <button className='rounded-full border px-3 py-1.5 text-xs shadow-sm'>
                Cancel subscription
              </button>
            </div>

            <div className='flex items-center gap-2 border-t p-3'>
              <Input placeholder='Ask anything…' className='h-11' />
              <Button size='icon' className='h-11 w-11 rounded-full'>
                ↗
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export { ApplicationFormComponent }
