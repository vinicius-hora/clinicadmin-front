import type { ClinicaResponseDTO } from '../types/clinica'

const API_URL = import.meta.env.VITE_API_URL

export const buscarClinicaPorID = async (id: number): Promise<ClinicaResponseDTO> => {
  const response = await fetch(`${API_URL}/v1/clinica/id?id=${id}`)
  if (!response.ok) throw new Error('Erro ao buscar clínica por ID')
  return await response.json()
}

export const buscarClinicaPorNome = async (nome: string): Promise<ClinicaResponseDTO> => {
  const response = await fetch(`${API_URL}/v1/clinica/nome?nome=${encodeURIComponent(nome)}`)
  if (!response.ok) throw new Error('Erro ao buscar clínica por nome')
  return await response.json()
}

export const buscarClinicaPorCNPJ = async (cnpj: string): Promise<ClinicaResponseDTO> => {
  const response = await fetch(`${API_URL}/v1/clinica/cnpj?cnpj=${encodeURIComponent(cnpj)}`)
  if (!response.ok) throw new Error('Erro ao buscar clínica por CNPJ')
  return await response.json()
} 
