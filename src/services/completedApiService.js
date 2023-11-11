import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }



export const requestCompleted = async () => {
    return axios
      .get(
        `${BASE_URL}completed`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  

  export const requestCreateCompleted= async ({ login, course}) => {

    return axios
      .post(
        `${BASE_URL}completed`,
        {
            login: login,
            course: course,
        },
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }