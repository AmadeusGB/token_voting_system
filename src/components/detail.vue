<template>
  <div class="box1">
    <div class="topCar">
      <div>
          <span class="span-header" >&nbsp;&nbsp;投票详情</span>
          <hr size=2 style="color: #A9A9A9;border-style:dashed;margin:0 auto;width:98%">

          <div class="topList" style="width: 100%;border: 0px">
            <div>
              <span class="span-header" >&nbsp;投票</span>
              
              <br>
              <el-select v-model="value" placeholder="请选择" style="width: 40%;border: 0px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-input
                placeholder="请输入投票通证数"
                v-model="spendtoken"
                style="width: 40%;border: 0px"
                clearable>
              </el-input>

              <el-button type="primary" @click="Votetoken">确定</el-button>
            </div>
              
            <div>
              <span class="span-header" >&nbsp;通证</span>
              <br>
              <el-input
                placeholder="请输入通证买入数量"
                v-model="buytoken"
                style="width: 35%;border: 0px"
                clearable>
              </el-input>
              <el-button type="primary" @click="Buytoken">确定</el-button>

              <el-input
                placeholder="请输入通证卖出数量"
                v-model="selltoken"
                style="width: 35%;border: 0px"
                clearable>
              </el-input>
              <el-button type="primary" @click="Selltoken">确定</el-button>
            </div>


            <span class="span-content" style="top:205px;left:45px;font-size: 18px;">当前排名</span>
            <span class="span-content" style="top:235px;left:50px;" v-if="choose[0] != ''">{{choose[0]}}：共计{{credit[0]}}票</span>
            <span class="span-content" style="top:265px;left:50px;" v-if="choose[1] != ''">{{choose[1]}}：共计{{credit[1]}}票</span>
            <span class="span-content" style="top:295px;left:50px;" v-if="choose[2] != ''">{{choose[2]}}：共计{{credit[2]}}票</span>

            <span class="span-content" style="top:205px;left:685px;font-size: 18px;">当前持有通证：{{amount}}</span>
        </div>
          

      </div>
    </div>
  </div>
</template>


<script>
import Demo from "@/js/demo";

export default {
  data() {
    return {
      options: [],
      choose:[],
      credit:[],
      value: '',
      spendtoken:'',
      selltoken:'',
      buytoken:'',
      amount:''
    };
  },
  created: async function() {
    await Demo.init_user();
    this.amount = await Demo.check_balance();
    var id = this.$route.params.userid;
    var result = "[";

    this.choose.push(await Demo.displayinfo(id,7));
    this.choose.push(await Demo.displayinfo(id,8));
    this.choose.push(await Demo.displayinfo(id,9));

    this.credit.push(await Demo.backcredit(id,this.choose[0]));
    this.credit.push(await Demo.backcredit(id,this.choose[1]));
    this.credit.push(await Demo.backcredit(id,this.choose[2]));

    if(this.choose[0].length) {
      result +=
      '{"value":"'       +  1             +
      '","label":"'      +  this.choose[0]     +
      '"}';
    }
    if(this.choose[1].length) {
      result = result + ",";
      result +=
      '{"value":"'       +  2             +
      '","label":"'      +  this.choose[1]     +
      '"}';
    }
    if(this.choose[2].length) {
      result = result + ",";
      result +=
      '{"value":"'       +  3             +
      '","label":"'      +  this.choose[2]     +
      '"}';
    }

    result = result + "]";
    this.options = JSON.parse(result);
  },
  methods: {
    async Votetoken() {
      await Demo.vote(this.$route.params.userid,this.choose[this.value-1],this.spendtoken);
      this.$router.push({ name: "page1"});  
    },
    async Buytoken() {
      await Demo.buy(this.buytoken);
      this.$router.push({ name: "page1"});  
    },
    async Selltoken() {
      await Demo.sell(this.selltoken);
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

  .newForm {
    .el-form-item {
      padding-top: 20px;
    }
  }

  .car_other {
    margin-top: 10px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    overflow: hidden;

    span {
      display: block;
      margin-bottom: 10px;
    }
  }
}

  .imgList {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .itemImg {
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
  }

  .span-header{
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
  }
  .span-content{
    font-size: 14px;
    position:absolute;
  }
  .box1{
    padding: 10px;
    box-sizing: border-box;
    width: 100%
  }
  .topCar{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
  }
  .topCar div{
    width: 100%;
    height: 350px;
    margin: 5px 0;
    border: 1px solid #C0C0C0;
  }
  .topList{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    text-align: left;
  }
  .topList div{
    width: 45%;
    height: 250px;
    margin: 10px 0;
    border: 1px solid gray;
  }
  .tr,th,td{
    text-align:left;
  }
</style>
