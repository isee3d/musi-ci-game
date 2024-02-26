import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, FragmentGroup, GameMode, SubLevel } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { sublevelFormSchema } from 'types/FormSchema'
import { z } from 'zod'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const UpdateSublevelModal: React.FC<{
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  sublevel: SubLevel
}> = ({ setmodal, sublevel }) => {
  const ctx = api.useUtils()
  const [addedGameModes, setAddedGameModes] = useState<GameMode[]>([])
  const [addedFragments, setAddedFragments] = useState<Fragment[]>([])
  const [addedFragmentGroups, setAddedFragmentGroups] = useState<FragmentGroup[]>([])
  const gameModeQuery = api.gameMode.getAllGameModes.useQuery()
  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()
  const fragmentGroupQuery = api.fragmentNote.getAllFragmentGroups.useQuery()

  const { mutate: updateSublevel } = api.sublevel.updateSubLevel.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.name} aangepast!`)
      ctx.sublevel.getAllSubLevels.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const gameModesOfSublevel = api.sublevel.getGameModesOfSublevel.useQuery(
    { sublevelId: sublevel.id.toString() },
    { onSuccess: (data) => setAddedGameModes(data) },
  )

  const fragmentGroupsOfSublevel = api.sublevel.getFragmentGroupsOfSublevel.useQuery(
    { sublevelId: sublevel.id.toString() },
    { onSuccess: (data) => setAddedFragmentGroups(data?.fragmentGroups ?? []) },
  )

  const fragmentsOfSublevel = api.sublevel.getFragmentsOfSublevel.useQuery(
    { sublevelId: sublevel.id.toString() },
    { onSuccess: (data) => setAddedFragments(data.fragments) },
  )

  const onAddFragmentGroupButtonClick = (fragmentGroup: FragmentGroup) => {
    setAddedFragmentGroups((prev) => [...(prev ?? []), fragmentGroup])
  }

  const onRemoveFragmentGroupButtonClick = (fragmentGroup: FragmentGroup) => {
    setAddedFragmentGroups((prev) => (prev ?? []).filter((f) => f.id !== fragmentGroup.id))
  }

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

  const form = useForm<z.infer<typeof sublevelFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(sublevelFormSchema),
    defaultValues: {
      name: sublevel.name,
      description: sublevel.description,
      fragmentToShow: sublevel.fragmentToShow,
      fragmentToShowLuisteren: sublevel?.fragmentToShowLuisteren?.toString() ?? undefined,
      fragmentToShowSpelen: sublevel?.fragmentToShowSpelen?.toString() ?? undefined,
      fragmentToShowUitdaging: sublevel?.fragmentToShowUitdaging?.toString() ?? undefined,
      bpm: sublevel.bpm ?? 60,
      color: sublevel.color,
      mFactor: sublevel?.mFactor?.toString() ?? undefined,
      pFactor: sublevel?.pFactor?.toString() ?? undefined,
      sFactor: sublevel?.sFactor?.toString() ?? undefined,
      tFactor: sublevel?.tFactor?.toString() ?? undefined,
      kFactor: sublevel?.kFactor?.toString() ?? undefined,
    },
  })

  function onSubmit(data: z.infer<typeof sublevelFormSchema>) {
    console.log(data)
    const processedData = {
      ...data,
      fragmentToShowLuisteren:
        data.fragmentToShowLuisteren === undefined ? null : parseInt(data.fragmentToShowLuisteren),
      fragmentToShowSpelen:
        data.fragmentToShowSpelen === undefined ? null : parseInt(data.fragmentToShowSpelen),
      fragmentToShowUitdaging:
        data.fragmentToShowUitdaging === undefined ? null : parseInt(data.fragmentToShowUitdaging),
      mFactor: data.mFactor === undefined ? null : parseInt(data.mFactor),
      pFactor: data.pFactor === undefined ? null : parseInt(data.pFactor),
      sFactor: data.sFactor === undefined ? null : parseInt(data.sFactor),
      tFactor: data.tFactor === undefined ? null : parseInt(data.tFactor),
      kFactor: data.kFactor === undefined ? null : parseInt(data.kFactor),
      id: sublevel.id,
      fragments: addedFragments.map((f) => f.id),
      gameModes: addedGameModes.map((g) => g.id),
      fragmentGroups: addedFragmentGroups.map((fg) => fg.id),
    }
    updateSublevel({ ...processedData })
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fragmentToShowLuisteren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>fragment to show in luisteren</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="fragments to show in luisteren"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fragmentToShowSpelen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>fragment to show in spelen</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="fragments to show in spelen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fragmentToShowUitdaging"
            render={({ field }) => (
              <FormItem>
                <FormLabel>fragment to show in Uitdaging</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="fragments to show in uitdaging"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bpm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BPM</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="bijv... 60"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sublevel kleur (klik om aan te passen)</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    value={field.value || 'FFF'}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>mFactor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="Bijv... 60"
                    {...field}
                    // onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pFactor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="Bijv... 60"
                    {...field}
                    // onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>sFactor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="Bijv... 60"
                    {...field}
                    // onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>tFactor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="Bijv... 60"
                    {...field}
                    // onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>kFactor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                    }
                    placeholder="Bijv... 60"
                    {...field}
                    // onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col">
            <Label className="text-3xl">Toegevoegde Fragment groepen</Label>
            <div className="flex flex-col gap-y-2">
              {addedFragmentGroups?.map((fragmentGroup) => {
                return (
                  <div
                    key={fragmentGroup.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{fragmentGroup.name}</h2>
                    <Button
                      onClick={() => onRemoveFragmentGroupButtonClick(fragmentGroup)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Verwijder fragment groep van sublevel
                    </Button>
                  </div>
                )
              })}
            </div>
            <Label className="text-3xl">Beschikbare fragment groepen</Label>
            <div className="flex flex-col gap-y-2">
              {fragmentGroupQuery.data?.map((fragmentGroup) => {
                if (addedFragmentGroups?.find((fg) => fg.id === fragmentGroup.id)) return null
                return (
                  <div
                    key={fragmentGroup.id}
                    className="grid min-w-full grid-cols-[1fr,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                  >
                    <h2 className="text-2xl font-bold">{fragmentGroup.name}</h2>
                    <Button
                      onClick={() => onAddFragmentGroupButtonClick(fragmentGroup)}
                      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                    >
                      Voeg fragment groep toe
                    </Button>
                  </div>
                )
              })}
            </div>
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
          <Button type="submit" className="mx-3" disabled={addedGameModes.length === 0}>
            Sla aangepaste sublevel op
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

export default UpdateSublevelModal
