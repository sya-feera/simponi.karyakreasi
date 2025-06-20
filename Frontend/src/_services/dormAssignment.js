import { API } from "../_api"

export const getDormAssignments = async () => {
  const { data } = await API.get("/dorm_asigments")
  return data.data
}

export const createDormAssignment = async (data) => {
  try {
    const response = await API.post("/dorm_asigments", data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const showDormAssignment = async (id) => {
  try {
    const { data } = await API.get(`/dorm_asigments/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateDormAssignment = async (id, data) => {
  try {
    const response = await API.post(`/dorm_asigments/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteDormAssignment = async (id) => {
  try {
    await API.delete(`/dorm_asigments/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}
