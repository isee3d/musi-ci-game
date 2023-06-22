import { SubLevelOptionalDefaultsSchema } from 'prisma/generated/zod'
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
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Fragment, GameMode } from '@prisma/client'
import { Label } from '~/components/ui/label'

const CreateSublevelModal: React.FC<{
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setmodal }) => {
  const ctx = api.useContext()
  const [addedGameModes, setAddedGameModes] = useState<GameMode[]>([])
  const [addedFragments, setAddedFragments] = useState<Fragment[]>([])
  const gameModeQuery = api.gameMode.getAllGameModes.useQuery()
  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()

  const { mutate: addSublevel } = api.sublevel.createSubLevel.useMutation({
    onSuccess: () => {
      toast.success('Sublevel created!')
      ctx.sublevel.getAllSubLevels.invalidate()
    },
    onError: () => {
      toast.error('Failed to upload new Sublevel! Please try again.')
    },
  })

  const onAddGameModeButtonClick = (gameMode: GameMode) => {
    setAddedGameModes([...addedGameModes, gameMode])
  }

  const onRemoveGameModeButtonClick = (gameMode: GameMode) => {
    setAddedGameModes(addedGameModes.filter((g) => g.id !== gameMode.id))
  }

  const onAddFragmentButtonClick = (fragment: Fragment) => {
    setAddedFragments([...addedFragments, fragment])
  }

  const onRemoveFragmentButtonClick = (fragment: Fragment) => {
    setAddedFragments(addedFragments.filter((f) => f.id !== fragment.id))
  }

  const form = useForm<z.infer<typeof SubLevelOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(SubLevelOptionalDefaultsSchema),
    defaultValues: {
      name: '',
      description: '',
      fragmentToShow: 0,
    },
  })

  function onSubmit(data: z.infer<typeof SubLevelOptionalDefaultsSchema>) {
    addSublevel({ ...data, fragments: [], gameModes: [] })
    setAddedGameModes([])
    setAddedFragments([])
    form.reset()
    setmodal(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sublevel naam</FormLabel>
                <FormControl>
                  <Input placeholder="Sublevel 1" {...field} />
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
          <FormField
            control={form.control}
            name="fragmentToShow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>fragment to show</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="fragments to show"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col">
            <Label className="text-3xl">Toegevoegde GameModes</Label>
            <div className="flex flex-col gap-y-2">
              {addedGameModes.map((gameMode) => {
                return (
                  <div
                    key={gameMode.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{gameMode.name}</h2>
                    <Button
                      onClick={() => onRemoveGameModeButtonClick(gameMode)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Verwijder van sublevel
                    </Button>
                  </div>
                )
              })}
            </div>
            <Label className="text-3xl">Beschikbare gameModes</Label>
            <div className="flex flex-col gap-y-2">
              {gameModeQuery.data?.map((gameMode) => {
                if (addedGameModes.find((addedGameMode) => addedGameMode.id === gameMode.id))
                  return null
                return (
                  <div
                    key={gameMode.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{gameMode.name}</h2>
                    <Button
                      onClick={() => onAddGameModeButtonClick(gameMode)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Voeg GameMode toe
                    </Button>
                  </div>
                )
              })}
            </div>

            {/* Under here the fragments to add */}
            <Label className="text-3xl">Toegevoegde Fragments</Label>
            <div className="flex flex-col gap-y-2">
              {addedFragments.map((fragment) => {
                return (
                  <div
                    key={fragment.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{fragment.name}</h2>
                    <Button
                      onClick={() => onRemoveFragmentButtonClick(fragment)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Verwijder van sublevel
                    </Button>
                  </div>
                )
              })}
            </div>
            <Label className="text-3xl">Beschikbare Fragmenten</Label>
            <div className="flex flex-col gap-y-2">
              {fragmentQuery.data?.map((fragment) => {
                if (addedFragments.find((addedFragment) => addedFragment.id === fragment.id))
                  return null
                return (
                  <div
                    key={fragment.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{fragment.name}</h2>
                    <Button
                      onClick={() => onAddFragmentButtonClick(fragment)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Voeg fragment toe
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
          <Button type="submit" className="mx-3">
            Sla nieuw sublevel op
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
    </>
  )
}

export default CreateSublevelModal
