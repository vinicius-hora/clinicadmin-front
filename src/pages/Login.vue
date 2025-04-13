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
          <input v-model="email" type="string" placeholder="Login"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Senha</label>
          <input v-model="password" type="password" placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ID da Clínica</label>
          <input v-model.number="clinicaId" type="number" placeholder="ID da clínica"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
import { logar } from '../service/authService'

const email = ref('')
const password = ref('')
const clinicaId = ref(1)
const router = useRouter()

const login = async () => {
  const payload: LoginRequestDTO = {
    userName: email.value,
    passWord: password.value,
    clinicaId: clinicaId.value
  }

  try {
    const data = await logar(payload)
    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Erro desconhecido.')
  }
}
</script>
