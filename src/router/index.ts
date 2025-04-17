import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue' // ⬅️ novo layout pai
import Pacientes from '../pages/Pacientes.vue'
import Medicos from '../pages/Medicos.vue'
import Consutas from '../pages/Consultas.vue'
import ConsultasMedico from '../pages/ConsultasMedico.vue'

const routes = [
  { path: '/', component: Login },

  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard, meta: { roles: ['ADMIN', 'FUNCIONARIO'] } },
      { path: 'pacientes', component: Pacientes, meta: { roles: ['ADMIN', 'FUNCIONARIO'] } },
      { path: 'medicos', component: Medicos, meta: { roles: ['ADMIN'] } },
      { path: 'consultas', component: Consutas, meta: { roles: ['ADMIN', 'FUNCIONARIO'] } },
      { path: 'consultas-medico', component: ConsultasMedico, meta: { roles: ['MEDICO'] } } // ⬅️ sem barra no início
    ]
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const usuarioRaw = localStorage.getItem('usuario')
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null

  // Proteção básica para rotas que exigem autenticação
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    return next('/')
  }

  // Verificação de role
  const rolesPermitidas = to.meta?.roles as string[] | undefined
  if (rolesPermitidas && usuario?.role) {
    if (!rolesPermitidas.includes(usuario.role)) {
      // Redirecionamento inteligente por role
      if (usuario.role === 'MEDICO') return next('/consultas-medico')
      return next('/dashboard')
    }
  }

  next()
})
