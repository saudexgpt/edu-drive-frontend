export default [
  // {
  //   path: '/dashboard/analytics',
  //   name: 'dashboard-analytics',
  //   component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  //   meta: {
  //     resource: 'Dashboard',
  //     action: 'read',
  //   },
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardMain.vue'),
  },
]
