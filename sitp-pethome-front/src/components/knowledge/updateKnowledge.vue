<template>
    <el-container>
      
      <div>
        <div class="b">
          <span class="color-title"> 修改知识</span>
        </div>
      </div>

      <div class="box">
       <el-container class="me-area me-write-box">
        <el-main class="me-write-main">
          <div class="me-write-content">
              <div class="pet-name">
                  宠物名称：
                  <el-input resize="none"
                      type="textarea"
                      v-model="name"
                      :rows="1"
                      class="me-write-name">
                   </el-input>
              </div>
              
              <div class="pet-type">
                  种类：
                  <el-select  placeholder="请选择宠物种类" filterable style="width: 77.9%" v-model="type" class="me-write-type">
                        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
	                    </el-option>
                  </el-select>
              </div>
              
              <div class="pet-nation">
                  产地：
                  <el-select  placeholder="请选择国家" filterable style="width: 77.9%" v-model="nation" class="me-write-nation">
                    <el-option-group v-for="group in country" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.label">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
	                    </el-option>
                    </el-option-group>
                  </el-select>
              </div>
              
              <div class="pet-character">
                品种：
                <el-input resize="none"
                      type="textarea"
                      v-model="characters"
                      :rows="1"
                      class="me-write-characters">
                </el-input>
              </div>

              <div class="pet-life">
                年龄：
                <el-input resize="none"
                      type="textarea"
                      v-model="life"
                      :rows="1"
                      class="me-write-life">
                </el-input>
              </div>

              <div class="pet-feed">
                投喂点：
                <el-input resize="none"
                      type="textarea"
                      v-model="feed_points"
                      :rows="1"
                      class="me-write-feed">
                </el-input>
              </div>
              <div class="pet-disease">
                病史：
                <el-input resize="none"
                      type="textarea"
                      v-model="easy_of_disease"
                      :rows="1"
                      class="me-write-disease">
                </el-input>
              </div>
              <div class="pet-feature">
                外貌：
                <el-input resize="none"
                      type="textarea"
                      v-model="feature"
                      :rows="3"
                      class="me-write-feature">
                </el-input>
              </div>
              <div class="pet-character_feature">
                性格：
                <el-input resize="none"
                      type="textarea"
                      v-model="character_feature"
                      :rows="3"
                      class="me-write-feature">
                </el-input>
              </div>
              <div class="pet-care_knowledge">
                饲养知识：
                <el-input resize="none"
                      type="textarea"
                      v-model="care_knowledge"
                      :rows="5"
                      class="me-write-knowledge">
                </el-input>
              </div>
              
              <!--
              <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="url"
                      placeholder="url"
                      class="me-write-url">
              </el-input>
              <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="cover_url"
                      placeholder="cover_url"
                      class="me-write-cover">
              </el-input>
              -->
          </div>    
        </el-main>
       </el-container>
      </div>
      
      <div class="me-write-btn">
          <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定取消吗？"
                @onConfirm="turnToKnowledge()"
          >
            <el-button slot="reference" type="info" plain size="small" class="cancel">取消</el-button>
          </el-popconfirm>
      </div>
      <div class="me-write-btn2">
          <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定修改吗？"
                @onConfirm="publishKnowledge()"
          >
            <el-button slot="reference" type="success" plain size="small"  class="publish">发布</el-button>
          </el-popconfirm>
      </div>   
    </el-container>
</template>

