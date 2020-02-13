<template>
    <div class="about">
        <h1>{{ id ? '编辑' : '新建' }}分类</h1>
        <el-form label-width="30px" @submit.native.prevent="save">
            <el-form-item lebel="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        // 目的： 为了解耦路由参数
        id: {}
    },
    data () {
        return {
            model: {}
        }
    },
    methods: {
        // 创建分类，使用了 async/await 语法
        async save () {
            if (this.id) {
                await this.$http.put(`categories/${this.id}`, this.model);
            } else {
                await this.$http.post('categories', this.model);
            }
            this.$router.push('/categories/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch () {
            const res = await this.$http.get(`categories/${this.id}`)
            this.model = res.data
        }
    },
    created () {
        this.id && this.fetch()
    }
}
</script>