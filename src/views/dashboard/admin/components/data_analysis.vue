<template>
  <div v-if="statistics.length > 0">
    <el-row
      :gutter="8"
    >
      <el-col
        v-for="(item, index) in statistics"
        :key="index"
        :xs="12"
        :sm="8"
        :md="8"
        :lg="4"
        :xl="2"
      >
        <statistic-card-horizontal
          color="white"
          :bg="item.color"
          :icon="item.icon"
          :statistic="item.statistic"
          :statistic-title="item.title"
          :custom-style="'border-radius: 1rem'"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { } from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

export default {
  components: {
    StatisticCardHorizontal,
  },
  props: {
    dashboardData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      statistics: [],
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      const app = this
      const data = [
        {
          color: 'primary', icon: 'UserPlusIcon', statistic: app.dashboardData.active_students, title: 'Active Students',
        },
        {
          color: 'warning', icon: 'UserMinusIcon', statistic: app.dashboardData.suspended_students, title: 'Suspended Students',
        },
        {
          color: 'success', icon: 'UserCheckIcon', statistic: app.dashboardData.alumni, title: 'Graduated Students',
        },
        {
          color: 'danger', icon: 'UserXIcon', statistic: app.dashboardData.withdrawn_students, title: 'Withdrawn Students',
        },
        {
          color: 'secondary', icon: 'UsersIcon', statistic: app.dashboardData.totalStaff, title: 'Active Personnel',
        },
        {
          color: 'dark', icon: 'UsersIcon', statistic: app.dashboardData.totalGuardian, title: 'Total Guardians',
        },
      ]
      app.statistics = data
    },
  },
}
</script>
