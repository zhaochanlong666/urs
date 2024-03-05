<template>
    <div id="logonBox">
        <div id="logon_Box">
            <div id="logon_zuo">
                <img src="https://img.zcool.cn/community/010f1e5b5d6ccaa801215c8faa2ef1.gif"
                    alt="">
            </div>
            <div id="logon_you">
                <h2>登录</h2>
                <div>
                    <p>账号:</p><input type="text" name="" id="" placeholder="请输入账号" v-model="account">
                </div>
                <div>
                    <p>密码:</p><input type="text" name="" id="" placeholder="请输入密码" v-model="password">
                </div>
                <button @click="logondeng">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import CanvasNest from "canvas-nest.js";


export default {
    data() {
        return {
            account: "",
            password: '',
            config: {
                color: "255, 255, 255",
                opacity: 1,
                zIndex: 5,
                count: 199,
            },
        }
    },
    created() {
        this.$nextTick(() => {
            new CanvasNest(document.getElementById("logonBox"), this.config);
            //找到盒子ID
        });
    },

    methods: {
        logondeng() {
            if (this.account === "15981877149" && this.password === "123") {
                this.$message({
                    message: '恭喜你，进入后台管理',
                    type: 'success'
                });
                sessionStorage.setItem("Zhao", "Zhao");
                this.$router.push("/about");
            } else {
                this.$message.error('错了哦，这是一条错误消息');
            }
        }
    }
}
</script>
<style lang="less" scoped>
#logonBox {
    width: 100%;
    height: 100vh;
    background-color: darkslategray;
    background-size: 100% 100%;

    #logon_Box {
        #logon_zuo {
            width: 50%;
            height: 100%;
            background-color: white;
            border-radius: 10px 0px 0px 10px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 10px 0px 0px 10px;

            }
        }

        @keyframes flow {
            0% {
                background-position: 0% 50%;
            }

            100% {
                background-position: 100% 50%;
            }
        }

        #logon_you {
            width: 50%;
            background-color: rgba(235, 247, 255, 0.374);
            height: 100%;
            border-radius: 0px 10px 10px 0px;

            p {
                padding: 5px;
                padding-right: 5px;
                color: red;
            }
rgb(255, 101, 101)
            input {
                width: 260px;
                height: 35px;
                border-radius: 5px;
                padding-left: 10px;
            }

            h2 {
                font-size: 60px;
                font-weight: bold;
                background-color: rgb(0, 142, 135);
                -webkit-background-clip: text;
                color: transparent;
                animation: flow 3s infinite linear;
                font-size: 40px;
                margin-top: 20px;
                text-align: center;
                margin-bottom: 50px;
            }

            button {
                margin-left: 100px;
                width: 100px;
                height: 40px;
                border-radius: 5px;
            }

            div {
                margin-left: 8px;
                margin-bottom: 20px;
                display: flex;
                input{
                    width: 220px !important;
                    height: 33px;
                }
            }

        }

        display: flex;
        justify-content: space-between;
        width: 650px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        background-color: rgba(245, 245, 220, 0);
    }
}
</style>