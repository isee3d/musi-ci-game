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
import { fragmentGroupFormSchema } from 'types/FormSchema'
import { Fragment } from '@prisma/client'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Label } from '~/components/ui/label'

const CreateFragmentGroupModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
   const [addedFragments, setAddedFragments] = useState<Fragment[]>([])
  const ctx = api.useContext()
  const fragmentGroupQuery = api.fragmentNote.getAllFragmentGroups.useQuery()
   const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()

  const { mutate: addFragmentGroup } = api.fragmentNote.createFragmentGroup.useMutation({
    onSuccess: () => {
      toast.success('fragment group created!')
      ctx.fragmentNote.getAllFragmentGroups.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

   const onAddFragmentButtonClick = (fragment: Fragment) => {
     setAddedFragments([...addedFragments, fragment])
   }

   const onRemoveFragmentButtonClick = (fragment: Fragment) => {
     setAddedFragments(addedFragments.filter((f) => f.id !== fragment.id))
   }

  const form = useForm<z.infer<typeof fragmentGroupFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(fragmentGroupFormSchema),
    defaultValues: {
      name: '',
      fragments: [],
    },
  })

  function onSubmit(data: z.infer<typeof fragmentGroupFormSchema>) {
    const exists = fragmentGroupQuery.data?.find((team) => team.name === data.name)
    if (!exists) {
      addFragmentGroup({
        ...data,
        fragments: addedFragments.map((f) => f.id),
      })
      form.reset()
      setmodal(false)
    } else {
      toast.error('Fragment Groep naam bestaat al!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>fragment groep naam</FormLabel>
              <FormControl>
                <Input placeholder="fragment groep 1" {...field} />
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
        <Button type="submit">Sla nieuwe fragment groep op</Button>
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

export default CreateFragmentGroupModal
