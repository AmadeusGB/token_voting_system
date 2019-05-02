<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" size="medium">
      <el-form-item style="width:450px;" label="投票主题：">
        <el-input v-model="form.Topic"></el-input>
      </el-form-item>

      <el-form-item style="float:left; width:400px;" label="创建选项1：">
        <el-input v-model="form.Choose1"></el-input>
      </el-form-item>

      <el-form-item style="float:left; width:400px;" label="创建选项2：">
        <el-input v-model="form.Choose2"></el-input>
      </el-form-item>

      <el-form-item style="float:left; width:400px;" label="创建选项3：">
        <el-input v-model="form.Choose3"></el-input>
      </el-form-item>

      <el-form-item style="width:400px;" label="判定类型：">
        <el-select v-model="form.Judge" placeholder="请选择判定类型">
          <el-option label="50%" value=0></el-option>
          <el-option label="票数最高" value=1></el-option>
          <el-option label="三分之二" value=2></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="width:535px;" label="投票开始时间：">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item style="width:535px;" label="投票结束时间：">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Demo from "@/js/demo";

export default {
  data() {
    return {
      activeIndex2: "1",
      form: {
        Topic:"",
        Choose1:"",
        Choose2:"",
        Choose3:"",
        Judge:"",
        date1:"",
        date2:""
      }
    };
  },
  created: async function() {
    await Demo.init_user();
  },
  methods: {
    async onCancel() {
      this.$router.push({ name: "page1", params: { id: "2" } });
    },
    async onSubmit() {
      var valuation_number = await Demo.backordernumber();
      var date = new Date();
      var state = "正在进行";
      var result = "暂无";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      valuation_number =
        date.getFullYear() +
        month +
        strDate +
        (Array(5).join(0) + valuation_number).slice(-2);

      if(this.form.date2.valueOf() < date.valueOf()) {
        alert("结束时间需大于当前时间");
      }
      else if(this.form.date1.valueOf() < date.valueOf()) {
        state = "正在进行";
      }
      else if(this.form.date1.valueOf() > date.valueOf()) {
        state = "未开始";
      }

      await Demo.addvotingdata(
        valuation_number,
        this.form.Topic.toString(),
        this.form.date1.toLocaleDateString(),
        this.form.date2.toLocaleDateString(),
        state,
        result,
        this.form.Judge.toString(),
        this.form.Choose1.toString(),
        this.form.Choose2.toString(),
        this.form.Choose3.toString(),
      );

      this.$router.push({ name: "page1", params: { userid: valuation_number } });  
    }
  }
};
</script>