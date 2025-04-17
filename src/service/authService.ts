

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

import type { UsuarioLogadoDTO } from '../types/auth'

const API_URL = import.meta.env.VITE_API_URL

export const buscarUsuarioLogado = async (): Promise<UsuarioLogadoDTO> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Token não encontrado')

  try {
    const response = await fetch(`${API_URL}/v1/usuario`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
      throw new Error(erro.message || 'Erro ao buscar dados do usuário logado')
    }

    return await response.json()
  } catch (error) {
    throw error instanceof Error ? error : new Error('Erro desconhecido ao buscar usuário logado')
  }
} 

