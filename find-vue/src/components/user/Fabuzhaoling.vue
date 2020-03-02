<template>
    <el-card class="boxcard">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="物品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="捡到时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                
            </el-form-item>
            <el-form-item label="捡到地点">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="position:relative;right:130px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属类型">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="position:relative;right:130px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="相关描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="暂存地点">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :file-list="fileList"
                style="margin-bottom:30px;">
                <el-button size="small" type="primary" style="position:relative;right:205px;">上传招领物品照片</el-button>
            </el-upload>
            
            <el-form-item >
                <el-button type="primary" @click="onSubmit" style="position:relative;right:100px;">发帖招领</el-button>
                <el-button type="primary">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>
  .boxcard {
    width:600px;
    position:relative;
    top:10px;
  }
</style>