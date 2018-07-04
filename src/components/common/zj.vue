<template>
    <!-- 质检信息 基本模版 -->
    <div>
        <el-row
            class="acc-row"
            :class="item.key == 'IMG' ? '' : 'factory-info'"
            v-show="toData.data.generalEntityList.length > 0"
            v-for="(item, index) in toData.data.generalEntityList"
            :key="index">
            <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
            <el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
            <el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
        </el-row>
        <!-- 链接履历跳转  -->
        <el-row class="acc-row factory-info"
            v-if="(toData.data.insideResumeQuoteDtoList && toData.data.insideResumeQuoteDtoList.length > 0) || (toData.data.externalResumeQuoteDtoList && toData.data.externalResumeQuoteDtoList.length > 0)"
        >
            <el-button type="success" class="LL-button" plain
                v-for="(item, index) in toData.data.insideResumeQuoteDtoList"
                :key="item.resumeURL + index"
            >
                <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a>
            </el-button>
            <el-button type="success" class="LL-button" plain
                v-for="(item, index) in toData.data.externalResumeQuoteDtoList"
                :key="item.resumeURL + index"
            >
                <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a>
            </el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: ['toData'],
        data() {
            return {
            }
        },
    }
</script>

<style>

</style>