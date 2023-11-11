import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }



export const requestAppeals = async () => {
    return axios
      .get(
        `${BASE_URL}appeal`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  

  export const requestCreateAppeal= async ({ course, feedback, login, token}) => {
    console.log(course,feedback,login,token,'hidudu')
    return axios
      .post(
        `${BASE_URL}appeal`,
        {
            login: login,
            course: course,
            question: feedback,
        },
        {
          headers: { 'Content-Type': 'application/json',Authorization: `${token}` },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }