import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }



export const requestPositions = async () => {
    return axios
      .get(
        `${BASE_URL}positions`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  

  export const requestCreatePosition= async ({ position, courses, token}) => {
console.log(courses,position,token,"hwewew")
    return axios
      .post(
        `${BASE_URL}positions`,
        {
            position: position,
            courses: courses,
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


  export const requestChangePosition= async ({ position, courses, token}) => {
    console.log(courses,position,token,"hwewew")
        return axios
          .put(
            `${BASE_URL}positions`,
            {
                position: position,
                courses: courses,
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