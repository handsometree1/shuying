<template>
  <div class="CourseDetail">
    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
      </el-header>
      <el-aside width="200px">
        <el-image
          style="width: 100px; height: 100px"
          :src="this.$route.query.courseImageUrl"
          :fit="cover"
        ></el-image>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程编号">
            <el-input v-model="form.courseId" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="课程年份">
            <el-input v-model="form.courseYear" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="课程周数">
            <el-input v-model="form.courseWeek" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入教师名称"
          v-model="value"
          :titles="['可选择教师', '已绑定教师']"
          :data="data1"
        ></el-transfer>
        <template>
           <el-button type="primary" @click="changeState">确定</el-button>
        </template>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    /*   const generateData = _ => {
      const data1 = [];
      for (let i = 1; i <= 15; i++) {
        data1.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data1;
    };*/
    return {
      data1: [],
      value: [],
      form: {
        courseName: this.$route.query.courseName,
        courseYear: this.$route.query.courseYear,
        courseWeek: this.$route.query.courseWeek,
        courseId:this.$route.query.courseId
      }
    };
  },
  created() {
    console.log(this.$route.query.id);
    var _this = this;
    this.$ajax
      .get(
        "http://106.12.17.163:5560/getAllAvailableTeacher?courseId=" +
          _this.form.courseId
      )
      .then(
        function(res) {
          var result = res;
          console.log(res.data);
          console.log(res.data[1].id);
          if (res.data != null) {
           console.log(_this.form.courseId);
            console.log("成功获取教师数据");
            console.log(res.data[0].assignId);
            //_this.$router.push({path:'/MainPage'});
            //_this.data.tableData=res.data;
            //_this.total = res.data.length;
            //_this.tableData = res.data;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].assignId == null||res.data[i].assignId==0) {
                _this.data1.push({
                  key: res.data[i].id,
                  label: res.data[i].userName,
                  disabled: false
                });
              } else if (res.data[i].assignId != null && res.data[i].assignId!=0) {
                console.log("来到这里")
                _this.data1.push({
                  key: res.data[i].id,
                  label: res.data[i].userName,
                  disabled: false
                });
                _this.value.push(res.data[i].id);
              }
            }
          }
        },
        function(res) {
          var result = res;
          console.log("error:" + res);
        }
      );
  },
  methods: {
    changeState(){
      var _this=this;
      console.log(_this.value.toString());
      var valueStr=_this.value.toString()
      if(valueStr==null||valueStr==""){
        console.log("valuestr为空")
        valueStr="0"
      }
    this.$ajax
      .get(
        "http://106.12.17.163:5560/ChangeCourseAssign?teacherId=" +
          valueStr+"&courseId="+_this.form.courseId
      )
      .then(
        function(res) {
          var result = res;
          console.log(res.data);
        },
        function(res) {
          var result = res;
          console.log("error:" + res);
        }
      );
    },
    showValue() {
      console.log(this.value);
      console.log(this.data1);
    },
    goBack() {
      console.log("go back");
      window.history.back();
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style>
.el-transfer-panel__item.el-checkbox .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* display: block; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 24px;
    line-height: 30px;
}
</style>

