import axios from 'axios'

import { BASE_URL } from '../utils/baseUrlUtil'

function errorCreator(error) {
  let errorObject = new Error('Server error')
  errorObject.status = error.response.data
  throw errorObject
}


export const requestDeleteUser = async ({ id, token }) => {
  console.log(id, token)
  return axios
    .delete(
      `${BASE_URL}user/${id}`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}


export const requestaddCompleteUser = async ({ id, title, token }) => {
  console.log(id, token)
  return axios
    .put(
      `${BASE_URL}user/completed/${id}`,
      {
        title: title,
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


export const requestChangeUser = async ({ id, Login, Password, Position, adminlogin, adminpassword, token }) => {

  return axios
    .put(
      `${BASE_URL}user/change/${id}`,
      {
        login: Login,
        password: Password,
        position: Position,
        adminlogin: adminlogin,
        adminpassword: adminpassword,
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






export const requestCodewordPasswordUser = async ({ login, codeword, Password }) => {

  return axios
    .put(
      `${BASE_URL}user/password/codeword`,
      {
        login: login,
        codeword: codeword,
        newpassword: Password,
    },

    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}

export const requestCodewordUser = async ({ id, codeword }) => {

  return axios
    .put(
      `${BASE_URL}user/codeword/${id}`,
      {
        codeword: codeword,
    },

    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}



export const requestCreateUser = async ({ Position, Login, Password, adminlogin, adminpassword, token }) => {
  return axios
    .post(
      `${BASE_URL}register`,
      {
          login: Login,
          password: Password,
          position: Position,
          adminlogin: adminlogin,
          adminpassword: adminpassword,
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

export const requestLoginUser = async ({ Login, Password }) => {
  return axios
    .post(
      `${BASE_URL}authorization`,
      {
          login: Login,
          password: Password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}


export const requestCurrentUser = async ({ token }) => {
  return axios
    .get(
      `${BASE_URL}auth/me`,

      {
        headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}

export const requestCurrentCourses = async ({ position }) => {
  console.log(position, "PODISISI")
  return axios
    .get(
      `${BASE_URL}positions/${position}`,

      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      errorCreator(error)
    })
}


export const requestnewPasswordUser = async ({ login, password, newpassword, token }) => {
  return axios
    .put(
      `${BASE_URL}user/password`,
      {
          login: login,
          password: password,
          newpassword: newpassword,
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