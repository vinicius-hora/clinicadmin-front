import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue' // ⬅️ novo layout pai
import Pacientes from '../pages/Pacientes.vue'

const routes = [
  // Rota pública
  { path: '/', component: Login },

  // Rotas protegidas com layout
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      // outras páginas:
      { path: 'pacientes', component: Pacientes },
      // { path: 'medicos', component: Medicos }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
