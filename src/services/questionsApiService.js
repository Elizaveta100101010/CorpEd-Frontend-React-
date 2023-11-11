import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }



export const requestQuestions = async () => {
    return axios
      .get(
        `${BASE_URL}questions`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  

  export const requestCreateQuestion = async ({question, answer}) => {

    return axios
    .post(
      `${BASE_URL}questions`,
      {
          question: question,
          answer: answer,
      },
    )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  