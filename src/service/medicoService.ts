import type { MedicoRequestDTO, MedicoResponseDTO } from '../types/medico'

const API_URL = import.meta.env.VITE_API_URL

export const buscarMedicos = async (): Promise<MedicoResponseDTO[]> => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/v1/medico`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) throw new Error('Erro ao buscar médicos')
    return await response.json()
}

export const salvarMedico = async (payload: MedicoRequestDTO): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${API_URL}/v1/medico`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const erro = await response.json().catch(() => ({ message: 'Erro desconhecido ao salvar médico' }))
            throw new Error(erro.message || 'Erro ao salvar médico')
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Erro ao salvar médico')
    }
}

export const buscarMedicosPorEspecialidade = async (especialidade: string): Promise<MedicoResponseDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/v1/medico/especialidade?especialidade=${encodeURIComponent(especialidade)}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!response.ok) {
    const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(erro.message || 'Erro ao buscar médicos')
  }

  return await response.json()
}

export const buscarMedicosPorNome = async (nome: string): Promise<MedicoResponseDTO[]> => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/v1/medico/nome?nome=${encodeURIComponent(nome)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  
    if (!response.ok) {
      const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
      throw new Error(erro.message || 'Erro ao buscar médicos')
    }
  
    return await response.json()
}

export const buscarMedicosPorCpf = async (cpf: string): Promise<MedicoResponseDTO[]> => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/v1/medico/cpf?cpf=${encodeURIComponent(cpf)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  
    if (!response.ok) {
      const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
      throw new Error(erro.message || 'Erro ao buscar médicos')
    }
  
    return await response.json()
}