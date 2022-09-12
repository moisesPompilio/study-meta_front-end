export default [{
        name: 'Metas',
        path: '/metas',
        component: () => import('./metas/Metas.vue')
    },
    {
        name: 'Notations',
        path: '/notations',
        component: () => import('./notations/Notations.vue')
    },
]