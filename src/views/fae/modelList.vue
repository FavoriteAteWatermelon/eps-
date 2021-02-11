<template>
  <div>
  <div style="display:flex;justify-content: space-between;margin-bottom:10px">
  <div style="display:flex">
    <span class="title" style="margin-left: 20px;">日期 :</span>
    <el-date-picker
      v-model="valueDate"
      type="daterange"
      range-separator="至"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd 00:mm:ss"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
   <div>

  <el-button class="exportExcel"  @click="_exportExcel" style="margin-right: 20px;text-align:right;background:#77A1D3"  type="primary" icon="el-icon-download">導出Excel</el-button>
  <el-button class="exportExcel" @click="_addItem" style="margin-right: 20px;text-align:right;background:#20BDFF"  type="primary" icon="el-icon-plus">新增主板/小卡</el-button>
  <el-button type="primary" style="background:#3CA55C" icon="el-icon-search" @click="_search">搜索</el-button>

   </div>
</div>

    <el-table
     v-if ="tableData.length"
     v-loading = "pictLoading"
      element-loading-background = "rgba(0, 0, 0, 0.5)"
      element-loading-text = "数据正在加载中"
      element-loading-spinner = "el-icon-loading"
     :stripe= "true"
     :border="true"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      label="序號"
      width="55">
    </el-table-column>
          <!-- // imageUrl , machineNum, customer , customer_bios, coustomer_fw, bios_version, fw_version, chipset, createUser ,createDate -->
    <el-table-column
      property="imageUrl"
      width="160px"
      header-align="center"
      label="主板/小卡圖"
   >
    <template   slot-scope="scope">
<el-image v-if="scope.row.imageUrl"  min-width="160" height="160" :src="scope.row.imageUrl" :preview-src-list="[scope.row.imageUrl]"></el-image>
        </template>
   </el-table-column>
    <el-table-column
     header-align="center"
      property="machineNum"
      width="100px"
      label="機種"
   >
   </el-table-column>
    <el-table-column
     header-align="center"
      property="customer"
       width="120px"
      label="客戶"
   ></el-table-column>

    <el-table-column
     align="center"
     width="150px"
      property="customer_bios"
      label="客製化BIOS"
   >
   </el-table-column>
    <el-table-column
     align="center"
     width="150px"
      property="coustomer_fw"
      label="客製化FW"
   >
   </el-table-column>
    <el-table-column
     align="center"
     width="120px"
      property="bios_version"
      label="BIOS版本"
   >
   </el-table-column>
    <el-table-column
     align="center"
     width="120px"
      property="fw_version"
      label="FW版本"
   >
   </el-table-column>
    <el-table-column
     align="center"
     width="120px"
      property="chipset"
      label="芯片"
   >
   </el-table-column>
    <el-table-column
      property="createUser"
      label="上傳人員"
   >
    </el-table-column>
    <el-table-column
    align="center"
     width="100px"
      property="createTime"
      label="創建時間"
   >
    </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-popconfirm
         v-show="userInfo.username&& (userInfo.username === scope.row.username || userInfo.username === 'root')"
        @confirm="handleClick(scope.row)"
  title="这是一段内容确定删除吗？"
>
  <el-button  type="text" size="small" slot="reference">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <BasePagination v-if="tableData.length" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="total"/>
  <el-dialog
  title="新增機種資料"
  :close-on-click-modal="false"
  :visible.sync="dialogVisible"
  width="1200px"
  >
          <!-- machineNum: '',
        customer: '',
        customer_bios: '',
        coustomer_fw: '',
        bios_version: '',
        fw_version: '',
        chipset: '' -->
  <div style="display:flex;justify-content:space-around">
    <div>
   <div style="margin-top: 10px;text-align:center">
      <ImgCutter rate="1:1" v-on:cutDown="cutDown" label="上傳主板/小卡圖片"></ImgCutter>
      <img style="margin-top: 20px" :src="imgUrl1" width="200px" height="200px" alt="上傳主板/小卡圖片">
   </div>
    </div>
    <!-- imageUrl , machineNum, customer , customer_bios, coustomer_fw, bios_version, fw_version, chipset, -->
    <div>
      <div style="display:flex;margin-top:10px">
        <span class="title">機種:</span><el-input  v-model="modelList.machineNum" style="width: 220px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
  <span class="title">客戶:</span> <el-select
   @change="changeItem"
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

      </div>
      <div style="display:flex;margin-top:10px">
        <span class="title">客制BIOS:</span><el-input  v-model="modelList.customer_bios" style="width: 220px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
        <span class="title">客制FW:</span><el-input  v-model="modelList.customer_fw" style="width: 220px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
        <span class="title">BIOS_VER:</span><el-input  v-model="modelList.bios_version" style="width: 220px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
        <span class="title">FW_VER:</span><el-input  v-model="modelList.fw_version" style="width: 220px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
        <span class="title">chipset:</span><el-input  v-model="modelList.chipset" style="width: 220px"></el-input>
      </div>
    </div>

  </div>
  <div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadModelListInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import BasePagination from '@/components/base/basePagination'
import DataTable from '@/components/datatable'
import ImgCutter from 'vue-img-cutter'
import {uploadImage} from '../../api/upload'
// import{ addIssue, findIssueInfo, deleteIssue} from '../../api/issue'
import { addModelList,findModelListInfo,findModelListInfoAll,deleteModelList,updateModelList} from '../../api/modelList'
import {utc2beijing} from '../../utils/date'
import table2excel from 'js-table2excel'
import {mapState, mapGetters} from 'vuex'

