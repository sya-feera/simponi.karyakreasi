import { API } from "../_api"

export const getSubject = async () => {
    const { data } = await API.get("/subjects")
    return data.data
  }
  
  export const createSubject = async (data) => {
    try {
      const response = await API.post("/subjects", data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  export const showSubject = async (id) => {
    try {
      const { data } = await API.get(`/subjects/${id}`)
      return data.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  export const updateSubject = async (id, data) => {
    try {
      const response = await API.post(`/subjects/${id}`, data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  export const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }