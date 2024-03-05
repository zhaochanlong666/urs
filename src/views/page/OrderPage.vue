<template>
    <div id="yeBox">
        <div id="yeBox_top">
            <button @click="oneincrease" class="button">添加</button>
            <div>
                <p>搜索</p>
                <input type="text" name="" id="" placeholder="请输入名字" v-model="name" @input="handle" />
            </div>
        </div>
        <div id="yeBox_son">
            <template>
                <el-table :data="applyarray.slice((page - 1) * pagelimit, page * pagelimit)">
                    <el-table-column prop="num" label="数量" width="80"></el-table-column>
                    <el-table-column prop="name" label="姓名"> </el-table-column>
                    <el-table-column prop="iphone" label="手机号"> </el-table-column>
                    <el-table-column prop="address" label="地址"> </el-table-column>
                    <el-table-column prop="remark" label="特殊要求"> </el-table-column>
                    <el-table-column prop="liuyan" label="买家留言"> </el-table-column>
                    <el-table-column prop="userid" label="用户的id"> </el-table-column>
                    <el-table-column prop="ordercode" label="订单号" width="200"> </el-table-column>
                    <el-table-column prop="price" label="单价"> </el-table-column>
                    <el-table-column prop="status" label="支付状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 0">成功</span>
                            <span v-else-if="scope.row.status === 1">失败</span>
                            <span v-else-if="scope.row.status === 2">待支付</span>
                            <span v-else-if="scope.row.status === 3">已取消</span>
                            <span v-else-if="scope.row.status === 4">售后中</span>
                            <span v-else>未知状态</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="allprice" label="总价"> </el-table-column>
                    <el-table-column prop="" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-search" @click="tanLook(scope.row.id)" plain></el-button>
                            <el-button type="primary" icon="el-icon-edit" plain @click="gather(scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" plain
                                @click="deleteshan(scope.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <!-- 查看 -->

        <div>
            <el-dialog :title="chakant" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <div id="csb_Box_yi">
                    <div>
                        <p>数量:</p>
                        <input type="text" name="" id="" value="" v-model="numson" maxlength="5" @input="numberson" />
                    </div>
                    <div>
                        <p>姓名:</p>
                        <input type="text" name="" id="" value="" v-model="nameson" @input="fullson" />
                    </div>
                    <div>
                        <p>手机号:</p>
                        <input type="text" name="" id="" value="" v-model="iphoneson" maxlength="11" @input="phoneson" />
                    </div>
                    <div>
                        <p>地址:</p>
                        <input type="text" name="" id="" value="" v-model="addressson" />
                    </div>
                    <div>
                        <p>特殊要求:</p>
                        <input type="text" name="" id="" value="" v-model="remarkson" />
                    </div>
                    <div>
                        <p>买家留言:</p>
                        <input type="text" name="" id="" value="" v-model="liuyanson" />
                    </div>
                    <div>
                        <p>用户的id:</p>
                        <input type="text" name="" id="" value="" v-model="useridson" />
                    </div>
                    <div>
                        <p>订单号:</p>

                        <input type="text" name="" id="" value="" v-model="ordercodeson" maxlength="22" @input="Orderson"
                            disabled="disabled" />
                    </div>
                    <div>
                        <p>单价:</p>
                        <input type="text" name="" id="" value="" v-model="priceson" maxlength="4" @input="unitpriceson" />
                    </div>
                    <div>
                        <p>总价:</p>
                        <input type="text" name="" id="" value="" v-model="allpriceson" maxlength="10" @input="totalson" />
                    </div>
                    <div>
                        <p>支付状态:</p>
                        <select name="example" v-model="statusson">
                            <option value="0">成功</option>
                            <option value="1">失败</option>
                            <option value="2">待支付</option>
                            <option value="3">已取消</option>
                            <option value="4">销售中</option>
                        </select>
                    </div>
                </div>

            </el-dialog>
        </div>
        <!-- 添加编辑弹出框 -->
        <div id="Checkdeleteand" v-show="window">
            <div id="csb_Box">
                <h1>{{ chakant }}</h1>
                <div>
                    <p>数量:</p>
                    <input type="text" name="" id="" value="" v-model="numson" maxlength="5" @input="numberson" />
                </div>
                <div>
                    <p>姓名:</p>
                    <input type="text" name="" id="" value="" v-model="nameson" @input="fullson" />
                </div>
                <div>
                    <p>手机号:</p>
                    <input type="text" name="" id="" value="" v-model="iphoneson" maxlength="11" @input="phoneson" />
                </div>
                <div>
                    <p>地址:</p>
                    <input type="text" name="" id="" value="" v-model="addressson" />
                </div>
                <div>
                    <p>特殊要求:</p>
                    <input type="text" name="" id="" value="" v-model="remarkson" />
                </div>
                <div>
                    <p>买家留言:</p>
                    <input type="text" name="" id="" value="" v-model="liuyanson" />
                </div>
                <div>
                    <p>订单号:</p>

                    <input type="text" name="" id="" value="" v-model="ordercodeson" maxlength="22" @input="Orderson"
                        readonly />
                </div>
                <div>
                    <p>单价:</p>
                    <input type="text" name="" id="" value="" v-model="priceson" maxlength="4" @input="unitpriceson" />
                </div>
                <div>
                    <p>支付状态:</p>
                    <select name="example" v-model="statusson">
                        <option value="0">成功</option>
                        <option value="1">失败</option>
                        <option value="2">待支付</option>
                        <option value="3">已取消</option>
                        <option value="4">销售中</option>
                    </select>
                </div>
                <div>
                    <button @click="gai" v-show="xuiyin" class="button">修改</button>
                    <button v-show="tianjia" @click="addtian" class="button">添加</button><button @click="cancellation"
                        v-show="quxiao" class="button">取消</button>
                </div>
            </div>
        </div>
        <div id="fenye">
            <el-pagination v-model="page" :current-page.sync="page" :page-size.sync="pagelimit" :page-sizes="[1, 3, 5, 10]"
                :small="small" :disabled="disabled" layout="total, sizes, prev, pager, next, jumper"
                :total="applyarray.length" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { forplaypost, forviewpost, foraddpost, fordelpost, } from "../../api/http";
