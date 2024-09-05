import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { routePaths } from '~/config/routing'

const Signin = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(signInFormSchema),
  })

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    const signinResponse = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/podium',
    })
    console.log(signinResponse)
    if (signinResponse?.error) {
      toast.error(`Het wachtwoord of Deelnemer nummer is incorrect`, { duration: 2500 })
    } else if (signinResponse?.ok) {
      router.push(routePaths.podium)
      form.reset()
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-screen w-full flex-col justify-center gap-8 md:w-1/2 md:p-24"
        >
          <h2 className="text-balance py-4 text-center text-xl font-bold lg:text-4xl">
            Musi-CI Melody Game Oefen met toonhoogtes en korte melodietjes
          </h2>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="participantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deelnemer nummer</FormLabel>
                  <FormControl>
                    <Input autoComplete="new-password" placeholder="Deelnemer nummer" {...field} />
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
          </div>
          <div className="flex w-full justify-start gap-4">
            <Button className="w-1/2" type="submit">
              Inloggen
            </Button>
            <Button className="w-1/2" asChild>
              <Link href={routePaths.home}>Annuleren</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Signin
