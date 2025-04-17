<template>
    <div>
        <h2 class="text-2xl font-bold text-blue-900 mb-6">Minhas Consultas</h2>

        <LoadingSpinner v-if="isLoading" />

        <table v-else class="min-w-full bg-white shadow rounded overflow-hidden">
            <thead class="bg-blue-900 text-white">
                <tr>
                    <th class="text-left px-4 py-2">Data</th>
                    <th class="text-left px-4 py-2">Horário</th>
                    <th class="text-left px-4 py-2">Paciente</th>
                    <th class="text-left px-4 py-2">Especialidade</th>
                    <th class="text-left px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="consulta in consultas" :key="consulta.id" class="border-t">
                    <td class="px-4 py-2">{{ consulta.dataConsulta }}</td>
                    <td class="px-4 py-2">{{ consulta.horarioConsulta }}</td>
                    <td class="px-4 py-2">{{ consulta.paciente }}</td>
                    <td class="px-4 py-2">{{ consulta.especialidade }}</td>
                    <td class="px-4 py-2">{{ consulta.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { ConsultaResponseDTO } from '../types/consulta'
import { buscarConsultasDoMedico } from '../service/consultaService'

const consultas = ref<ConsultaResponseDTO[]>([])
const isLoading = ref(false)

const carregarConsultasDoMedico = async () => {
    isLoading.value = true
    try {
        consultas.value = await buscarConsultasDoMedico()
    } catch (error) {
        alert(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
        isLoading.value = false
    }
}

onMounted(carregarConsultasDoMedico)
</script>