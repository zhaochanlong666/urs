<template>
  <div class="about">
    <el-container>
      <el-header>
        <div class="youbian">
          易米服务后台管理系统
        </div>
        <div id="zuobian">
          <i class="el-icon-setting" @click="exittui">
            <p>退出登录</p>
          </i>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 左边导航 -->
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="black" text-color="white"
              active-text-color="#ffd04b" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航菜单</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="PipePage">
                    <i class="el-icon-menu"></i>
                    服务管理
                  </el-menu-item>
                  <el-menu-item index="ManAge">
                    <i class="el-icon-document"></i>
                    素材管理</el-menu-item>
                  <el-menu-item index="/order">
                    <i class="el-icon-s-operation"></i>
                    订单管理</el-menu-item>
                  <el-menu-item index="LoveYou" @click="aini_00"><i class="el-icon-setting"></i>H5管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>

    <div id="dghjdw_son" v-show="vshjdh">
      <div class="dghjdw" v-if="showOverlay">
        <h4>请输入密钥</h4>
        <div class="fhfjd">
          <el-input v-model="input" placeholder="请输入密钥" clearable />
          <div id="hezibox">
            <el-button id="btn" color="#626aef" @click="dghfgd">登录</el-button>
            <el-button id="btn" color="#626aef" @click="quxiaoww">取消</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import '@/linglei/buttonStyles.css'

export default {

  data() {
    return {
      vshjdh: false,
      input: '',
      exit: true,
      showOverlay: true
    }

  },
  methods: {
    quxiaoww() {
      this.vshjdh = false;

    },
    aini_00() {
      if (sessionStorage.getItem('logon1')) {
        console.log('本地存储中存在值');
      } else {
        this.vshjdh = true;
        console.log('本地存储中不存在值');
      }
    },
    dghfgd() {
      if (this.input === '123') {
        sessionStorage.setItem('logon1', this.input);
        this.vshjdh = false;
        this.$router.push("/LoveYou");
      } else {
        this.$message.error('错了哦，这是一条错误消息');
      }
    },
    exittui() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '返回登录页成功!'
        });
        sessionStorage.clear();
        this.$router.push("/PageLogon");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回登录页'
        });
      });

    }

  },

}





</script>


<style lang="less" scoped>
#hezibox {
  display: flex;
}

#dghjdw_son {
  z-index: 9999;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
}

.dghjdw {
  h4 {
    margin-top: 15px;
    text-align: center;
    margin-bottom: 30px;
    background-color: #f6fdff;
  }



  button {
    margin-left: 80px;
    margin-top: 20px;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  background-color: #f6fdff;
}

.el-header {
  line-height: 60px;
  display: flex;
  flex-direction: row;
  background-color: rgb(67, 67, 67) !important;
}

.youbian {
  width: 15%;
  font-size: 23px;
  font-family: serif;
}

.el-header,
.el-footer {
  background-color: rgb(255, 255, 255);
  color: wheat;

  #zuobian {

    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 85%;
    height: 100%;
    font-size: 25px;
  }

  #zuobian p {
    cursor: pointer;
    display: inline;
    margin-left: 10px;
    font-size: 18px;
  }
}

.el-aside {
  background-color: rgb(67, 67, 67);
  height: 93.9vh;
}

.el-main {
  height: 82.6vh;
  overflow: auto;
  /* 隐藏滚动条 */
  background-color: #f6fdff;
  color: #333;
}

.el-main::-webkit-scrollbar {
  display: none;
}


body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

#dghjdw_son {  
  width: 100vw;  
  height: 100vh;  
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */  
  z-index: 9999; /* 确保遮罩层在最上层 */  
}  

.fhfjd {  
  /* 根据需要设置遮罩层内容的样式 */  
  padding: 20px;  
  background-color: #fff;  
  border-radius: 5px;  
}  
</style>