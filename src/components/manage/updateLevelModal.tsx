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
import { Level } from '@prisma/client'

const UpdateLevelModal: React.FC<{
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  level: Level
}> = ({ setmodal, level }) => {
  const ctx = api.useContext()
  // const subLevelQuery = api.sublevel.getAllSubLevels.useQuery()
  // const levelQuery = api.level.getAllLevels.useQuery()
  const [addedSublevels, setAddedSublevels] = useState<SubLevel[]>([])
  const [remainingSubLevels, setRemainingSublevels] = useState<SubLevel[]>([])

  const subLevelsOfLevelQuery = api.level.getSubLevelsOfLevel.useQuery(
    { levelId: level.id.toString() },
    { onSuccess: (data) => setAddedSublevels(data) }
  )

  const otherSubLevelsQuery = api.level.getAllRemainingSubLevelsOfLevel.useQuery(
    { levelId: level.id.toString() },
    { onSuccess: (data) => setRemainingSublevels(data) }
  )

  const { mutate: updateLevel } = api.level.updateLevel.useMutation({
    onSuccess: () => {
      toast.success('Level updated!')
      ctx.level.getAllLevels.invalidate()
    },
  })
  const { mutate: updateSublevelsOfLevel } = api.level.setSubLevelsToLevel.useMutation({
    onSuccess: () => {
      ctx.level.getAllLevels.invalidate()
    },
  })

  const onAddSublevelButtonClick = (sublevel: SubLevel) => {
    setAddedSublevels([...addedSublevels, sublevel])
    setRemainingSublevels(remainingSubLevels.filter((s) => s.id !== sublevel.id))
  }

  const onRemoveSubLevelButtonClick = (sublevel: SubLevel) => {
    setAddedSublevels(addedSublevels.filter((s) => s.id !== sublevel.id))
    setRemainingSublevels([...remainingSubLevels, sublevel])
  }

  const form = useForm<z.infer<typeof LevelOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(LevelOptionalDefaultsSchema),
    defaultValues: {
      name: level.name,
      description: level.description,
    },
  })

  function onSubmit(data: z.infer<typeof LevelOptionalDefaultsSchema>) {
    updateLevel({
      id: level.id,
      name: data.name,
      description: data.description,
    })
    updateSublevelsOfLevel({
      levelId: level.id.toString(),
      sublevels: addedSublevels.map((s) => s.id),
    })
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
        <div className="flex w-full flex-col">
          <Label>Toegevoegde Sublevels</Label>
          {addedSublevels.map((sublevel) => {
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
          {remainingSubLevels.map((sublevel) => {
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

        <Button disabled={!form.formState.isValid} type="submit">
          Wijzigingen opslaan
        </Button>
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

export default UpdateLevelModal
