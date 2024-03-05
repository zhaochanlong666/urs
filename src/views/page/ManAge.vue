<template>
    <div id="Mate_Box">
        <div class="Mate_left">
            <el-upload class="upload-demo" ref="upload" action="#" :on-change="handlePreview" :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

            </el-upload>
        </div>

        <div class="Mate_right">
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column label="素材" width="240">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px"></span>
                        <img class="Mate_img" :src="'https://testshool.zzgoodqc.cn' + scope.row.imgurl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="类别" width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.type == '1' ? '分类' : '服务' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { dispicture, addpicture, uplpicture, deipicture } from '@/api/http'
import '@/linglei/buttonStyles.css'

export default {
    data() {
        return {
            fileList: [],
            //素材渲染数组
            tableData: [
                {
                    imgurl: '',
                    type: '',
                    id: ''
                },
            ],
            //上传时转换成Base64的图片路径字段
            imgurl: ""
        }
    },
    created() {
        this.RenderPage()
    },

    methods: {
        //渲染素材库
        RenderPage() {
            dispicture().then(res => {
                this.tableData = res.data.data
            })
        },

        //添加图片
        submitUpload() {
            if (!this.imgurl) {
                // 如果图片地址为空，即用户未选择任何图片
                this.$message({
                    type: 'warning',
                    message: '请先选择要上传的图片'
                });
                return; // 终止上传操作
            }

            addpicture({ imgurl: this.imgurl }).then(res => {
                console.log(res);
                if (res.code === 0) {
                    this.RenderPage();
                    this.$message({
                        type: 'success',
                        message: '上传服务器成功!'
                    });
                } else if (res.code === 2) {
                    this.$message({
                        type: 'info',
                        message: '上传失败，数据不能为空'
                    });
                }
            });
        }

        ,


        //图片添加时获取路径
        handlePreview(file) {
            this.getBase64(file.raw).then(resBase64 => {
                uplpicture({ imgurl: resBase64 }).then(res => {
                    this.imgurl = res.data.url
                })
            })
        },

        //转换base64
        getBase64(file) {
            // 判断如果没有选择文件提醒他先择文件
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                let fileResult = "";
                reader.readAsDataURL(file);
                //开始转
                reader.onload = function () {
                    fileResult = reader.result;
                };
                //转 失败
                reader.onerror = function (error) {
                    reject(error);
                };
                //转 结束  咱就 resolve 出去
                reader.onloadend = function () {
                    resolve(fileResult);
                };
            });
        },

        handleEdit(index, row) {
            console.log(index, row);
        },
        //删除按钮
        handleDelete(row) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deipicture({ id: row.id }).then(res => {
                    console.log(res);
                    this.RenderPage()
                })
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

        }
    }
}
</script>

<style scoped lang="less">
.upload-demo {
    text-align: left;
    line-height: 0;

    button {
        margin-top: 30px;
        margin-bottom: 20px;
        margin-left: 30px;
    }
}

#Mate_Box .Mate_right::-webkit-scrollbar {
    display: none;
}

#Mate_Box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    /* 隐藏滚动条 */

    .Mate_left {
        width: 30%;
        height: 100%;
    }

    .Mate_right {
        overflow: auto !important;

        width: 60%;
        height: 100%;

        img {
            width: 100px;
            height: 100px;
        }
    }
}

.el-table__cell {
    height: 80px !important;
}
</style>

