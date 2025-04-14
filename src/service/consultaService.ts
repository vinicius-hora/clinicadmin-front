import type { ConsultaRequestDTO, ConsultaResponseDTO } from '../types/consulta'

const API_URL = import.meta.env.VITE_API_URL

export const buscarConsultas = async (): Promise<ConsultaResponseDTO[]> => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/v1/consulta`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) throw new Error('Erro ao buscar consultas')
    return await response.json()
}

export const salvarConsulta = async (payload: ConsultaRequestDTO): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${API_URL}/v1/consulta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
            throw new Error(erro.message || 'Erro ao salvar consulta')
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Erro desconhecido ao salvar consulta')
    }
}

export const atualizarConsulta = async (id: number, payload: ConsultaRequestDTO): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${API_URL}/consultas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const erro = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
            throw new Error(erro.message || 'Erro ao atualizar consulta')
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Erro desconhecido ao atualizar consulta')
    }
}

export const excluirConsultaPorId = async (id: number): Promise<void> => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/v1/consulta/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) throw new Error('Erro ao excluir consulta')
}
