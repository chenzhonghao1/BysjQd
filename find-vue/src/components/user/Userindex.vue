<template>
    <!--
    <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
    -->

  <el-container style="margin-top:20px;">
      <el-aside style="width:900px;">
        <el-card class="box-card-asize" style="margin-left:15px">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="最新招领信息" name="first">
                <div  class="textitem"  v-for="item in itemList">
                  <i class="el-icon-message-solid" ></i>
                  <span class="wpmc" >{{item.wpmc}}</span>
                  <span class="xgms" > {{item.xgms}} </span>
                  <span class="jdsj" style="font-size:10px;color:#888888;position:absolute;right:0px;margin-top:10px;"> {{item.jdsj}} </span>
                  <div style="border-top:1px dashed #cccccc;height: 1px;"></div>
                </div>

                <div  class="textitem1" >
                  <el-link type="success" href="#" :underline="false" style="text-decoration:none;font-size:13px;color:#33CC00;position:absolute;right:0px;">更多（点击了解详情）...</el-link>
                  
                </div>
                <div style="border-top:1px dashed #cccccc;height: 1px;overflow:hidden"></div>
            </el-tab-pane>
            <el-tab-pane label="最新寻物信息" name="second">
                <div  class="textitem"  v-for="item in itemList">
                  <i class="el-icon-message-solid" ></i>
                  <span  class="wpmc" >{{item.wpmc}}</span>
                  <span class="xgms" > {{item.xgms}} </span>
                  <span class="dssj"> {{item.dssj}} </span>
                  <div style="border-top:1px dashed #cccccc;height: 1px;"></div>
                </div>

                <div  class="textitem1" >
                  <el-link type="success" href="#" :underline="false" style="text-decoration:none;font-size:13px;color:#33CC00;position:absolute;right:0px;">更多（点击了解详情）...</el-link>
                </div>
                <div style="border-top:1px dashed #cccccc;height: 1px;overflow:hidden"></div>
            </el-tab-pane>
          </el-tabs>
          
        </el-card>
      </el-aside>
      <el-container>
        <el-header height="300px">
          <el-card class="box-card-header">
            <div slot="header" class="clearfix">
              <span >嘉应学院失物招领系统 公告栏</span>
            </div>
            <div class="gbl">
             Spring MVC+hibe是打不死的教案及rnate框架开发的校园失物招领网站，包括前台页面和后台管理系统
              项多行跨市还会死安华大客户说大家看目描述开发环境是Eclipse none，Mysql5.6数据库，Spring MVC框架，jdk1.7，Tomcat 8.0.27,静态页面是我参照网上设计的，系统功能基本完善，目前还没有发现有需要解决的bug，毕业设计会撒娇哈空间刷卡还是看哈看还是卡是打开连刷的卡很快
            </div>
            <div class="button">
                <el-button type="primary" class="bleft" v-on:click="bleft">公告栏详情</el-button>
                <el-button type="primary" class="bcenter" >捡到东西了</el-button>
                <el-button type="primary" class="bright">丢失东西了</el-button>
            </div>
          </el-card>
        </el-header>
        <el-main>
          <el-card class="box-card-main">
            <div class="mainhead">
                成功案例展示区
            </div>
            <div class="mainpage" style=" position: relative;top: 20px;">
              <div  class="textitem"  v-for="o in 4" :key="o" >
                   {{o}}
                   <div style="border-top:1px dashed #cccccc;"></div>
              </div>
            </div>
            <div class="mainbottom">
            该平台使用至今，累计归还拾物10件，寻回失物10件，平台需要大家的支持且竭诚为大家服务。
            </div>
          </el-card>
        </el-main>
      </el-container>
</el-container>
</template>

<script>
  export default {
    name: 'UserIndex',
    //components: {SideMenu}

    data(){
      return{
        activeName:"first",
        itemList:[]
      }
    },
    mounted:function(){
      this.handleClick(this.tab);//加载页面是需要触发的函数
    },
    methods:{
      handleClick(tab){
        if(typeof tab == "undefined"){
          this.first();
        }else{
        if(tab.name == 'second'){
        	// 触发‘最新寻物信息’事件
        	this.second();
        }else{
        	// 触发‘最新招领信息’事件
        	this.first();
        }
        }
      },
       /**
       * 触发‘最新招领信息’事件
       */
      first(){
      	//console.log('我是最新招领信息');
        this.$axios
            .post('/listms'
            ).then(
              successResponse =>{
                this.itemList = successResponse.data;
              }
            );
      },
      /**
       * 触发‘最新寻物信息’事件
       */
      second(){
      	console.log('我是最新寻物信息');
        this.$axios
            .post('/listswms'
            ).then(
              successResponse =>{
                this.itemList = successResponse.data;
              }
            );
      },
      /**
      * bleft点击事件
      */
      bleft(){
        this.$notify({
          title: '公告栏详情',
          message: 'Spring MVC+hibe是打不死的教案及rnate框架开发的校园失物招领网站，包括前台页面和后台管理系统项多行跨市还会死安华大客户说大家看目描述开发环境是Eclipse none，Mysql5.6数据库，Spring MVC框架，jdk1.7，Tomcat 8.0.27,静态页面是我参照网上设计的，系统功能基本完善，目前还没有发现有需要解决的bug，毕业设计会撒娇哈空间刷卡还是看哈看还是卡是打开连刷的卡很快',
          duration: 0
        });
      }
    }
  }
</script>

<style scoped>
  .box-card-asize {
    height:610px;
  }

  .box-card-header {
    height:290px;
  }

  .box-card-main {
    height:290px;
  }
  
  .textitem{
    height:40px;
  }

  .textitem1{
    height:25px;
  }

  .el-icon-message-solid{
    position:absolute;
    left:0px;
    margin-top:5px;
    color:#888888;
  }

  .wpmc{
    color:#888888;
    position:absolute;
    left:20px;
  }

  .xgms{
    display:inline-block;
    text-align:left;
    color:#888888;
    width:600px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .jdsj{
    font-size:10px;
    color:#888888;
    position:absolute;
    right:0px;
    margin-top:10px;
  }

  .dssj{
    font-size:10px;
    color:#888888;
    position:absolute;
    right:0px;
    margin-top:10px;
  }

  .gbl{
    text-align:left;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    background:#EEEEEE;
    height: 105px;
    border-radius:5px;
    padding:3px;
  }

  .button{
    position:relative; 
    top:30px;
  }

  .bleft{
    position:relative; 
    right:80px;
  }

  .bright{
    position:relative; 
    left:80px;
  }

  .mainhead{
    height:40px;
    background:#409EFF;
    border-radius:5px;
    margin-top:-10px;
    line-height:40px;
  }

  .mainpage{
    background:111111;
    border-radius:5px;
  }

  .mainbottom{
    background:#dddddd;
    height:50px;
    text-align:left;
  }

</style>

