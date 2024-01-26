import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from 'next-auth/react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
          answer: '', // Initialize answers as empty strings
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
    console.log(completeData)
    await questionAnswerMutation.mutateAsync(completeData)
    signOut({ redirect: true, callbackUrl: '/login' })
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
                      <div className='flex flex-col text-center text-xl gap-2'>
                        <span>{field.value === '' ? 0 : field.value}</span>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0]?.toString())}
                          defaultValue={[parseInt(field.value)]}
                          min={0}
                          max={10}
                          step={1}
                        />
                      </div>
                    ) : (
                      <Textarea maxLength={300} placeholder="Je antwoord" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}

        <Button type="submit">Verstuur antwoorden</Button>
      </form>
    </Form>
  )
}

export default QuestionModal
