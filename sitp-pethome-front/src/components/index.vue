<template>
  <div @click="clicked">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="mouser" @click="goUrl('/')">
          <i class="el-icon-s-home"></i>首页
        </span>
        <span class="mouser" @click="goUrl('/shpping/shopcar')">
          <i class="el-icon-shopping-cart-full"></i>购物车
        </span>
        <span class="mouser" @click="goUrl('/shpping/favorites')">
          <i class="el-icon-collection"></i>收藏夹
        </span>
        <i v-if="num==0" class="el-icon-message-solid menu-icon"></i>
        <el-dropdown @command="goUrl">
          <span class="mouser">{{$store.getters.getUser.user_name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/user/index">个人中心</el-dropdown-item>
            <el-dropdown-item command="/login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container :style="conHeight">
        <el-scrollbar class="scroll">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
              style="text-align:left"
              :default-active="$route.path"
              :unique-opened="true"
              router
            >
              <NavMenu :navlist="menuList"></NavMenu>
            </el-menu>
          </el-aside>
        </el-scrollbar>

        <el-scrollbar style="height:100%;width:100%;">
          <el-main style="height:100%;width:100%;">
            <router-view></router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@common/NavMenu";
import Menulist from "@assets/munelist.js";
import { mapMutations } from "vuex";
export default {
  name: "app",
  components: {
    NavMenu
  },
  data() {
    return {
      menuList: Menulist.navlist,
      conHeight: {
        height: "",
        border: "1px solid #eee"
      },
      num: 0,
      list: [],
      timer: "",
      lastTime: new Date().getTime(), // 最后一次点击的时间
      outTime: 2 * 60 * 60 * 1000 //超时时间2h
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getUnRead();
    this.initWebSocket();
  },
  mounted() {
    //每隔十分钟判断一次有无操作
    this.timer = setInterval(this.tTime, 1000*60*10);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapMutations(["delToken"]),
    getUnRead() {
      this.axios
        .get("/api/index/getunread", {
          params: {
            username: this.$store.state.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var message = res.data;
            this.num = message.total;
            this.list = message.message;
          }
        });
    },
    goRead(row) {
      let refobs = [];
      if (row.investid) {
        refobs = [
          {
            investid: row.investid
          }
        ];
      }
      if (row.careid) {
        refobs = [
          {
            careid: row.careid
          }
        ];
      }
      if (row.videoid) {
        refobs = [
          {
            videoid: row.videoid
          }
        ];
      }
      this.read(refobs);
    },
    goAllRead() {
      let refobs = [];
      for (let i in this.list) {
        if (this.list[i].investid) {
          refobs.push({
            investid: this.list[i].investid
          });
        }
        if (this.list[i].careid) {
          refobs.push({
            careid: this.list[i].careid
          });
        }
        if (this.list[i].videoid) {
          refobs.push({
            videoid: this.list[i].videoid
          });
        }
      }
      this.read(refobs);
    },
    read(refobs) {
      this.axios
        .put("/api/index/read", {
          refobs
        })
        .then(res => {
          if (res.data.success) {
            this.getUnRead();
          }
        });
    },
    goUrl(url) {
      if (url == "/login") {
        this.delToken();
      }
      this.$router.push(url);
    },
    getHeight() {
      this.conHeight.height = window.innerHeight - 60 + "px";
    },
    initWebSocket() {
      let _this = this; //判断页面有没有存在websocket连接
      let params = { userId: this.$store.state.username };
      if (window.WebSocket) {
        // 192.168.80.1是我本地IP地址 此处的 :8182 端口号 要与后端配置的一致
        let ws = new WebSocket("ws://192.168.80.1:8182");
        _this.ws = ws;
        ws.onopen = function(e) {
          _this.ws.send(JSON.stringify(params));
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭");
        };
        ws.onerror = function() {
          console.log("服务器连接出错");
        };
      }
    },
    clicked() {
      this.lastTime = new Date().getTime(); //当界面被点击更新点击时间
    },
    tTime() {
      let nowTime = new Date().getTime();
      if (nowTime - this.lastTime > this.outTime) {
        clearInterval(this.timer);
        this.delToken();
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: rgba(163, 206, 236, 0.808);
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.mouser {
  cursor: pointer;
  margin-right: 10px;
}
.scroll {
  height: 100%;
  width: 220px;
}
.menu-icon {
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
}
.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-scrollbar >>> .el-scrollbar__view {
  height: 100% !important;
}
</style>
