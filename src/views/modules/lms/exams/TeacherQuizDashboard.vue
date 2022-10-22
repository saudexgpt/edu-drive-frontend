<template>
  <b-card v-loading="load">
    <div slot="header">
      <b-row v-if="display_form">
        <b-col
          cols="12"
        >
          <h4>
            Online Examination
          </h4>
        </b-col>
        <b-col
          cols="6"
        >
          <label for="">Select Subject</label>
          <el-select
            v-model="subject_teacher_id"
            style="width: 100%;"
            placeholder="Select Subject"
            filterable
            @input="fetchQuestionBank()"
          >
            <el-option
              v-for="(subjectTeacher, index) in subject_teachers"
              :key="index"
              :label="`${subjectTeacher.subject.name.toUpperCase()} ${subjectTeacher.class_teacher.c_class.name}`"
              :value="subjectTeacher.id"
            />
          </el-select>
        </b-col>
        <b-col
          cols="6"
        >
          <label for="">Select Question Type</label>
          <el-select
            v-model="option.question_type"
            style="width: 100%;"
            placeholder="Select Question Type"
          >
            <el-option
              label="OBJECTIVE QUESTIONS"
              value="objective"
            />
            <!-- <el-option
              label="THEORY QUESTIONS"
              value="theory"
            /> -->
          </el-select>
        </b-col>
      </b-row>
      <hr>
    </div>
    <div v-if="option.question_type=='objective'">
      <obj-questions
        v-if="subject_teacher !== ''"
        :subject-teacher="subject_teacher"
        :option="option"
        @display="displayForm"
        @reload="fetchQuestionBank"
      />
    </div>
    <div v-if="option.question_type=='theory'">
      <theory-questions
        v-if="subject_teacher !== ''"
        :subject-teacher="subject_teacher"
        :option="option"
        @display="displayForm"
        @reload="fetchQuestionBank"
      />
    </div>
  </b-card>
</template>
<script>
import { BCard, BRow, BCol } from 'bootstrap-vue'
import ObjQuestions from './partials/objective/ObjQuestions.vue'
import TheoryQuestions from './partials/theory/TheoryQuestions.vue'
import Resource from '@/api/resource'

export default {
  components: {
    BCard, BRow, BCol, ObjQuestions, TheoryQuestions,
  },
  data() {
    return {
      subject_teachers: [],
      subject_teacher_id: '',
      option: {
        question_type: 'objective',
      },
      load: false,
      subject_teacher: '',
      display_form: true,
    }
  },
  created() {
    this.subjectTeachers()
  },
  methods: {
    subjectTeachers() {
      const app = this
      app.load = true
      const subjectTeacherDashboard = new Resource('lms/subject-teachers')
      subjectTeacherDashboard.list() // back end route from web.php

        .then(response => {
          app.subject_teachers = response.subject_teachers
          app.load = false
        })
    },
    fetchQuestionBank() {
      const app = this
      app.load = true
      const fetchQuestionBankResource = new Resource('lms/fetch-questions-bank')
      fetchQuestionBankResource.get(app.subject_teacher_id) // back end route from web.php

        .then(response => {
          app.subject_teacher = response.subject_teacher
          app.load = false
        })
    },
    displayForm(status) {
      this.display_form = status
    },
  },
}
</script>
