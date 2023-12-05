<template>
  <div v-if="tableData.length > 0">
    <el-row :gutter="10">
      <el-col :md="12">
        <label>No. of times school was open</label>
        <el-input
          v-model="opened"
          placeholder="Example: 120"
          type="number"
          style="width: 100%"
        />
      </el-col>
      <el-col :md="12">
        <label>Select Term</label>
        <el-select
          v-model="term_id"
          placeholder="Term"
          style="width: 100%"
        >
          <el-option
            v-for="(term, index) in terms"
            :key="index"
            :value="term.value"
            :label="term.label"
          />
        </el-select>
      </el-col>
    </el-row>
    <template v-if="opened !== null">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="450"
      >
        <el-table-column
          label="Student Name"
          width="250"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="Times Opened"
        >
          {{ opened }}
        </el-table-column>
        <el-table-column
          label="Times Present"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.present"
              placeholder="Present"
              filterable
              style="width: 100%"
              @input="recordAttendance($event, scope.row.student_id, scope.row.class_teacher_id)"
            >
              <el-option
                :value="0"
                :label="0"
              />
              <el-option
                v-for="(num, num_index ) in parseInt(opened)"
                :key="num_index"
                :value="num"
                :label="num"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="Times Absent"
        >
          <template slot-scope="scope">
            {{ opened - scope.row.present }}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import Resource from '@/api/resource'

export default {
  props: {
    studentsInClass: {
      type: Array,
      default: () => [],
    },
    currentTermId: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      tableData: [],
      terms: [
        { value: 1, label: 'First Term' },
        { value: 2, label: 'Second Term' },
        { value: 3, label: 'Third Term' },
      ],
      opened: null,
      term_id: null,
    }
  },
  computed: {
    baseServerUrl() {
      return this.$store.getters.baseServerUrl
    },
  },
  mounted() {
    this.term_id = this.currentTermId
    this.setTableData(this.studentsInClass)
  },
  methods: {
    setTableData(studentsInClass) {
      const app = this
      const tableData = []
      studentsInClass.forEach(element => {
        if (element.student !== null) {
          const data = {
            student_id: element.student_id,
            class_teacher_id: element.class_teacher_id,
            name: `${element.student.user.first_name} ${element.student.user.last_name}`,
            photo: element.student.user.photo,
            // behavior
            present: (element.student.attendance_summary !== null)
              ? element.student.attendance_summary.present : 0,
            absent: (element.student.attendance_summary !== null)
              ? element.student.attendance_summary.absent : 0,
          }
          tableData.push(data)
        }
      })
      app.tableData = tableData
    },
    recordAttendance(present, studentId, classTeacherId) {
      const app = this
      const termId = app.term_id
      const { opened } = app
      const absent = opened - present
      const param = {
        term_id: termId, opened, present, absent, class_teacher_id: classTeacherId, student_id: studentId,
      }
      const recordAttendanceResource = new Resource('attendance/save-result-attendance-summary')
      recordAttendanceResource.store(param)
        .then(() => {})
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
