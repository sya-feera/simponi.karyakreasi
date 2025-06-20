import { API } from "../_api"

export const getGrades = async () => {
  const { data } = await API.get("/grades")
  return data.data
}

export const createGrade = async (data) => {
  try {
    const response = await API.post("/grades", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const showGrade = async (id) => {
  try {
    const { data } = await API.get(`/grades/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateGrade = async (id, data) => {
  try {
    const response = await API.post(`/grades/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteGrade = async (id) => {
  try {
    await API.delete(`/grades/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
