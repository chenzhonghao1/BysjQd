<template>
    <div>
    <el-card class="boxcard">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="物品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="丢失时间" prop="date">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择丢失时间" v-model="form.date" style="width: 100%;"></el-date-picker>
                </el-col>
                
            </el-form-item>
            <el-form-item label="丢失地点" prop="dsddregion">
                <el-select v-model="form.dsddregion"  placeholder="请选择丢失地点" style="position:relative;right:130px;" >
                    <el-option
                    v-for="item in DsddList"
                    :key="item.id"
                    :label="item.dd"
                    :value="item.dd">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属类型" prop="sslxregion">
                <el-select v-model="form.sslxregion" placeholder="请选择所属类型" style="position:relative;right:130px;">
                    <el-option
                    v-for="item in SslxList"
                    :key="item.id"
                    :label="item.sslx"
                    :value="item.sslx">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="相关描述" prop="xgms">
                <el-input type="textarea" v-model="form.xgms"></el-input>
            </el-form-item>
            <el-upload
                ref="upload"
                :headers="headerObj"
                action="http://localhost:8888/api/uploadfile"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                list-type="picture"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                style="margin-bottom:30px;"
                >
                <el-button size="small" type="primary" style="position:relative;right:205px;">上传丢失物品照片</el-button>
            </el-upload>
            
            <el-form-item >
                <el-button type="primary" @click="onSubmit" style="position:relative;right:100px;">发帖寻找</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!--图片预览-->
        <el-dialog
        title="图片预览"
        :visible.sync="previewVisible"
        width="50%"
        :modal-append-to-body="false"
        >
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        //丢失地点列表数据
        DsddList:[],
        //物品所属类型列表数据
        SslxList:[],
        //预览图片路径
        previewPath:'',
        //隐藏预览对话框
        previewVisible:false,
        //图片数组元素拼接以逗号隔开
        tpdz:'',
        headerObj:{
          token:
          window.localStorage.getItem('Authorization')
        },
        form: {
          name: '',
          date: '',
          dsddregion: '',
          sslxregion: '',
          xgms: '',
          //图片数组
          pics:[]
        },
        rules:{
          name: [
            { required: true, message: '请输入物品名称', trigger: 'blur' }
          ],
          dsddregion: [
            { required: true, message: '请选择丢失地点', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择丢失时间', trigger: 'change' }
          ],
          sslxregion: [
            { required: true, message: '请选择所属类型', trigger: 'change' }
          ],
          xgms: [
            { required: true, message: '请进行相关描述', trigger: 'change' }
          ]
        }
      };
    },
    created(){
        this.getDsddList();
        this.getSslxList()
    },
    methods: {
      
      //处理删除事件
      handleRemove(file) {
        const filePath = file.response.msg;
        const i=this.form.pics.findIndex(x=>
        x.pic === filePath)
        this.form.pics.splice(i,1)
      },
      //处理预览事件
      handlePreview(file) {
        this.previewPath = file.response.msg       
        console.log(this.previewPath)
        this.previewVisible = true
      },
      //上传成功时触发事件
      handleSuccess(response){
        const picInfo = {
            pic: response.msg
        }
        this.form.pics.push(picInfo);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
        //获取丢失地点列表
        getDsddList(){
            this.$axios
            .post('/listdd')
            .then(successResponse => {
                   if(successResponse.data){
                       this.DsddList=successResponse.data;
                   }
                   else{
                       this.$message('获取丢失地点列表失败');
                   }
                }
            )
        },
        //获取所属类型列表
        getSslxList(){
            this.$axios
            .post('/listwpsslx')
            .then(successResponse => {
                   if(successResponse.data){
                       this.SslxList=successResponse.data;
                   }
                   else{
                       this.$message('获取所属类型列表失败');
                   }
                }
            )
        },
      onSubmit(form) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            //将图片数组元素拼接以逗号隔开
            this.form.pics.forEach((item,i) => {
                if(this.tpdz=='')
                  this.tpdz = item.pic
                else{
                  this.tpdz = this.tpdz+','+ item.pic
                }
            })
            
            this.$axios
          .post('/addsw', {
            wpmc: this.form.name,
            dssj: this.form.date,
            dsdd: this.form.dsddregion,
            sslx: this.form.sslxregion,
            xgms: this.form.xgms,
            tpdz: this.tpdz
          })
          .then(successResponse => {
            if (successResponse.data === 1) {
              this.$message('发帖成功');
              this.$refs.form.resetFields();
              this.$refs.upload.clearFiles();
              this.form.pics=[]
              this.tpdz=''
            }else {
              this.$message('发帖失败，请联系管理员');
              this.$refs.form.resetFields();
            }
        });
          }
        });
      },
      
      resetForm(formName) {
        this.$refs.form.resetFields();
        this.$refs.upload.clearFiles();
        this.form.pics=[]
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
  .previewImg{
    width:100%
  }
</style>