import { API } from "../_api"

export const getSantri = async () => {
  const { data } = await API.get("/santri"); // ✅ ubah ke endpoint publik
  return data.data;
};

export const createSantri = async (data) => {
  try {
    const response = await API.post("/santri", data, {
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

export const showSantri = async (id) => {
  try {
    const { data } = await API.get(`/santri/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateSantri = async (id, data) => {
  try {
    const response = await API.post(`/santri/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteSantri = async (id) => {
  try {
    await API.delete(`/santri/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

// ✅ Untuk halaman Register (public, tanpa token)
export const getSantriList = async () => {
  const { data } = await API.get("/santrilist");
  return data.data;
};