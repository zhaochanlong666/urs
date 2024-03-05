<template>
    <div id="yeBox">
        <div id="yeBox_top">
            <button @click="oneincrease">添加</button>
            <div>
                <p>搜索</p>
                <input type="text" name="" id="" placeholder="请输入名字" v-model="name" @input="handle" />
            </div>
        </div>
        <div id="yeBox_son">
            <template>
                <el-table :data="applyarray.slice((page - 1) * pagelimit, page * pagelimit)">
                    <el-table-column prop="name" label="名称" width="80">
                    </el-table-column>
                    <el-table-column prop="url" label="图片" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.url" style="width: 100px; height: 100px" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="details" label="详情描述"> </el-table-column>
                    <el-table-column prop="price" label="单价"> </el-table-column>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type === 1">代购</span>
                            <span v-else-if="scope.row.type === 2">代排队</span>
                            <span v-else-if="scope.row.type === 3">送</span>
                            <span v-else-if="scope.row.type === 4">租赁</span>
                            <span v-else-if="scope.row.type === 5">递代取</span>
                            <span v-else>未知状态</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createtime" label="日期"> </el-table-column>
                    <el-table-column prop="" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-search" plain @click="tanLook(scope.row.id)"></el-button>
                            <el-button type="primary" icon="el-icon-edit" plain @click="gather(scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" plain
                                @click="deleteshan(scope.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <div id="Checkdeleteand" v-show="window">
            <div id="csb_Box">
                <h1>{{ chakant }}</h1>
                <div>
                    <p>服务名称:</p>
                    <input type="text" name="" id="" value="" v-model="nameson" />
                </div>
                <div>
                    <p>服务图片:</p>
                    <input type="text" name="" id="" value="" v-model="urlson" v-show="tupianyin" />
                    <img :src="urlson" alt="" v-show="tupianxian" class="tupianxiao">
                </div>
                <div>
                    <p>服务描述:</p>
                    <input type="text" name="" id="" value="" v-model="detailsson" />
                </div>
                <div>
                    <p>东西单价:</p>
                    <input type="text" name="" id="" value="" v-model="priceson" @input="validateNumberInput" />
                </div>
                <div>
                    <p>东西类型:</p>
                    <select name="example" v-model="typeson">
                        <option value="1">代购</option>
                        <option value="2">代排队</option>
                        <option value="3">代送</option>
                        <option value="4">租赁</option>
                        <option value="5">快递代取</option>
                    </select>
                </div>
                <div>
                    <button @click="gai" v-show="xuiyin">修改</button>
                    <button v-show="tianjia" @click="addtian">添加</button><button @click="cancellation"
                        v-show="quxiao">取消</button>
                </div>
            </div>
        </div>
        <!-- fenye -->
        <div id="fenye">
            <el-pagination v-model="page" :current-page.sync="page" :page-size.sync="pagelimit" :page-sizes="[1, 3, 5, 10]"
                :small="small" :disabled="disabled" layout="total, sizes, prev, pager, next, jumper"
                :total="applyarray.length" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { rendering, postview, postincrease, postdelete, postsearch } from "../../api/http";
import '@/linglei/buttonStyles.css'

