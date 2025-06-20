import { API } from "../_api"

export const getClassroom = async () => {
  const { data } = await API.get("/classrooms")
  return data.data
}

export const createClassroom = async (data) => {
  try {
    const response = await API.post("/classrooms", data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const showClassroom = async (id) => {
  try {
    const { data } = await API.get(`/classrooms/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateClassroom = async (id, data) => {
  try {
    const response = await API.post(`/classrooms/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteClassroom = async (id) => {
  try {
    await API.delete(`/classroom/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}