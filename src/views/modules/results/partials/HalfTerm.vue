<template>
  <div class="demo-wrap">
    <!-- <div
      v-if="fetchData.result_settings.display_logo_for_result_background==='yes'"
    >

      <img
        v-if="fetchData.result_settings.logo !== null"
        align="center"
        class="demo-bg"
        :src="baseServerUrl +'storage/'+fetchData.result_settings.logo"
        alt=""
      >
      <img
        v-else
        align="center"
        class="demo-bg"
        :src="baseServerUrl +'storage/'+school.logo"
        alt=""
      >
    </div> -->
    <div class="demo-content table-responsive">

      <el-row :gutter="10">
        <el-col :span="19">
          <div
            v-if="publishedResults.length > 0"
          >

            <table
              class="resultTable table-bordered"
            >
              <thead>
                <tr>
                  <th>
                    SUBJECTS
                  </th>
                  <th>
                    Score
                  </th>
                  <th v-if="fetchData.result_settings.display_grade === 'yes'">
                    <span>GRADE</span>
                  </th>
                  <th v-if="fetchData.result_settings.display_highest_score === 'yes'">
                    <span>HIGHEST</span>
                  </th>
                  <th v-if="fetchData.result_settings.display_lowest_score === 'yes'">
                    <span>LOWEST</span>
                  </th>
                  <th v-if="fetchData.result_settings.display_student_subject_average === 'yes'">
                    <span>AVERAGE</span>
                  </th>
                  <th v-if="fetchData.result_settings.display_student_subject_position === 'yes'">
                    <span>POSITION</span>
                  </th>
                  <th>
                    <div>
                      REMARKS
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(student_result, index) in publishedResults"
                  :key="index"
                >
                  <template v-if="student_result.total">
                    <td>{{ student_result.subject_teacher.subject.name }}</td>
                    <td><strong>{{ student_result.total }}</strong></td>
                    <td>
                      {{ student_result.result_grade }}
                    </td>
                    <!-- <td
                v-if="fetchData.result_settings.display_grade === 'yes'"
                :style="'background:'+student_result.color+'; color: #000;'"
              >
                {{ student_result.result_grade }}
              </td> -->
                    <td v-if="fetchData.result_settings.display_highest_score === 'yes'">
                      {{ (student_result.total) ? student_result.subject_highest_score : '' }}
                    </td>
                    <td v-if="fetchData.result_settings.display_lowest_score === 'yes'">
                      {{ (student_result.total) ? student_result.subject_lowest_score : '' }}
                    </td>
                    <td v-if="fetchData.result_settings.display_student_subject_average === 'yes'">
                      {{ (student_result.total) ? student_result.subject_class_average : '' }}
                    </td>
                    <td v-if="fetchData.result_settings.display_student_subject_position === 'yes'">
                      {{ (student_result.total) ? student_result.position : '' }}
                    </td>
                    <td>{{ (student_result.remark != 'Undefined') ? student_result.remark : '' }}</td>
                  <!--<td>{{student_result.comments}}</td>-->
                  </template>
                </tr>
                <tr>
                  <td
                    rowspan="2"
                    colspan="2"
                  >
                    <strong>Average Performance</strong>
                  </td>
                  <td colspan="2">
                    <strong>Learner Average</strong>
                  </td>
                  <td colspan="2">
                    <strong>Learner GPA</strong>
                  </td>
                  <td colspan="2">
                    <strong>Class Average</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    {{ fetchData.student_average }}
                  </td>
                  <td colspan="2">
                    {{ calculateGPA(fetchData.student_average) }}
                  </td>
                  <td colspan="2">
                    {{ fetchData.class_average }}
                  </td>
                </tr>
                <tr v-if="fetchData.student_remark.house_parent_remark !== null && fetchData.student_remark.house_parent_remark !== ''">
                  <td>House Parent's Remark:</td>
                  <td colspan="7">
                    <div>
                      {{ fetchData.student_remark.house_parent_remark }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Class Teacher's Remark:</td>
                  <td colspan="6">
                    <div v-if="fetchData.student_remark">
                      {{ fetchData.student_remark.class_teacher_remark }}
                    </div>
                  </td>
                  <td rowspan="2">
                    <img
                      :src="baseServerUrl +'storage/'+fetchData.result_settings.head_teacher_stamp"
                      alt="HEAD TEACHER STAMP"
                      class="img-polaroid"
                      width="150"
                    >
                  </td>
                </tr>
                <tr>
                  <td>Principal's Comment:</td>
                  <td colspan="6">
                    <div v-if="fetchData.student_remark">
                      {{ fetchData.student_remark.head_teacher_remark }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-col>
        <el-col
          v-if="fetchData.result_settings.display_grade === 'yes'"
          :span="5"
        >
          <div class="">
            <table
              class="table-bordered keyTable"
              border="1"
              cell-padding="2"
            >
              <thead>
                <tr>
                  <td colspan="4">
                    Grade Key
                  </td>
                </tr>
                <tr>
                  <td>Grade</td>
                  <td>Description</td>
                  <td>Range(%)</td>
                  <td>Point</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(grade, index) in fetchData.grades"
                  :key="index"
                >
                  <td>{{ grade.grade }}</td>
                  <td>{{ grade.interpretation }}</td>
                  <td>{{ grade.lower_limit + '-' + grade.upper_limit }}</td>
                  <td>{{ grade.grade_point }}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </el-col>

      <!-- <el-col
        :md="12"
        :sm="12"
        :xs="12"
      >
        <div class="table-responsive">
          <table class="table table-bordered keyTable">
            <thead>
              <tr role="row">
                <th>
                  SKILLS
                </th>

                <th colspan="5">
                  RATINGS
                </th>

              </tr>
              <tr>
                <th />
                <th
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  {{ index }}
                </th>

              </tr>
            </thead>
            <tbody>

              <tr>
                <td>Leadership</td>

                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.leadership == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>
              <tr>
                <td>Initiative</td>
                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.initiative == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>
              <tr>
                <td>Art Works</td>
                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.art_works == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>
              <tr>
                <td>Spoken English</td>
                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.spoken_english == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>
              <tr>
                <td>Sports</td>
                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.sports == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>
              <tr>
                <td>Handling of Tools</td>
                <td
                  v-for="(rating, index) in fetchData.ratings"
                  :key="index"
                >
                  <span v-if="fetchData.skill && fetchData.skill.tools_handling == index">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span v-else />
                </td>

              </tr>

            </tbody>
          </table>
        </div>
      </el-col> -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    publishedResults: {
      type: Array,
      default: () => ([]),
    },
    fetchData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    baseServerUrl() {
      return this.$store.getters.baseServerUrl
    },
    school() {
      return this.$store.getters.userData.school
    },
  },
  methods: {
    calculateGPA(score) {
      const { grades } = this.fetchData
      let gpa = 0
      grades.forEach(grade => {
        if (score <= grade.upper_limit && score >= grade.lower_limit) {
          gpa = grade.grade_point
        }
      })
      return gpa
    },
  },
}
</script>
<style scoped>
.table th, [dir] .table td {
  padding: 0.5rem 0.5rem;
  color: #000;
}
.keyTable th, .keyTable td{
  padding: 2px !important;
  font-size: 10px;
}
</style>
