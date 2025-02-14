export async function fetchUsers(sessionToken: string) {
  const response = await fetch(`http://localhost:5173/authapi/api/Users/fetchUsers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
  })
  const data = await response.json()
  return data
}
