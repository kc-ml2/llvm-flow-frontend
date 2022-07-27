// import { post } from '@/api/http-common'
// import { CompilerOutput } from '@/api/types/response'

// export default {
//   async getCompilerOutput(payload: FormData) {
//     const result = await post<FormData, CompilerOutput>('/upload/', payload)
//     return result.data
//   },
// }

import { getBaseConfig, serializeResponse } from '@/api/http-common'

const { REACT_APP_API_URL } = process.env

const post = (url: string, data: any, options: any) =>
  fetch(`${REACT_APP_API_URL}/${url}`, {
    ...getBaseConfig('post'),
    ...options,
    body: JSON.stringify(Object.fromEntries(data)),
  }).then(serializeResponse)

const getCompilerOutput = ({ data, token }: any) => {
  const headers = {
    Authorization: 'Token ' + token,
    'Content-type':
      'multipart/form-data; boundary=177130003042384797933296855923',
  }

  return post('upload/', data, { headers })
}

export default getCompilerOutput
