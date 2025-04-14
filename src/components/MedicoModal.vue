<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 class="text-xl font-semibold text-blue-900 mb-4">
                Cadastrar Médico
            </h2>

            <form @submit.prevent="salvar">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input v-model="form.nome" type="text" placeholder="Nome" class="input" required />
                    <input v-model="form.cpf" type="text" placeholder="CPF" class="input" required />
                    <input v-model="form.email" type="email" placeholder="E-mail" class="input" required />
                    <input v-model="form.telefone" type="text" placeholder="Telefone" class="input" required />
                    <input v-model="form.especialidade" type="text" placeholder="Especialidade" class="input"
                        required />
                    <input v-model="form.registro" type="text" placeholder="Registro" class="input" required />
                    <input v-model="form.username" type="text" placeholder="Usuário"
                        class="input" />
                    <input v-model="form.password" type="password" placeholder="Senha"
                        class="input " />
                </div>

                <!-- <div class="mt-4 text-sm text-gray-500">
                    O login será gerado automaticamente com base no nome e CPF. A senha padrão será usada.
                </div> -->

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
import { reactive } from 'vue'
import { salvarMedico } from '../service/medicoService'
import type { MedicoRequestDTO } from '../types/medico'

const emit = defineEmits(['fechar', 'salvo'])

const form = reactive<MedicoRequestDTO>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    especialidade: '',
    registro: '',
    username: '',
    password: ''
})

// const gerarCredenciais = () => {
//     const cpfLimpo = form.cpf.replace(/\D/g, '')
//     form.username = `${form.nome.split(' ')[0].toLowerCase()}.${cpfLimpo}`
//     form.password = 'clinicadmin@123' // senha padrão
// }

const salvar = async () => {
    try {
        // gerarCredenciais()
        await salvarMedico(form)
        emit('salvo')
        emit('fechar')
    } catch (error) {
        alert(error instanceof Error ? error.message : 'Erro ao salvar médico')
    }
}
</script>

<style scoped>
.input {
    @apply w-full px-4 py-2 border border-gray-300 rounded;
}
</style>