import '@/linglei/buttonStyles.css'
export default {
    data() {
        return {
            dialogVisible: false,

            pagelimitson: "",
            // 添加

            xuiyin: false,
            chakant: "添加",
            numson: "",
            nameson: "",
            iphoneson: "",
            addressson: "",
            remarkson: "",
            liuyanson: "",
            useridson: "90",
            ordercodeson: "",
            priceson: "",
            allpriceson: "190",
            statusson: " ",
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
            currentTime: ''


        }
    },
    mounted() {
        this.updateTime();
        // 每秒更新时间
        setInterval(this.updateTime, 1000);
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

        // 更新时间的方法
        updateTime() {
            const now = new Date();
            this.currentTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => { });
        },

        // 搜索
        handle() {
            const obj = {
                name: this.name,
            };
            forplaypost(obj)
                .then(response => {
                    if (response && response.data && response.data.data) {
                        this.applyarray = response.data.data;
                        console.log(response.data.data);
                        this.totalDataCount = response.data.pagecount; // 更新总数据量
                    } else {
                        this.$message({
                            type: 'error',
                            message: '目前没有这个条数据'
                        });
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '目前没有这个条数据'
                    });
                    error
                });
        },
        // 回显
        gather(id) {
            let data = {
                id: id,
            };
            this.idopu = id
            forviewpost(data).then((res) => {
                this.numson = res.data.num,
                    this.nameson = res.data.name,
                    this.iphoneson = res.data.iphone,
                    this.addressson = res.data.address,
                    this.remarkson = res.data.remark,
                    this.liuyanson = res.data.liuyan,
                    this.useridson = res.data.userid,
                    this.ordercodeson = res.data.ordercode,
                    this.priceson = res.data.price,
                    this.allpriceson = res.data.allprice,
                    this.statusson = res.data.status
            }),
                this.chakant = "编辑",
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
                num: this.numson,
                name: this.nameson,
                iphone: this.iphoneson,
                address: this.addressson,
                remark: this.remarkson,
                liuyan: this.liuyanson,
                userid: this.useridson,
                ordercode: this.ordercodeson,
                price: this.priceson,
                status: this.statusson,
                allprice: this.numson * this.priceson

            };
            console.log(data);
            foraddpost(data, otpy).then((res) => {
                this.xuanran()

                console.log(res);
            });

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
                fordelpost(dataadd).then((res) => {
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
            forplaypost().then((res) => {
                this.applyarray = res.data.data;
                console.log(this.applyarray);
            });
        },
        // 查看
        tanLook(id) {

            let data = {
                id: id,
            };
            forviewpost(data).then((res) => {
                console.log(res.data);
                this.numson = res.data.num,
                    this.nameson = res.data.name,
                    this.iphoneson = res.data.iphone,
                    this.addressson = res.data.address,
                    this.remarkson = res.data.remark,
                    this.liuyanson = res.data.liuyan,
                    this.useridson = res.data.userid,
                    this.ordercodeson = res.data.ordercode,
                    this.priceson = res.data.price,
                    this.allpriceson = res.data.allprice,
                    this.statusson = res.data.status

            });
            this.dialogVisible = true,
                this.quxiao = true,
                this.xuiyin = false,
                this.tianjia = false,
                this.chakant = "查看"
        },

        // 添加判断检验
        // 检验数字
        numberson(input) {
            return input.replace(/\D/g, '');
        },
        // 检验名字
        fullson(input) {
            return input.replace(/[^\u4E00-\u9FA5]/g, ''); // 只保留汉字
        },
        // 检验手机号
        phoneson(input) {
            return input.replace(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, '');
        },
        // 检验订单号
        Orderson(input) {
            return input.replace(/\D/g, '');
        },
        // 检验单价
        unitpriceson(input) {
            return input.replace(/\D/g, '');
        },
        // 检验总价
        totalson(input) {
            return input.replace(/\D/g, '');

        },


        // 添加内容
        addtian() {
            let dataadd = {
                num: this.numberson(this.numson),
                name: this.fullson(this.nameson),
                iphone: this.phoneson(this.iphoneson),
                address: this.addressson,
                remark: this.remarkson,
                liuyan: this.liuyanson,
                status: this.statusson,
                userid: this.useridson,
                ordercode: this.Orderson(this.ordercodeson),
                price: this.unitpriceson(this.priceson),
                allprice: this.numson * this.priceson
            }

            if (
                dataadd.address !== "" &&
                dataadd.remark !== "" &&
                dataadd.status !== ""
            ) {
                if (dataadd.num !== "") {  // 判断数量
                    if (dataadd.name !== "") {  //判断姓名
                        if (dataadd.iphone !== "") { //判断手机号
                            if (dataadd.ordercode !== "") {//判断订单号
                                if (dataadd.price !== "") {//判断单价
                                    foraddpost(dataadd).then((res) => {
                                        this.xuanran()
                                        console.log(dataadd);
                                        console.log(res.data, '1111');
                                    })
                                    this.applyarray.unshift(dataadd);
                                    this.window = false;

                                } else {
                                    this.$message({
                                        message: '请输入正确的单价',
                                        type: 'warning'
                                    });
                                }
                            } else {
                                this.$message({
                                    message: '请输入正确的订单号',
                                    type: 'warning'
                                });
                            }
                        } else {
                            this.$message({
                                message: '请输入正确手机号',
                                type: 'warning'
                            });
                        }
                    } else {
                        this.$message({
                            message: '请名字输入汉字',
                            type: 'warning'
                        });
                    }

                } else {
                    this.$message({
                        message: '请输入正确数量',
                        type: 'warning'
                    });
                }

            } else {
                this.$message({
                    message: '请完成所有输入框',
                    type: 'warning'
                });
            }

        },
        //添加出现表单

        oneincrease() {
            this.numson = "",
                this.nameson = "",
                this.iphoneson = "",
                this.addressson = "",
                this.remarkson = "",
                this.liuyanson = "",
                // this.useridson = "",
                // this.ordercodeson = "",
                this.priceson = "",
                // this.allpriceson = "",
                this.statusson = " ",
                this.xuiyin = false,

                this.chakant = "添加"
            this.quxiao = true,
                this.tianjia = true
            this.window = true;
            this.tiaoyong()
        },
        tiaoyong() {
            const now = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            let arrList = []
            now.split('').forEach(item => {
                if (!isNaN(Number(item)) && item !== ' ') {
                    arrList.push(item)
                }
            })
            this.ordercodeson = arrList.join('') + Math.floor(Math.random() * 900 + 100)
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
#csb_Box_yi {


    div {
        p {
            // margin-left: 20px;
            padding-right: 10px;
            padding-top: 8px;
        }

        input {
            width: 270px;
            height: 35px;
            margin-bottom: 8px;
            margin-right: 10px;
        }

        text-align: center;
        justify-content:space-between;
        display: flex;


        select {
            width: 270px;
            margin-right: 10px;
            height: 35px;
        }

        button {
            width: 70px;
            height: 30px;
            margin-left: 50px;
            margin-top: -50px !important;
        }
    }
}
.button{
    background-image:none !important;
    color: black;
    border: 1px solid gray;
}
#Checkdeleteand {
    #csb_Box {
        h1 {
            font-size: 30px;
            text-align: center;
            padding-top: 10px;
            margin-bottom: 5px;
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
                margin-bottom: 8px;
                margin-right: 10px;
                outline: none;
            }

            text-align: center;
            justify-content:space-between;
            display: flex;


            select {
                width: 270px;
                margin-right: 10px;
                height: 35px;
            }

            button {
                width: 70px;
                height: 35px;
                // margin-left: 50px;
                margin-top: 15px;
            }
        }

        border-radius: 10px;

        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        height: 600px;
        background-color: #f6fdff;
    }

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background-color: #0000004a;
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
    background-color: #f6fdff;
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

#fenye {
    position: absolute;
    z-index: 999;
    bottom: 0px;
    height: 55px;
}

#yeBox {
    width: 100%;
    // height: 50vh;
}

#yeBox::-webkit-scrollbar {
    display: none;
}
.el-button{
    padding: 12px 15px;
}
</style>
