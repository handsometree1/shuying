<template>
  <div class="Course">
    <el-container>
      <el-header style="height:150px">
        <meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" />
        <el-form
          ref="importList"
          label-position="left"
          label-width="100px"
          style="width:70%;margin-left:50px;"
        >
          <el-form-item label="上传文件以添加课程：" prop="file">
            <el-upload
              class="upload-demo"
              ref="upload"
              action
              accept=".xls, .xlsx"
              :http-request="httpRequest"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="fileChange"
              :on-success="upFile"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
              :with-credentials="true"
            >
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <el-button style="margin-left: 10px;" type="success" @click="submitUploadList">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table ref="multipleTable"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      >
          <el-table-column fixed prop="courseId" label="编号" width="50"></el-table-column>
          <el-table-column prop="courseName" label="课程名称" width="120"></el-table-column>
          <el-table-column prop="courseYear" label="学年" width="120"></el-table-column>
          <el-table-column prop="courseWeek" label="课程周数" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="toCourseDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
      <el-pagination class="footer"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Course",
  methods: {
      toCourseDetail(row) {
            this.$router.push({path: '/CourseDetail',query:{courseId:row.courseId,courseName:row.courseName,courseYear:row.courseYear,courseWeek:row.courseWeek,courseImageUrl:row.courseImageUrl}});
        },
    handleClick(row) {
      console.log(row);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
     upFile(){
       console.log("upload success!!!")
     },
    fileChange(file, fileList) {
      // console.log(file.raw)
      this.dataList = fileList;
    },
    openIdFormat(row, column){
     if(row.openId  !=null){
       return row.openId;
     }else if(row.openId ==null)
     {
       return "尚未绑定"
     }else{return "数据异常"}
    },
    bindtimeFormat(row, column) {
      //console.log(row.create_time);
      if (row.bind_time != null) {
        var date = new Date(row.bind_time);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
          ":";
        var m =
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      } else {
        return "尚未绑定";
      }
    },
    createtimeFormat(row, column) {
      //console.log(row.create_time);
      if (row.create_time != null) {
        var date = new Date(row.create_time);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
          ":";
        var m =
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      } else {
        return "数据异常";
      }
    },
submitUploadList(){this.$refs.upload.submit();},
   current_change:function(currentPage){
        this.currentPage = currentPage;
        console.log(currentPage);
      },
    httpRequest(param) {
      console.log(param);
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("file", fileObj); // 文件对象
      //fd.append("platNum", this.importList.platNum);
      //fd.append("taskName", this.importList.taskName);

      let url = "http://106.12.17.163:5560/addCourseByExcel";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$ajax.post(url, fd, config).then(res => {
        if (res.code === 0) {
          this.submitForm(); //提交表单
        }
      });
    }
    /* uploadSectionFile(params) {
      :http-request="uploadSectionFile"
          const file = params.file,
            fileType = file.type,
            isImage = fileType.indexOf("image") != -1,
            isLt2M = file.size / 1024 / 1024 < 2;
           这里常规检验，看项目需求而定
          if (!isImage) {
            this.$message.error("只能上传图片格式png、jpg、gif!");
            return;
          }
          if (!isLt2M) {
            this.$message.error("只能上传图片大小小于2M");
            return;
          }
          // 根据后台需求数据格式
          const form = new FormData();
          // 文件对象
          form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
          form.append("clientType", 'xxx');
          // 项目封装的请求方法，下面做简单介绍
          imageUpload(form)
            .then(res => {
             //自行处理各种情况
              const code = res && parseInt(res.code, 10);
              if (code === 200) {
                // xxx
              } else {
                // xxx
              }
            })
            .catch(() => {
              // xxx
            });
    } */
  },
  data() {
    return {
      tableData: null,
      fileList: [],
        multipleSelection: [],
        total: 0,
        pagesize:10,
        currentPage:1
    };
  },
  created: function() {
    // `this` 指向 vm 实例
    console.log("执行created函数");
    var _this = this;
    this.$ajax.get("http://106.12.17.163:5560/getAllCourse").then(
      function(res) {
        var result = res;
        console.log(res.data);
        if (res.data != null) {
          console.log("成功获取课程数据");
          //_this.$router.push({path:'/MainPage'});
          //_this.data.tableData=res.data;
          _this.total= res.data.length;
          _this.tableData = res.data;
        }
      },
      function(res) {
        var result = res;
        console.log("error:" + res);
      }
    );
  }
};
</script>
<style scoped>
</style>