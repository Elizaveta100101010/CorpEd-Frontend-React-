import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }

export const requestallUsers = async () => {
    return axios
      .get(
        `${BASE_URL}users`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  