<template>
  <div>

    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column fixed label="序号" type="index" width="50"></el-table-column>

      <el-table-column prop="number" label="投票编号" width="150"></el-table-column>
      <el-table-column prop="topic" label="投票主题" width="250"></el-table-column>
      <el-table-column prop="start_time" label="投票发起时间" width="200"></el-table-column>
      <el-table-column prop="end_time" label="投票结束时间" width="200"></el-table-column>
      <el-table-column prop="state" label="投票状态" width="120"></el-table-column>
      <el-table-column prop="resultmsg" label="投票结果" width="180"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope='scope'>
          <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import Demo from "@/js/demo";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created: async function() {
    await Demo.init_user();
    
    var temp = await Demo.backvoting();
    var result = "[";
    var num = temp.length;
    var str;
    var stick = new Array();

    for (var i = 0; i < num; i++) {
      var tmp = await Demo.displayinfo(temp[i].c[0], 11);

      str =
        '{"number":"'   + temp[i].c[0]            +
        '","topic":"'   +
        (await Demo.displayinfo(temp[i].c[0], 1)) +
        '","start_time":"'    +
        (await Demo.displayinfo(temp[i].c[0], 2)) +
        '","end_time":"'      +
        (await Demo.displayinfo(temp[i].c[0], 3)) +
        '","state":"'         +
        (await Demo.displayinfo(temp[i].c[0], 4)) +
        '","resultmsg":"'     +
        (await Demo.displayinfo(temp[i].c[0], 5)) +
        '"}';

      result = result + str;
      if (i < num-1) result = result + ",";
    }

    result = result + "]";

    this.tableData = JSON.parse(result);
  },
  methods: {
    async createvaluation() {
      this.$router.push({name: 'create1',params:{ id:'1'}});
    },
    async detail(row) {
      //console.log(row.address);
      this.$router.push({name: 'detail',params:{ userid:row.number}});
    }
  }
};
</script>

<style lang="scss" scoped>
#signup {
  text-align: left;

  .form {
    display: flex;
    flex-direction: column;
    margin: auto;

    .entry {
      display: flex;
      flex-direction: row-reverse;
      justify-content: left;

      label {
        margin-right: 20px;
      }

      button {
        margin-left: 20px;
      }
    }
  }
}
</style>
