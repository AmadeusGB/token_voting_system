<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="header1">
      <el-button type="text" style="font-size: 26px;color:aliceblue;" @click="back">&nbsp;&nbsp;基于区块链的通证投票系统</el-button>
      <div classs="header2">
        <el-button type="primary" @click="personalmsg">创建投票<br></el-button>
      </div>
      
    </div>
 
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    async back() {
      this.$router.push({name: 'page1',params:{ id:'1'}});
    },
    async personalmsg() {
      this.$router.push({name: 'create',params:{ id:'1'}});
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.header1{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #4F4F4F;
  color:aliceblue;
  font-size: 28px;
}
.header2{
  justify-content: flex-end;
}
</style>
