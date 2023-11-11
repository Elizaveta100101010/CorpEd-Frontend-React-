import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'


function errorCreator(error) {
    let errorObject = new Error('Server error')
    errorObject.status = error.response.data.errors
    throw errorObject
  }


  export const requestDeleteCourse = async ({ id, token }) => {
    console.log(id, token)
    return axios
      .delete(
        `${BASE_URL}courses/${id}`,
        {
          headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }


  export const requestGetCourse = async ({ id }) => {
    return axios
      .get(
        `${BASE_URL}courses/${id}`
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }



  export const requestCreateCourse = async ({ title, description, tags, url, text, token }) => {

    return axios
      .post(
        `${BASE_URL}courses`,
        {
            title: title,
            description: description,
            tags: tags,
            url: url,
            text: text
        },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }



  export const requestChangeCourse = async ({ id, title, description, tags, url, text, token }) => {
    console.log(title, description, tags, url, text, token, "WRITE  EEWW")
    return axios
      .put(
        `${BASE_URL}courses/change/${id}`,
        {
            title: title,
            description: description,
            tags: tags,
            url: url,
            text: text
        },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }













export const requestCourses = async () => {
    return axios
      .get(
        `${BASE_URL}courses`,
      )
      .then((res) => res.data)
      .catch((error) => {
        errorCreator(error)
      })
  }
  