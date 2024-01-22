import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { signInFormSchema } from 'types/FormSchema'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const Signin = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(signInFormSchema),
  })

  async function onSubmit (data: z.infer<typeof signInFormSchema>) {
    await signIn("credentials", { ...data, redirect: true, callbackUrl: "/tutorial" })
    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col justify-center gap-y-5 p-40 text-center align-middle"
        >
          <h2 className="text-5xl font-bold">Login met deelnemernummer en wachtwoord</h2>
          <FormField
            control={form.control}
            name="participantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deelnemer nummer</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    placeholder="Deelnemer nummer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wachtwoord</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    type="password"
                    placeholder="Vul wachtwoord in"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
          {/* <Button
          onClick={() => {
            form.reset()
            setmodal(false)
          }}
          type="button"
          className="mx-3"
        >
          Annuleren
        </Button> */}
        </form>
      </Form>
    </>
  )
}

export default Signin
