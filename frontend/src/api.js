import axios from "axios";

const BASE_URL = "http://127.0.0.1:5002/api";

// Lists API calls
export const getAllLists = (token) => {
  console.log("tokenik", token);
  return axios.get(`${BASE_URL}/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createList = (title, token) => {
  console.log("CCCC", title, token);
  return axios.post(
    `${BASE_URL}/lists`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Items API calls
export const getAllItems = (listId, token) => {
  return axios.get(`${BASE_URL}/lists/${listId}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createItem = (listId, title, token) => {
  return axios
    .post(
      `${BASE_URL}/lists/${listId}/items`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      // Ensure the response has the expected structure
      if (response.data && response.data.id) {
        return response.data;
      } else {
        throw new Error("Unexpected response structure from the backend.");
      }
    })
    .catch((error) => {
      console.error("Error creating item:", error);
      throw error;
    });
};
// SubItems API calls
export const getAllSubItems = (listId, itemId, token) => {
  return axios.get(`${BASE_URL}/lists/${listId}/items/${itemId}/subitems`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSubItem = (listId, itemId, title, token) => {
  return axios.post(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// SubSubItems API calls
export const getAllSubSubItems = (listId, itemId, subItemId, token) => {
  return axios.get(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/subsubitems`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createSubSubItem = (listId, itemId, subItemId, title, token) => {
  return axios.post(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/subsubitems`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update visibility for SubItems
export const updateSubItemVisibility = (listId, itemId, is_visible, token) => {
  return axios.put(
    `${BASE_URL}/lists/${listId}/items/${itemId}/visibility`,
    {
      is_visible: is_visible,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateSubSubItemVisibility = (
  listId,
  itemId,
  subItemId,
  is_sub_visible,
  token
) => {
  console.log("lolololol", is_sub_visible, subItemId, token);
  return axios.put(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/visibility`,
    {
      is_sub_visible: is_sub_visible,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update 'is_done' status for Items
export const updateItemDoneStatus = (listId, itemId, new_done, token) => {
  console.log("lolololol", new_done);
  return axios.put(
    `${BASE_URL}/lists/${listId}/items/${itemId}/status`,
    {
      is_done: new_done,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update 'is_sub_done' status for SubItems
export const updateSubItemDoneStatus = (
  listId,
  itemId,
  subItemId,
  is_sub_done,
  token
) => {
  return axios.put(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/status`,
    {
      is_sub_done: is_sub_done,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update 'is_sub_sub_done' status for SubSubItems
export const updateSubSubItemDoneStatus = (
  listId,
  itemId,
  subItemId,
  subSubItemId,
  is_sub_sub_done,
  token
) => {
  return axios.put(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/subsubitems/${subSubItemId}/status`,
    {
      is_sub_sub_done: is_sub_sub_done,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateDeleteList = (listId, token) => {
  return axios.delete(`${BASE_URL}/lists/${listId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDeleteItem = (listId, itemId, token) => {
  return axios.delete(`${BASE_URL}/lists/${listId}/items/${itemId}, `, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDeleteSubItem = (listId, itemId, subItemId, token) => {
  return axios.delete(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}, `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSignupData = (userData) => {
  return axios.post(`${BASE_URL}/signup`, userData);
};

export const getLoginData = (credentials) => {
  return axios.post(`${BASE_URL}/login`, credentials);
};

export const updateDeleteSubSubItem = (
  listId,
  itemId,
  subItemId,
  subSubItemId,
  token
) => {
  return axios.delete(
    `${BASE_URL}/lists/${listId}/items/${itemId}/subitems/${subItemId}/subsubitems/${subSubItemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateContent = async (contentId, updatedContent, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/${contentId}`,
      {
        content: updatedContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data; // Return the updated content or a success message
    } else {
      throw new Error(`Error updating content: ${response.data.error}`);
    }
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
