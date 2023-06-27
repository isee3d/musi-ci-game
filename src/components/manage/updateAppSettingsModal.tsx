import { AppSettings } from '@prisma/client'
import { api } from '~/utils/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { appSettingsFormSchema } from 'types/FormSchema'
import { HuePicker } from 'react-color'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  appSettings: AppSettings
}

const UpdateAppSettingsModal: React.FC<BaseStaticModalProps> = ({ setmodal, appSettings }) => {
    const ctx = api.useContext()
  const { mutate: updateAppSettings } = api.appSettings.updateAppSettings.useMutation({
    onSuccess: () => {
      toast.success('AppSettings updated!')
      ctx.appSettings.getAllSettings.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const form = useForm<z.infer<typeof appSettingsFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(appSettingsFormSchema),
    defaultValues: {
      fragmentDotColor: appSettings.fragmentDotColor ?? undefined,
      fragmentDotLineColor: appSettings.fragmentDotLineColor ?? undefined,
    },
  })

  function onSubmit(data: z.infer<typeof appSettingsFormSchema>) {
    updateAppSettings({
      id: appSettings.id,
      fragmentDotColor: data.fragmentDotColor,
      fragmentDotLineColor: data.fragmentDotLineColor,
    })
    form.reset()
    setmodal(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        <FormField
          control={form.control}
          name="fragmentDotColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fragment speler bolletje kleur</FormLabel>
              <FormControl>
                <HuePicker
                  color={field.value || 'red'}
                  onChangeComplete={(color) => field.onChange(color.hex)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fragmentDotLineColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fragment speler lijn kleur</FormLabel>
              <FormControl>
                <HuePicker
                  color={field.value || 'red'}
                  onChangeComplete={(color) => field.onChange(color.hex)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sla aangepaste app settings op</Button>
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

export default UpdateAppSettingsModal