<script>

  export default {
    name: 'createKnowledge',
    created() {
        this.getKnowledge();
    },
    data() {
      return{
        type:null,
        types:[
            {value:1,label:'猫'},
            {value:2,label:'狗'},
            {value:3,label:'鸟'},
            {value:4,label:'昆虫'},
            {value:5,label:'爬行类'},
            {value:6,label:'鱼类'},
            {value:7,label:'其他'},
        ],
        name:"",
        characters:"",
        nation:"",
        easy_of_disease:"",
        life:"",
        feature:"",
        character_feature:"",
        care_knowledge:"",
        feed_points:"",
        url:"",
        cover_url:"",
        country:[{
    			label: '热门国家',
    			options: [{value:'China',label:'中国'},]
    		},{
    			label: '所有国家',
    			options: [
    			    {value:'Angola',label:'安哥拉'},
					{value:'Afghanistan',label:'阿富汗'},
					{value:'Albania',label:'阿尔巴尼亚'},
					{value:'Algeria',label:'阿尔及利亚'},
					{value:'Andorra',label:'安道尔共和国'},
					{value:'Anguilla',label:'安圭拉岛'},
					{value:'Antigua and Barbuda',label:'安提瓜和巴布达'},
					{value:'Argentina',label:'阿根廷'},
					{value:'Armenia',label:'亚美尼亚'},
					{value:'Ascension',label:'阿森松'},
					{value:'Australia',label:'澳大利亚'},
					{value:'Austria',label:'奥地利'},
					{value:'Azerbaijan',label:'阿塞拜疆'},
					{value:'Bahamas',label:'巴哈马'},
					{value:'Bahrain',label:'巴林'},
					{value:'Bangladesh',label:'孟加拉国'},
					{value:'Barbados',label:'巴巴多斯'},
					{value:'Belarus',label:'白俄罗斯'},
					{value:'Belgium',label:'比利时'},
					{value:'Belize',label:'伯利兹'},
					{value:'Benin',label:'贝宁'},
					{value:'Bermuda Is',label:'百慕大群岛'},
					{value:'Bolivia',label:'玻利维亚'},
					{value:'Botswana',label:'博茨瓦纳'},
					{value:'Brazil',label:'巴西'},
					{value:'Brunei',label:'文莱'},
					{value:'Bulgaria',label:'保加利亚'},
					{value:'Burkina Faso',label:'布基纳法索'},
					{value:'Burma',label:'缅甸'},
					{value:'Burundi',label:'布隆迪'},
					{value:'Cameroon',label:'喀麦隆'},
					{value:'Canada',label:'加拿大'},
					{value:'Cayman Is',label:'开曼群岛'},
					{value:'Central African Republic',label:'中非共和国'},
					{value:'Chad',label:'乍得'},
					{value:'Chile',label:'智利'},
					{value:'China',label:'中国'},
					{value:'Colombia',label:'哥伦比亚'},
					{value:'Congo',label:'刚果'},
					{value:'Cook Is',label:'库克群岛'},
					{value:'Costa Rica',label:'哥斯达黎加'},
					{value:'Cuba',label:'古巴'},
					{value:'Cyprus',label:'塞浦路斯'},
					{value:'Czech Republic',label:'捷克'},
					{value:'Denmark',label:'丹麦'},
					{value:'Djibouti',label:'吉布提'},
					{value:'Dominica Rep',label:'多米尼加共和国'},
					{value:'Ecuador',label:'厄瓜多尔'},
					{value:'Egypt',label:'埃及'},
					{value:'EI Salvador',label:'萨尔瓦多'},
					{value:'Estonia',label:'爱沙尼亚'},
					{value:'Ethiopia',label:'埃塞俄比亚'},
					{value:'Fiji',label:'斐济'},
					{value:'Finland',label:'芬兰'},
					{value:'France',label:'法国'},
					{value:'French Guiana',label:'法属圭亚那'},
					{value:'French Polynesia',label:'法属玻利尼西亚'},
					{value:'Gabon',label:'加蓬'},
					{value:'Gambia',label:'冈比亚'},
					{value:'Georgia',label:'格鲁吉亚'},
					{value:'Germany',label:'德国'},
					{value:'Ghana',label:'加纳'},
					{value:'Gibraltar',label:'直布罗陀'},
					{value:'Greece',label:'希腊'},
					{value:'Grenada',label:'格林纳达'},
					{value:'Guam',label:'关岛'},
					{value:'Guatemala',label:'危地马拉'},
					{value:'Guinea',label:'几内亚'},
					{value:'Guyana',label:'圭亚那'},
					{value:'Haiti',label:'海地'},
					{value:'Honduras',label:'洪都拉斯'},
					{value:'Hungary',label:'匈牙利'},
					{value:'Iceland',label:'冰岛'},
					{value:'India',label:'印度'},
					{value:'Indonesia',label:'印度尼西亚'},
					{value:'Iran',label:'伊朗'},
					{value:'Iraq',label:'伊拉克'},
					{value:'Ireland',label:'爱尔兰'},
					{value:'Israel',label:'以色列'},
					{value:'Italy',label:'意大利'},
					{value:'Ivory Coast',label:'科特迪瓦'},
					{value:'Jamaica',label:'牙买加'},
					{value:'Japan',label:'日本'},
					{value:'Jordan',label:'约旦'},
					{value:'Kampuchea (Cambodia )',label:'柬埔寨'},
					{value:'Kazakstan',label:'哈萨克斯坦'},
					{value:'Kenya',label:'肯尼亚'},
					{value:'Korea',label:'韩国'},
					{value:'Kuwait',label:'科威特'},
					{value:'Kyrgyzstan',label:'吉尔吉斯坦'},
					{value:'Laos',label:'老挝'},
					{value:'Latvia',label:'拉脱维亚'},
					{value:'Lebanon',label:'黎巴嫩'},
					{value:'Lesotho',label:'莱索托'},
					{value:'Liberia',label:'利比里亚'},
					{value:'Libya',label:'利比亚'},
					{value:'Liechtenstein',label:'列支敦士登'},
					{value:'Lithuania',label:'立陶宛'},
					{value:'Luxembourg',label:'卢森堡'},
					{value:'Madagascar',label:'马达加斯加'},
					{value:'Malawi',label:'马拉维'},
					{value:'Malaysia',label:'马来西亚'},
					{value:'Maldives',label:'马尔代夫'},
					{value:'Mali',label:'马里'},
					{value:'Malta',label:'马耳他'},
					{value:'Mariana Is',label:'马里亚那群岛'},
					{value:'Martinique',label:'马提尼克'},
					{value:'Mauritius',label:'毛里求斯'},
					{value:'Mexico',label:'墨西哥'},
					{value:'Moldova',label:'摩尔多瓦'},
					{value:'Monaco',label:'摩纳哥'},
					{value:'Mongolia',label:'蒙古'},
					{value:'Montserrat Is',label:'蒙特塞拉特岛'},
					{value:'Morocco',label:'摩洛哥'},
					{value:'Mozambique',label:'莫桑比克'},
					{value:'Namibia',label:'纳米比亚'},
					{value:'Nauru',label:'瑙鲁'},
					{value:'Nepal',label:'尼泊尔'},
					{value:'Netheriands Antilles',label:'荷属安的列斯'},
					{value:'Netherlands',label:'荷兰'},
					{value:'New Zealand',label:'新西兰'},
					{value:'Nicaragua',label:'尼加拉瓜'},
					{value:'Niger',label:'尼日尔'},
					{value:'Nigeria',label:'尼日利亚'},
					{value:'North Korea',label:'朝鲜'},
					{value:'Norway',label:'挪威'},
					{value:'Oman',label:'阿曼'},
					{value:'Pakistan',label:'巴基斯坦'},
					{value:'Panama',label:'巴拿马'},
					{value:'Papua New Cuinea',label:'巴布亚新几内亚'},
					{value:'Paraguay',label:'巴拉圭'},
					{value:'Peru',label:'秘鲁'},
					{value:'Philippines',label:'菲律宾'},
					{value:'Poland',label:'波兰'},
					{value:'Portugal',label:'葡萄牙'},
					{value:'Puerto Rico',label:'波多黎各'},
					{value:'Qatar',label:'卡塔尔'},
					{value:'Reunion',label:'留尼旺'},
					{value:'Romania',label:'罗马尼亚'},
					{value:'Russia',label:'俄罗斯'},
					{value:'Saint Lueia',label:'圣卢西亚'},
					{value:'Saint Vincent',label:'圣文森特岛'},
					{value:'Samoa Eastern',label:'东萨摩亚(美)'},
					{value:'Samoa Western',label:'西萨摩亚'},
					{value:'San Marino',label:'圣马力诺'},
					{value:'Sao Tome and Principe',label:'圣多美和普林西比'},
					{value:'Saudi Arabia',label:'沙特阿拉伯'},
					{value:'Senegal',label:'塞内加尔'},
					{value:'Seychelles',label:'塞舌尔'},
					{value:'Sierra Leone',label:'塞拉利昂'},
					{value:'Singapore',label:'新加坡'},
					{value:'Slovakia',label:'斯洛伐克'},
					{value:'Slovenia',label:'斯洛文尼亚'},
					{value:'Solomon Is',label:'所罗门群岛'},
					{value:'Somali',label:'索马里'},
					{value:'South Africa',label:'南非'},
					{value:'Spain',label:'西班牙'},
					{value:'SriLanka',label:'斯里兰卡'},
					{value:'St.Lucia',label:'圣卢西亚'},
					{value:'St.Vincent',label:'圣文森特'},
					{value:'Sudan',label:'苏丹'},
					{value:'Suriname',label:'苏里南'},
					{value:'Swaziland',label:'斯威士兰'},
					{value:'Sweden',label:'瑞典'},
					{value:'Switzerland',label:'瑞士'},
					{value:'Syria',label:'叙利亚'},
					{value:'Tajikstan',label:'塔吉克斯坦'},
					{value:'Tanzania',label:'坦桑尼亚'},
					{value:'Thailand',label:'泰国'},
					{value:'Togo',label:'多哥'},
					{value:'Tonga',label:'汤加'},
					{value:'Trinidad and Tobago',label:'特立尼达和多巴哥'},
					{value:'Tunisia',label:'突尼斯'},
					{value:'Turkey',label:'土耳其'},
					{value:'Turkmenistan',label:'土库曼斯坦'},
					{value:'Uganda',label:'乌干达'},
					{value:'Ukraine',label:'乌克兰'},
					{value:'United Arab Emirates',label:'阿拉伯联合酋长国'},
					{value:'United Kiongdom',label:'英国'},
					{value:'United States of America',label:'美国'},
					{value:'Uruguay',label:'乌拉圭'},
					{value:'Uzbekistan',label:'乌兹别克斯坦'},
					{value:'Venezuela',label:'委内瑞拉'},
					{value:'Vietnam',label:'越南'},
					{value:'Yemen',label:'也门'},
					{value:'Yugoslavia',label:'南斯拉夫'},
					{value:'Zimbabwe',label:'津巴布韦'},
					{value:'Zaire',label:'扎伊尔'},
					{value:'Zambia',label:'赞比亚'}
    			]
    		}],
      }
    },
    methods: {
       turnToKnowledge() {
        this.$router.push({path: `/knowledge`})
       },
       getKnowledge(){
           let _this=this;
           this.axios
          .get("http://127.0.0.1:5000/knowledge/"+ _this.$route.params.id)
          .then(res => {             
            if (res.data.flag) {
              console.log(res.data);
              _this.type=res.data.data.data.pet_type;
            _this.name=res.data.data.data.pet_name;
         _this.characters=res.data.data.data.characters;
         _this.nation=res.data.data.data.nation;
         _this.easy_of_disease=res.data.data.data.easy_of_disease;
         _this.life=res.data.data.data.life;
         _this.feature=res.data.data.data.feature;
         _this.character_feature=res.data.data.data.character_feature;
         _this.care_knowledge=res.data.data.data.care_knowledge;
         _this.feed_points=res.data.data.data.feed_points;
         _this.url=res.data.data.data.url;
         _this.cover_url=res.data.data.data.cover_url;
            }
          });
       },
       publishKnowledge(){
         let _this = this;
         console.log(_this.type);
         console.log(_this.name);
         console.log(_this.characters);
         console.log(_this.nation);
         console.log(_this.easy_of_disease);
         console.log(_this.life);
         console.log(_this.feature);
         console.log(_this.character_feature);
         console.log(_this.care_knowledge);
         console.log(_this.feed_points);
         console.log(_this.url);
         console.log(_this.cover_url);
         this.axios
          .post("http://127.0.0.1:5000/knowledge/update",{
              id:_this.$route.params.id,
              type:_this.type,
              name:_this.name,
              characters:_this.characters,
              nation:_this.nation,
              easy_of_disease:_this.easy_of_disease,
              life:_this.life,
              feature:_this.feature,
              character_feature:_this.character_feature,
              care_knowledge:_this.care_knowledge,
              feed_points:_this.feed_points,
              url:_this.url,
              cover_url:_this.cover_url,
          } )
          .then(res => {
            if (res.data.flag) {
              console.log(res.data);
              alert("知识已修改。");
              this.$router.push({path: `/knowledge`});
            }
          });
       }

    },
  }
