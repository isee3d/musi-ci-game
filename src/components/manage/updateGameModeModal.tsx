import { GameMode } from '@prisma/client'
import { api } from '~/utils/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { gameModeFormSchema } from 'types/FormSchema'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  gameMode: GameMode
}

const UpdateGameModeModal: React.FC<BaseStaticModalProps> = ({ setmodal, gameMode }) => {
  const ctx = api.useContext()
  const gameModeQuery = api.gameMode.getAllGameModes.useQuery()
  const { mutate: updateGameMode } = api.gameMode.updateGameMode.useMutation({
    onSuccess: () => {
      toast.success('GameMode updated!')
      ctx.gameMode.getAllGameModes.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const form = useForm<z.infer<typeof gameModeFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(gameModeFormSchema),
    defaultValues: {
      name: gameMode.name,
      amountOfScenes: gameMode.amountOfScenes ?? undefined,
      one: gameMode.one ?? undefined,
      two: gameMode.two ?? undefined,
      three: gameMode.three ?? undefined,
      go: gameMode.go ?? undefined,
    },
  })

  function onSubmit(data: z.infer<typeof gameModeFormSchema>) {
    updateGameMode({
      id: gameMode.id,
      amountOfScenes: data.amountOfScenes,
      name: data.name,
      one: data.one,
      two: data.two,
      three: data.three,
      go: data.go,
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
              <FormLabel>Gamemode naam</FormLabel>
              <FormControl>
                <Input placeholder="Gamemode naam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amountOfScenes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aantal Scenes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Aantal scenes"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  type="number"
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
          name="one"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eerste getal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  placeholder="1000"
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
          name="two"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tweede getal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  placeholder="1000"
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
          name="three"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Derde getal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  placeholder="1000"
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
          name="go"
          render={({ field }) => (
            <FormItem>
              <FormLabel>go woord</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  placeholder="1000"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sla aangepaste gamemode op</Button>
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

export default UpdateGameModeModal
