import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { questionAnswerFormSchema, teamFormSchema } from 'types/FormSchema'
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
import { Slider } from '~/components/ui/slider'
import { Textarea } from '~/components/ui/textarea'
import { api } from '~/utils/api'

const QuestionModal: React.FC<{
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  questions: any
}> = ({ setModal: setModal, questions }) => {
  const { data: session } = useSession()

  const questionAnswerMutation = api.question.createQuestionAnswers.useMutation({
    onError: () => {
      toast.error('Er is iets misgegaan')
    },
  })

  const defaultValues = questions
    ? {
        questionAnswers: questions.map((question: any) => ({
          id: question.id,
          question: question.question,
          answer: '5', // Initialize answers as empty strings
          answerType: question.answerType,
        })),
      }
    : { questionAnswers: [] }

  const form = useForm<z.infer<typeof questionAnswerFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(questionAnswerFormSchema),
    defaultValues,
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'questionAnswers',
  })

  async function onSubmit(data: z.infer<typeof questionAnswerFormSchema>) {
    const completeData = data.questionAnswers.map(({ answerType, ...rest }) => {
      return {
        ...rest,
        id_User: session?.user.id || '',
      }
    })
    await questionAnswerMutation.mutateAsync(completeData)
    try {
      await signOut({ redirect: true, callbackUrl: '/login' }).then(() => {
        toast.success('Bedankt voor het invullen van de vragenlijst')
      })
    } catch (error) {
      console.error(error)
    }
    form.reset()
    setModal(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        {fields.map((item, index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              name={`questionAnswers.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.question}</FormLabel>
                  <FormControl>
                    {item.answerType === 'NUMBER' ? (
                      <div className="flex flex-col gap-2 text-center text-xl">
                        <span>{field.value === '' ? 5 : field.value}</span>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0]?.toString())}
                          defaultValue={[parseInt(field.value)]}
                          min={0}
                          max={10}
                          step={1}
                        />
                      </div>
                    ) : (
                      <Textarea
                        defaultValue={''}
                        onChange={(v) => field.onChange(v.target.value)}
                        placeholder="Je antwoord"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}

        <div className="flex gap-4">
          <Button type="submit">Verstuur antwoorden</Button>
          <Button
            onClick={() => {
              setModal(false)
            }}
          >
            Annuleren
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default QuestionModal
