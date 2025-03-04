const BASE_URL = "http://localhost:5000"

export const aiChat = async (message: any) => {
  try {
    const response = await fetch(BASE_URL + "/ai_chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}
