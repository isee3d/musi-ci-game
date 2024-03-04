import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { SubLevel } from 'prisma/generated/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { levelFormSchema } from 'types/FormSchema'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { imagesConfig } from '~/config/site'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const CreateLevelModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useUtils()
  const [addedSubLevels, setAddedSubLevels] = useState<SubLevel[]>([])
  const subLevelQuery = api.sublevel.getAllSubLevels.useQuery()
  const levelQuery = api.level.getAllLevels.useQuery()
  const { mutate: addLevel } = api.level.createLevel.useMutation({
    onSuccess: () => {
      ctx.level.getAllLevels.invalidate()
      toast.success('level created!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onAddSublevelButtonClick = (sublevel: SubLevel) => {
    setAddedSubLevels([...addedSubLevels, sublevel])
  }

  const onRemoveSubLevelButtonClick = (fragment: SubLevel) => {
    setAddedSubLevels(addedSubLevels.filter((f) => f.id !== fragment.id))
  }

  const form = useForm<z.infer<typeof levelFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(levelFormSchema),
    defaultValues: {
      name: '',
      instrument: imagesConfig.drumstel,
    },
  })

  function onSubmit(data: z.infer<typeof levelFormSchema>) {
    const exists = levelQuery.data?.find((level) => level.name === data.name)
    if (!exists) {
      addLevel({
        ...data,
        id_Game: 1,
        points: data.points === undefined ? undefined : parseInt(data.points),
        sublevels: addedSubLevels.map((s) => s.id),
      })
      setAddedSubLevels([])
      form.reset()
      setmodal(false)
    } else {
      toast.error('Level naam bestaat al!')
    }
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
                <FormLabel>Level naam</FormLabel>
                <FormControl>
                  <Input placeholder="level 1" {...field} />
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
            name="instrument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecteer instrument</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies het instrument dat hoort bij het level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(imagesConfig).map(([instrument, imagePath]) => (
                        <SelectItem key={instrument} value={imagePath}>
                          {instrument}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <FormLabel>Level kleur (klik om aan te passen)</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    value={field.value || 'red'}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aantal punten om instrument te verdienen</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="vul punten in"
                    onChange={(e) => field.onChange(e.target.value)}
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

          <Button type="submit" disabled={addedSubLevels.length === 0}>
            Sla nieuw Level op
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

export default CreateLevelModal