export default {
  data () {
    return {
      imgUrl1: '',
      dialogVisible: false,
      // imageUrl , machineNum, customer , customer_bios, coustomer_fw, bios_version, fw_version, chipset, createUser ,createDate
      modelList: {
        imageUrl: '1.png',
        machineNum: '',
        customer: '',
        customer_bios: '',
        coustomer_fw: '',
        bios_version: '',
        fw_version: '',
        chipset: ''
      },
      valueDate: '',
      options: [{
          value: '寶德',
          label: '寶德'
        }, {
          value: '銨泰克',
          label: '銨泰克'
        }, {
          value: '銨鼎',
          label: '銨鼎'
        }],
        value: '',
      dialogVisible: false,
      coverVal: '',
      statusOptions: [
        {
          label: 'waiting',
          value: 'waiting'
        },
        {
          label: 'doing',
          value: 'doing'
        },
        {
          label: 'completion',
          value: 'completion'
        }
      ],
      // 员工工号
      pictLoading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      userNum: '',
      startDate: '',
      total: 0,
      endDate: '',
      pickerOptionsStart: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsEnd: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    changeItem () {
      this.modelList.customer =  this.value.join('、')
    },
    handleClick (item) {
     
      let {_id} = item
       deleteModelList({_id:_id,createUser: this.userInfo.username}).then(res => {
        if(res.data === 'error') {
          this.$message({
            message: '删除失败!',
            type: 'warning'
          })         
        }else if (res.data === 'ok') {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
          this._search()       
        }else{
          this.$message({
            message: '未知错误请联系管理员!',
            type: 'error'
          })        
        }
      }) 
    },
    uploadModelListInfo () {
       if (this.isLogin) {
         addModelList(Object.assign({},this.modelList, {createUser: this.userInfo.username})).then(res => {
            if (!res.data) {
              this.$message({
                message: 'token过期，请重新登录',
                type: 'warning'
              })
              this.dialogVisible = false
            }else{
              if (res.data === 'no_exist') {
                this.$message({
                  message: '用户名不存在',
                  type: 'warning'
                })       
              }else {
                this.$message({
                  message: '上傳成功!',
                  type: 'success'
                })
                this.dialogVisible = false
                this._search()        
              }

            }
          }).catch(err=>{
            console.log(err)
          })
       } else {
        this.$message({
          message: '请登录',
          type: 'warning'
        })
       }

    },
    cutDown (data,index) {
      console.log(data,index)
      let fd = new FormData()
      fd.append("image", data.blob);
      // console.log(fd)
      // fd.append("originalname", data.fileName)
       let that = this
      uploadImage(fd).then(res=> {
        that.modelList.imageUrl=res.data.url
      })
      this.imgUrl1 =  data.dataURL
    },


    _addItem () {
      this.dialogVisible = true
    },
    changeStart () {
      if (this.startDate === '' || this.startDate === null) {
        this.endDate = ''
        return
      }
      const that = this
      this.pickerOptionsEnd = {
        disabledDate (time) {
          if (that.startDate === '' || that.startDate === null) {
            return
          }
          return time.getTime() > that.startDate.getTime() + 3600 * 1000 * 24 * 150 || time.getTime() < that.startDate.getTime()
        }
      }
    },
    _search () {
      this.pictLoading = true
      findModelListInfo(this.pageSize,this.currentPage,JSON.stringify(this.valueDate)).then(res =>{
        // console.log(res)
        res.data.data.forEach(item => {
          // item.completionTime = utc2beijing(item.completionTime)
          item.createTime = utc2beijing(item.createTime)
        });
        this.tableData = res.data.data
        console.log(res.data)
        this.total = res.data.total
        this.pictLoading = false
      })
    },
    _exportExcel () {
      
      findTraingInfoAll(JSON.stringify(this.valueDate)).then(res=> {
        
        res.data.data.forEach(item => {
          // item.happenDate = utc2beijing(item.happenDate)
          item.createTime = utc2beijing(item.createTime)
          item.completionTime = utc2beijing(item.completionTime)
        });
      // title ,status  ,machineNum，summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate
      const column = [
        {title: '項目', key: 'title', type: 'text'},
        {title: '完成狀態', key: 'status', type: 'text'},
        {title: '機種', key: 'machineNum', type: 'text'},
        {title: '概要', key: 'summarize', type: 'text'},
        {title: '初始圖', key: 'imgStart', type: 'image',width: 200,height: 200},
        {title: '初始圖說明', key: 'imgStartDes', type: 'text'},
        {title: '過程圖', key: 'imgDoing', type: 'image',width: 200,height: 200},
        {title: '過程圖說明', key: 'imgDoingDes', type: 'text'},
        {title: '結果圖', key: 'imgEnd', type: 'image',width: 200,height: 200},
        {title: '結果圖說明', key: 'imgEndDes', type: 'text'},
        {title: '受訓人', key: 'trainUser', type: 'text'},
        {title: '完成時間', key: 'completionTime', type: 'text'},
        {title: '導師', key: 'guider', type: 'text'},
        {title: '創建時間', key: 'createTime', type: 'text'}
      ]
        const tabelName = this.valueDate.length > 1 ? `培訓完成表 ${this.valueDate[0].substring(0,10)}-${this.valueDate[1].substring(0,10)}` :'培訓完成表'
          // 下载excel选中表单内容
      if (this.tableData.length) {
        table2excel(column, res.data.data, tabelName)
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
      })

      

    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this._search()
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this._search()
    },
  },
  mounted() {
    this._search()
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    }),
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    // DateAndTitle,
    BasePagination,
    DataTable,
    ImgCutter
  }

}
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  width: 100px;
  text-align: center;
  font-size: 12px;
  padding: 0 5px;
  background: #409eff;
  // margin-left: 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.idCon{
    display: inline-block;
    font-size: 0;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
>>>.el-input__inner{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>

