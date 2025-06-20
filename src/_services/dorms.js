import { API } from "../_api"

export const getDorms = async () => {
  const { data } = await API.get("/dorms")
  return data.data
}

export const createDorm = async (data) => {
  try {
    const response = await API.post("/dorms", data, {
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

export const showDorm = async (id) => {
  try {
    const { data } = await API.get(`/dorms/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateDorm = async (id, data) => {
  try {
    const response = await API.post(`/dorms/${id}`, data, {
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

export const deleteDorm = async (id) => {
  try {
    await API.delete(`/dorms/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
