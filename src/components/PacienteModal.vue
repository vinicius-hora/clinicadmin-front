<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
      <h2 class="text-xl font-semibold text-blue-900 mb-4">
        {{ modo === 'novo' ? 'Cadastrar Paciente' : 'Editar Paciente' }}
      </h2>

      <form @submit.prevent="salvar">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="form.nome" type="text" placeholder="Nome" class="input" required />
          <input v-model="form.cpf" type="text" placeholder="CPF" class="input" required
            :disabled="modo === 'editar'" />
          <input v-model="form.email" type="email" placeholder="E-mail" class="input" required />
          <input v-model="form.telefonePrimario" type="text" placeholder="Telefone 1" class="input" required />
          <input v-model="form.telefoneSecundario" type="text" placeholder="Telefone 2" class="input" />
          <input v-model="form.cep" type="text" placeholder="CEP" class="input" required />
          <input v-model="form.logradouro" type="text" placeholder="Logradouro" class="input" required />
          <input v-model="form.numero" type="text" placeholder="Número" class="input" required />
          <input v-model="form.complemento" type="text" placeholder="Complemento" class="input" />
          <input v-model="form.bairro" type="text" placeholder="Bairro" class="input" required />
          <input v-model="form.cidade" type="text" placeholder="Cidade" class="input" required />
          <input v-model="form.estado" type="text" placeholder="Estado" class="input" required />
        </div>

        <div class="flex justify-end mt-6 gap-4">
          <button type="button" class="text-sm text-gray-600 hover:underline" @click="$emit('fechar')">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import type { PacienteRequestDTO, PacienteResponseDTO } from '../types/paciente'
import { salvarPaciente, atualizarPaciente } from '../service/pacienteService'

const props = defineProps<{
  modo: 'novo' | 'editar'
  paciente: PacienteResponseDTO | null
}>()

const emit = defineEmits(['fechar', 'salvo'])

const form = reactive<PacienteRequestDTO>({
  nome: '',
  cpf: '',
  email: '',
  telefonePrimario: '',
  telefoneSecundario: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: ''
})

watch(
  () => props.paciente,
  (paciente) => {
    if (paciente && props.modo === 'editar') {
      Object.assign(form, paciente)
    } else {
      Object.keys(form).forEach((k) => (form[k as keyof PacienteRequestDTO] = ''))
    }
  },
  { immediate: true }
)

const salvar = async () => {
  try {
    if (props.modo === 'novo') {
      await salvarPaciente(form)
    } else if (props.paciente) {
      await atualizarPaciente(props.paciente.cpf, form)
    }
    emit('fechar')
    emit('salvo')
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Erro desconhecido')
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded;
}
</style>