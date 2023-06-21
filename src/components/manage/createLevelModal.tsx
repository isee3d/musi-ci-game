import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { LevelOptionalDefaultsSchema, SubLevel } from 'prisma/generated/zod'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Label } from '@radix-ui/react-label'

const CreateLevelModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useContext()
  const [addedSubLevels, setAddedSubLevels] = useState<SubLevel[]>([])
  const subLevelQuery = api.sublevel.getAllSubLevels.useQuery()
  const levelQuery = api.level.getAllLevels.useQuery()
  const { mutate: addLevel } = api.level.createLevel.useMutation({
    onSuccess: () => {
      ctx.level.getAllLevels.invalidate()
    },
  })

  const onAddSublevelButtonClick = (sublevel: SubLevel) => {
    setAddedSubLevels([...addedSubLevels, sublevel])
  }

  const onRemoveSubLevelButtonClick = (fragment: SubLevel) => {
    setAddedSubLevels(addedSubLevels.filter((f) => f.id !== fragment.id))
  }

  const form = useForm<z.infer<typeof LevelOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(LevelOptionalDefaultsSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(data: z.infer<typeof LevelOptionalDefaultsSchema>) {
    const exists = levelQuery.data?.find((team) => team.name === data.name)
    const toastMessage = exists ? 'Level already exists!' : 'Level created!'
    console.log(data)
    exists
      ? toast.error(toastMessage)
      : (addLevel({ ...data, sublevels: [] }), toast.success(toastMessage))
    form.reset()
    setmodal(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level naam</FormLabel>
              <FormControl>
                <Input placeholder="Team 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschrijving</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Beschrijving"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* The two lists, the usblevels to add and all the sublevels to choose from */}
        {/* The available sublevels */}
        <div className="flex w-full flex-col">
          <Label>Toegevoegde Sublevels</Label>
          {addedSubLevels.map((sublevel) => {
            return (
              <div
                key={sublevel.id}
                className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
              >
                <h2 className="text-2xl font-bold">{sublevel.name}</h2>
                <Button
                  onClick={() => onRemoveSubLevelButtonClick(sublevel)}
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                >
                  Verwijder van level
                </Button>
              </div>
            )
          })}
          <Label>Beschikbare Sublevels</Label>
          {subLevelQuery.data?.map((sublevel) => {
            if (addedSubLevels.find((addedSublevel) => addedSublevel.id === sublevel.id))
              return null
            return (
              <div
                key={sublevel.id}
                className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
              >
                <h2 className="text-2xl font-bold">{sublevel.name}</h2>
                <Button
                  onClick={() => onAddSublevelButtonClick(sublevel)}
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                >
                  Voeg Sublevel toe
                </Button>
              </div>
            )
          })}
        </div>

        <Button type="submit">Sla nieuw Level op</Button>
        <Button
          onClick={() => {
            form.reset()
            setmodal(false)
          }}
          type="button"
          className="mx-3"
        >
          Annuleren
        </Button>
      </form>
    </Form>
  )
}

export default CreateLevelModal