</script>

<style scoped>

  .el-container {
    margin-left:100px;
    width: 960px;
  }

  .el-main {
    padding: 0px;
    margin-top: 10px;
  }


  button {
    margin-left:825px;
    margin-bottom:25px;
    background-color: #008CBA; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
  }

  .color-title{
    background-image: linear-gradient(135deg, deeppink, dodgerblue);
    font-size: 50px;
    font-weight: bold;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    -moz-box-decoration-break: clone;
    color: transparent;
    position:relative;
  }
  .color-title::selection{
    color:deeppink;
    background-color: #0ff;
  }
 
  .b{
    width: 100%;
    margin-left: 400px;
  }
  .publish{

  }

  .me-write-box {
    max-width: 1000px;
    margin: 80px auto 0;
  }

  .me-write-content {
    line-height: 60px;
    font-size: 18px;
    font-weight: normal;
    margin-left: 0px;
    height:500px;
  }

  .me-write-content textarea {
    font-size: 32px;
    font-weight: normal;
    border: none;
  }

  .me-write-title {
    line-height: 60px;
    font-size: 30px;
    font-weight:  bolder!important;
    margin-left: 0px;
  }

  .me-write-btn {
    margin-top: 10px;
    margin-left:-1000px;
  }
  .me-write-btn2 {
    margin-top: 10px;
    margin-left:-1050px;
  }

  .me-write-name{
      width:200px;
      max-width:200px;
      overflow-y:auto;
      top: -10px;
  }

  .pet-name{
      height:60px;
      float: left;
      margin-right:40px;
  }

  .pet-nation{
      height:60px;
      float: left;
      margin-right:45px;
  }

  .pet-disease{
      height:60px;
      float: left;
      margin-right:45px;
  }

  .pet-type{
      height:60px;
      float: left;
      margin-right:40px;
  }

  .pet-character{
      height:60px;
      margin-right:40px;
      float: left;
  }

.pet-life{
      height:60px;
      margin-right:40px;
      float: left;
  }

  .pet-feed{
      height:60px;
      margin-right:40px;
      float: left;
  }

  .pet-feature{
    margin-right:40px;
    margin-top:40px;
    float: left;
  }
  .pet-character_feature{
    margin-right:40px;
    margin-top:30px;
    float: left;
  }
  .pet-care_knowledge{
    float: left;
    width: 900px;
  }

  .box{
    margin-left: -520px;
    width: 100%;
  }

  .me-write-nation{
      width:200px;
      max-width:200px;
  }

  .me-write-type{
      width:200px;
      max-width:200px;
  }

  .me-write-characters{
      width:200px;
      max-width:200px;
      top:-10px;
  }

  .me-write-life{
      width:50px;
      max-width:50px;
      top:-10px;
  }

  .me-write-feed{
      width:370px;
      max-width:370px;
      top:-10px;
  }

  .me-write-disease{
      width:840px;
      max-width:840px;
      top:-10px;
  }
  .me-write-feature{
      width:370px;
      max-width:370px;
      top:-10px;
  }
  .me-write-care_knowledge{
      width:900px;
      max-width:900px;
      top:-10px;
  }

</style>
