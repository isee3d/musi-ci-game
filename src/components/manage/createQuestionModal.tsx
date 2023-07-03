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
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { questionFormSchema } from 'types/FormSchema'

const CreateQuestionModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useContext()
  const questionQuery = api.question.getAllQuestions.useQuery()

  const { mutate: addQuestion } = api.question.createQuestion.useMutation({
    onSuccess: () => {
      toast.success('Question created!')
      ctx.question.getAllQuestions.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const form = useForm<z.infer<typeof questionFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: '',
    },
  })

  function onSubmit(data: z.infer<typeof questionFormSchema>) {
    const exists = questionQuery.data?.find((question) => question.question === data.question)
    if (!exists) {
      addQuestion(data)
      form.reset()
      setmodal(false)
    } else {
      toast.error('Vraag bestaat al!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vraag</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="de vraag"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sla nieuwe vraag op</Button>
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

export default CreateQuestionModal
