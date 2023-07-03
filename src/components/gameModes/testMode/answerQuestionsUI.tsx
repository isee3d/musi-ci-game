import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { questionAnswerFormSchema, questionAnswerSchema } from 'types/FormSchema'
import { z } from 'zod'
import { api } from '~/utils/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface AnswerQuestionsProps {
  sublevelId: string
  questions: string[] | undefined
}

const AnswerQuestionsUI: React.FC<AnswerQuestionsProps> = ({ sublevelId, questions }) => {
  const { data: session } = useSession()

  const { mutate: sendQuestionAnswers } = api.question.createQuestionAnswers.useMutation({
    onSuccess: () => {
      form.reset()
      // send xstate event
    },
    onError: (err) => {
      console.log(err)
      // send xstate event
    },
  })

  useEffect(() => {
    if (questions) {
      form.reset(
        questions.map((question) => ({
          question,
          answer: '',
        }))
      )
    }
  }, [questions])


  const form = useForm<z.infer<typeof questionAnswerFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(questionAnswerFormSchema),
    defaultValues:
      questions?.map((question) => ({
        question,
        answer: '',
      })) ,
  })

  function onSubmit(data: z.infer<typeof questionAnswerFormSchema>) {
    const dataWithUserId = data.map((item) => ({
      ...item,
      id_User: session?.user?.id ?? '',
    }))
    sendQuestionAnswers(dataWithUserId)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
          {questions?.map((question, index) => (
            <>
              <FormField
                key={index}
                control={form.control}
                name={`${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vraag</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uw antwoord</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Uw antwoord"
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ))}

          <Button type="submit">Verstuur uw antwoorden</Button>
        </form>
      </Form>
    </>
  )
}

export default AnswerQuestionsUI
