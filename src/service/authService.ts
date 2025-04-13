

import type { LoginRequestDTO, LoginResponseDTO } from '../types/auth'
const baseURL = import.meta.env.VITE_API_URL

export const logar = async (payload: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const response = await fetch(`${baseURL}/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Usuário ou senha inválidos.')
  }

  return await response.json()
}
