import { API } from "../_api"

export const getMudaris = async () => {
  const { data } = await API.get("/mudaris")
  return data.data
}

export const createMudaris = async (data) => {
  try {
    const response = await API.post("/mudaris", data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const showMudaris = async (id) => {
  try {
    const { data } = await API.get(`/mudaris/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateMudaris = async (id, data) => {
  try {
    const response = await API.post(`/mudaris/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteMudaris = async (id) => {
  try {
    await API.delete(`/mudaris/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}
