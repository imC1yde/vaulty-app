import type { OperationVariables } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import type { DocumentNode } from 'graphql/language'
import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form'
import type { ZodSchema } from 'zod'

interface IUseFormMutationProps<TForm extends FieldValues, TData, TVariables extends OperationVariables> {
  schema: ZodSchema<TForm>
  mutation: DocumentNode
  mutationOptions?: useMutation.Options<TData, TVariables>
  formOptions?: UseFormProps<TForm>
  mapVariables?: (data: TForm) => TVariables
}

export const useMutationForm = <
  TForm extends FieldValues,
  TData = any,
  TVariables extends OperationVariables = any>
({ schema, mutation, mutationOptions, formOptions, mapVariables }: IUseFormMutationProps<TForm, TData, TVariables>) => {
  const form = useForm<TForm>({
    resolver: zodResolver(schema as any),
    ...formOptions
  })

  const [ mutate, mutationResult ] = useMutation<TData, TVariables>(mutation, mutationOptions)

  const hasFile = (vars: any): boolean => {
    return Object.values(vars).some(value =>
      value instanceof File || (typeof value === 'object' && value !== null && hasFile(value))
    )
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const variables = mapVariables ? mapVariables(values) : (values as unknown as TVariables)

    if (!hasFile(variables)) {
      return await mutate({ variables })
    }

    try {
      const formData = new FormData()
      const operations = {
        query: mutation.loc?.source.body,
        variables: {
          ...variables,
          file: null
        }
      }

      formData.append('operations', JSON.stringify(operations))
      formData.append('map', JSON.stringify({ '0': [ 'variables.file' ] }))
      formData.append('0', variables.file)

      const { data: result } = await axios.post(`/graphql`, formData, {
        withCredentials: true,
        headers: {
          'Apollo-Require-Preflight': 'true'
        }
      })


      if (result.errors) {
        mutationOptions?.onError?.(result.errors[0])
        return result
      }

      mutationOptions?.onCompleted?.(result.data)
      return result

    } catch (error: any) {
      mutationOptions?.onError?.(error)
    }
  })

  return {
    form,
    mutate,
    mutationResult,
    onSubmit
  }
}