export default {
    data() {
        return {
            pagelimitson: "",
            // 添加
            tupianyin: true,
            xuiyin: false,
            tupianxian: false,
            chakant: "添加",
            //chakn
            nameson: "",
            urlson: "",
            priceson: "",
            detailsson: "",
            typeson: "",
            // remen: "是",
            // mark: "小熊",
            // createtime: "2022-03-16",
            idopu: '',

            quxiao: true,
            tianjia: true,
            window: false,
            pagelimit: 10,
            small: false,
            disabled: false,
            page: 1,
            applyarray: [], //数组
            name: '',
            listdata: '',
            totalDataCount: '',
            numberInput: ''

        }
    },
    computed: {
        displayedData() {
            const start = (this.currentPage4 - 1) * this.pageSize4;
            const end = start + this.pageSize4;
            return this.applyarray.slice(start, end);
        },
    },
    created() {
        this.xuanran()

    },

    methods: {


        // 搜索
        handle() {
            const obj = {
                name: this.name,
            };
            postsearch(obj).then(response => {
                this.applyarray = response.data.data;
                console.log(response.data.data);
                this.totalDataCount = response.data.pagecount; // 更新总数据量
            });
        },
        // 回显

        gather(id) {
            let data = {
                id: id,
            };
            this.idopu = id
            postview(data).then((res) => {
                this.chashuju = res.data;
                this.nameson = res.data.name;
                this.urlson = res.data.url;
                this.priceson = res.data.price;
                this.detailsson = res.data.details;
                this.typeson = res.data.type;
            });
            this.tupianyin = true,
                this.tupianxian = false
            this.chakant = "编辑"
            this.quxiao = true,
                this.tianjia = false
            this.window = true;
            this.xuiyin = true
        },

        // 编辑
        gai() {
            let otpy = this.idopu
            let data = {
                id: otpy,
                name: this.nameson,
                url: this.urlson,
                price: this.priceson,
                details: this.detailsson,
                type: this.typeson,
            };
            postincrease(data, otpy).then((res) => {
                this.xuanran()

                console.log(res);
            });
            this.tupianyin = true,
                this.tupianxian = false
            this.chakant = "编辑"
            this.quxiao = true,
                this.tianjia = true
            this.window = false;
        },
        // 删除
        deleteshan(id) { // 在方法参数中接收 id 变量
            let dataadd = {
                id: id
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            }).then(() => {
                postdelete(dataadd).then((res) => {
                    console.log(res.data);
                    this.applyarray.splice(id, 1);
                    this.xuanran()
                    console.log(res);
                });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


        // x渲染
        xuanran() {
            rendering().then((res) => {
                this.applyarray = res.data.data;
                // console.log(this.applyarray);
            });
        },
        // 查看
        tanLook(id) {
            let data = {
                id: id,
            };
            postview(data).then((res) => {
                // console.log(res.data);
                this.chashuju = res.data;
                this.nameson = res.data.name;
                this.urlson = res.data.url;
                this.priceson = res.data.price;
                this.detailsson = res.data.details;
                this.typeson = res.data.type;
            });
            this.window = true;
            this.quxiao = true,
                this.xuiyin = false,

                this.tianjia = false
            this.chakant = "查看"
            this.tupianyin = false,
                this.tupianxian = true
        },

        // 添加内容
        validateNumberInput(input) {
            // 只保留数字
            return input.replace(/\D/g, '');
        },
        addtian() {
            let dataadd = {
                name: this.nameson,
                url: this.urlson,
                price: this.validateNumberInput(this.priceson), // 使用 validateNumberInput 进行数字验证
                details: this.detailsson,
                type: this.typeson,
                // remen: this.remen,
                // mark: this.mark,
                // createtime: this.createtime,
            };
            if (dataadd.name !== '' && dataadd.url !== '' && dataadd.details !== '') {
                if (dataadd.price !== '') {
                    postincrease(dataadd).then((res) => {
                        console.log(dataadd);
                        console.log(res.data, '1111');
                        this.xuanran();
                        this.applyarray.unshift(dataadd);
                        this.window = false;
                    });
                } else {
                    this.$message({
                        message: '请单价写数字',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: '请完成添加再提交',
                    type: 'warning'
                });
            }

        },

        //添加出现表单
        oneincrease() {
            this.nameson = "";
            this.urlson = "";
            this.priceson = "";
            this.detailsson = "";
            this.typeson = "";
            this.tupianyin = true,
                this.tupianxian = false
            this.xuiyin = false,

                this.chakant = "添加"
            this.quxiao = true,
                this.tianjia = true
            this.window = true;
        },
        handleSizeChange(val) {
            console.log(`${val} items per page`);
        },
        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
        },
        //关闭
        cancellation() {
            this.window = false;
        },
    },
};
</script>
<style lang="less" scoped>
#Checkdeleteand {
    #csb_Box {
        h1 {
            font-size: 30px;
            text-align: center;
            padding-top: 30px;
        }

        div {
            p {
                margin-left: 20px;
                padding-right: 10px;
                padding-top: 8px;
            }

            input {
                width: 270px;
                height: 35px;
            }

            text-align: center;
            padding-top: 10px;
            display: flex;
            // margin-top: 60px;
            margin-bottom: 20px;

            select {
                width: 270px;
                height: 35px;
            }

            button {
                width: 70px;
                height: 30px;
                margin-left: 50px;
            }
        }

        border-radius: 2px;

        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 500px;
        background-color: #e9eef3;
    }

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background-color: #0000004a;
}
#yeBox_top{
    background-color:#f6fdff;
}
#yeBox_top {
    div {
        display: flex;
        
        input {
            width: 230px;
            border-radius: 5px;
            height: 35px;
            padding-left: 5px;
        }

        p {
            margin-right: 10px;
            margin-top: 5px;
        }
    }

    button {
        width: 100px;
        height: 35px;

    }

    width: 100%;
    height: 60px;
    position: sticky;
    z-index: 999;
    top: -20px;
    left: 0px;
    justify-content: space-between;
    display: flex;
}

.tongyi {
    width: 45px;
    height: 30px;
    border-radius: 10px;
    margin-left: 10px;
    border: none;
}

.tupianxiao {
    width: 50px;
    height: 40px;
}
.el-button{
    padding:12px 17px;
}

#fenye {
    position: absolute;
    bottom: 0px;
    z-index: 999;
    height: 55px;
}

#yeBox {
    width: 100%;
    // height: 50vh;
}

#yeBox::-webkit-scrollbar {
    display: none;
}
</style>
