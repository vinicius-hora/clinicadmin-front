import type { PacienteRequestDTO, PacienteResponseDTO } from '../types/paciente'

const API_URL = import.meta.env.VITE_API_URL

export const buscarPacientes = async (): Promise<PacienteResponseDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/v1/paciente`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) throw new Error('Erro ao buscar pacientes')
  return await response.json()
}

export const salvarPaciente = async (payload: PacienteRequestDTO): Promise<void> => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/v1/paciente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const erro = await response.json().catch(() => ({ message: 'Erro desconhecido ao salvar paciente' }))
      throw new Error(erro.message || 'Erro ao salvar paciente')
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('Erro ao salvar paciente')
  }
}

export const atualizarPaciente = async (cpf: string, payload: PacienteRequestDTO): Promise<void> => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/pacientes/${cpf}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const erro = await response.json().catch(() => ({ message: 'Erro desconhecido ao atualizar paciente' }))
      throw new Error(erro.message || 'Erro ao atualizar paciente')
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('Erro ao atualizar paciente')
  }
}

export const buscarPacientesPorNome = async (nome: string): Promise<PacienteResponseDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/v1/paciente/nome?nome=${encodeURIComponent(nome)}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(erro.message || 'Erro ao buscar pacientes por nome')
  }

  return await response.json()
}

export const buscarPacientesPorCpf = async (cpf: string): Promise<PacienteResponseDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/v1/paciente/cpf?cpf=${encodeURIComponent(cpf)}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(erro.message || 'Erro ao buscar pacientes por CPF')
  }

  return await response.json()
}
