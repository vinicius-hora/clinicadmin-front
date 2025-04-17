<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div class="flex items-center justify-center mb-6 gap-3">
        <div class="bg-green-500 rounded-full p-3">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <div class="text-left leading-tight">
          <div class="text-blue-900 text-xl font-semibold">clinicAdmin</div>
        </div>
      </div>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Login</label>
          <input v-model="email" type="text" placeholder="Login"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Senha</label>
          <input v-model="password" type="password" placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Buscar clínica por</label>
          <div class="flex gap-4 text-sm text-gray-800">
            <label><input type="radio" value="id" v-model="tipoBuscaClinica" /> ID</label>
            <label><input type="radio" value="nome" v-model="tipoBuscaClinica" /> Nome</label>
            <label><input type="radio" value="cnpj" v-model="tipoBuscaClinica" /> CNPJ</label>
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Buscar clínica</label>
          <input
            v-model="valorBuscaClinica"
            @input="buscarClinicas"
            placeholder="Digite para buscar..."
            class="w-full px-4 py-2 border border-gray-300 rounded"
          />

          <ul v-if="clinicas.length > 0" class="mt-2 border rounded shadow bg-white max-h-40 overflow-y-auto">
            <li v-for="clinica in clinicas" :key="clinica.id"
                class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                @click="selecionarClinica(clinica)">
              {{ clinica.nome }} - {{ clinica.cnpj }}
            </li>
          </ul>
        </div>

        <div v-if="clinicaSelecionada">
          <p class="text-sm text-gray-700">Clínica selecionada: <strong>{{ clinicaSelecionada.nome }}</strong></p>
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-blue-600 hover:underline">Esqueceu sua senha?</a>
        </div>
        <button type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginRequestDTO } from '../types/auth'
import { logar, buscarUsuarioLogado } from '../service/authService'
import {
  buscarClinicaPorID,
  buscarClinicaPorNome,
  buscarClinicaPorCNPJ
} from '../service/clinicaService'
import type { ClinicaResponseDTO } from '../types/clinica'

const email = ref('')
const password = ref('')
const clinicaId = ref<number | null>(null)
const router = useRouter()

const tipoBuscaClinica = ref<'id' | 'nome' | 'cnpj'>('id')
const valorBuscaClinica = ref('')
const clinicas = ref<ClinicaResponseDTO[]>([])
const clinicaSelecionada = ref<ClinicaResponseDTO | null>(null)

const buscarClinicas = async () => {
  clinicas.value = []
  clinicaSelecionada.value = null

  if (valorBuscaClinica.value.length < 3 && tipoBuscaClinica.value !== 'id') return

  try {
    if (tipoBuscaClinica.value === 'id') {
      const clinica = await buscarClinicaPorID(Number(valorBuscaClinica.value))
      clinicas.value = [clinica]
    } else if (tipoBuscaClinica.value === 'nome') {
      const clinica = await buscarClinicaPorNome(valorBuscaClinica.value)
      clinicas.value = [clinica]
    } else if (tipoBuscaClinica.value === 'cnpj') {
      const clinica = await buscarClinicaPorCNPJ(valorBuscaClinica.value)
      clinicas.value = [clinica]
    }
  } catch (error) {
    clinicas.value = []
  }
}

const selecionarClinica = (clinica: ClinicaResponseDTO) => {
  clinicaSelecionada.value = clinica
  clinicaId.value = clinica.id
  clinicas.value = []
  valorBuscaClinica.value = clinica.nome
}

const login = async () => {
  if (!clinicaId.value) return alert('Selecione uma clínica válida.')

  const payload: LoginRequestDTO = {
    userName: email.value,
    passWord: password.value,
    clinicaId: clinicaId.value
  }

  try {
    const data = await logar(payload)
    localStorage.setItem('token', data.token)
    const usuario = await buscarUsuarioLogado()
    localStorage.setItem('usuario', JSON.stringify(usuario))

    if (usuario.role === 'MEDICO') {
      router.push('/consultas-medico')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Erro desconhecido.')
  }
}
</script>
