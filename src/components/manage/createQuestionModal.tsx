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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const CreateQuestionModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useUtils()

  const { mutate: addQuestion } = api.question.createQuestion.useMutation({
    onSuccess: () => {
      toast.success('Question created!')
      ctx.question.getAllQuestions.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<z.infer<typeof questionFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: '',
      answerType: 'TEXT',
    },
  })

  function onSubmit(data: z.infer<typeof questionFormSchema>) {
      addQuestion(data)
      form.reset()
      setmodal(false)
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
        <FormField
          control={form.control}
          name="answerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Antwoord op vraag is tekst of een nummer?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TEXT">Antwoord is tekst</SelectItem>
                  <SelectItem value="NUMBER">Antwoord is een nummer</SelectItem>
                </SelectContent>
              </Select>
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
