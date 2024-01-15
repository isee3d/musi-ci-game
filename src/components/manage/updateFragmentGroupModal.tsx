import { Fragment, FragmentGroup } from '@prisma/client'
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
import { Button, buttonVariants } from '~/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Textarea } from '~/components/ui/textarea'
import { fragmentGroupFormSchema, teamFormSchema } from 'types/FormSchema'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Label } from '~/components/ui/label'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  fragmentGroup: any
}

const UpdateFragmentGroupModal: React.FC<BaseStaticModalProps> = ({ setmodal, fragmentGroup }) => {
  const [addedFragments, setAddedFragments] = useState<Fragment[] | undefined>(fragmentGroup.fragments)
  const ctx = api.useContext()
  // const fragmentGroupQuery = api.fragmentNote.getAllFragmentGroups.useQuery()
  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()
  const { mutate: updatefragmentGroup } = api.fragmentNote.updateFragmentGroup.useMutation({
    onSuccess: () => {
      toast.success('FragmentGroup updated!')
      ctx.fragmentNote.getAllFragmentGroups.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  // const fragmentsOfFragmentGroup = api.fragmentNote.getFragmentsOfFragmentGroup.useQuery(
  //   { id: fragmentGroup.id },
  //   { onSuccess: (data) => setAddedFragments(data?.fragments) }
  // )

  const onAddFragmentButtonClick = (fragment: Fragment) => {
    setAddedFragments((prev) => [...(prev ?? []), fragment])
  }

  const onRemoveFragmentButtonClick = (fragment: Fragment) => {
    setAddedFragments((prev) => (prev ?? []).filter((f) => f.id !== fragment.id))
  }

  const form = useForm<z.infer<typeof fragmentGroupFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(fragmentGroupFormSchema),
    defaultValues: {
      name: fragmentGroup.name,
      description: fragmentGroup.description,
      fragments: fragmentGroup.fragments?.map((f) => f.id) ?? [],
    },
  })

  function onSubmit(data: z.infer<typeof fragmentGroupFormSchema>) {
    console.log('comning here', addedFragments, fragmentGroup.id, data)
    // const exists = fragmentGroupQuery.data?.find(
    //   (t) => t.name === data.name && t.id !== fragmentGroup.id
    // )
    // if (!exists) {
      updatefragmentGroup({
        name: data.name,
        description: data.description,
        id: fragmentGroup.id,
        fragments: addedFragments?.map((f) => f.id) ?? [],
      })
      form.reset()
      setmodal(false)
    // }
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
                <Input placeholder="Fragment groep 1" {...field} />
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
            {addedFragments?.map((fragment) => {
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
                    Verwijder van fragmentgroep
                  </Button>
                </div>
              )
            })}
          </div>
          <Label className="text-3xl">Beschikbare Fragmenten</Label>
          <div className="flex flex-col gap-y-2">
            {fragmentQuery.data?.map((fragment) => {
              if (addedFragments?.find((addedFragment) => addedFragment.id === fragment.id))
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
        <Button type="submit">Sla aangepaste fragment groep op</Button>
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

export default UpdateFragmentGroupModal
