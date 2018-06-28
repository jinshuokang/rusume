<template>
    <div id="home">
        <div>
            <img src="" alt="">
        </div>
        <div class="code">
            <div class="code-font">溯源码 &nbsp;&nbsp;&nbsp;  {{code}}</div>
        </div>
        <div class="container clearfix">
            <div class="intro">
                <div class="intro-name">{{name}}</div>
            </div>
			<!-- 开始基本信息  -->
            <div class="intro-content clear">
                <div class="bg-connect">
                    <div class="bg-connect-left left"></div>
                    <div class="bg-connect-right right"></div>
                </div>
				<!-- 第三方企业认证 -->
                <el-row :gutter="20" class="icon-info">
                    <el-col
						v-show="template.JB.authenticationBasicInfoList.length > 0 "
						:span="24 / template.JB.authenticationBasicInfoList.length"
						v-for="(item, index) in template.JB.authenticationBasicInfoList"
						:key="index">
						<el-popover
							placement="bottom"
							title="111"
							v-model="factoryIsShow"
							width="100"
							trigger="click"
						>
							<p>{{item.authenticationName}}</p>
							<el-button slot="reference" type="text" class="factory-1 ellipsis">{{item.companyName}}</el-button>
						</el-popover>
					</el-col>
                </el-row>
				<!-- 基本信息 -->
				<el-row :class="item.key == 'IMG' ? '' : 'factory-info'"
					v-show="template.JB.generalEntityList.length > 0 "
					:span="24"
					v-for="(item, index) in template.JB.generalEntityList"
					:key="index">
					<el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
                    <el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
                    <el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
                </el-row>
            </div>
			<!-- 折叠开始 -->
			<el-collapse @change="handleChange" v-model="activeNames" class="accordion-list">
				<!-- 企业信息  -->
				<el-collapse-item
					class="acc-li"
					name="QY"
					v-show="template.QY.generalEntityList > 0 || template.QY.environmentList.length > 0"
					>
					<template slot="title">
						<i class="acc-font QY" :class="QYA"> 企业信息 </i>
					</template>
					<!-- 企业基本信息 -->
					<el-row
						class="acc-row"
						:class="item.key == 'IMG' ? '' : 'factory-info'"
						v-show="template.QY.generalEntityList.length > 0"
						v-for="(item, index) in template.QY.generalEntityList"
						:key="index">
						<el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
						<el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
						<el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
                	</el-row>
					<div class="env-info" v-show="template.QY.environmentList.length > 0">
						<span class="env-info-pointer"></span><span class="env-info-line"></span>
						<span class="env-info-font">环境信息</span>
						<span class="env-info-line"></span><span class="env-info-pointer"></span>
					</div>
					<!-- 环境信息 -->
					<el-row
						class="acc-row factory-info"
						v-show="template.QY.environmentList.length > 0"
						v-for="item in template.QY.environmentList"
						:key="item.key">
						<el-col :span="12"><div class="left ellipsis">{{item.key}}</div></el-col>
						<el-col :span="12"><div class="right ellipsis t">{{item.value}}</div></el-col>
                	</el-row>
				</el-collapse-item>
				<!-- 种植信息  -->
				<to-base :toData="{name:'种植', class: 'ZZ', data: template.ZZ}"></to-base>
				<!-- 田间信息  -->
				<!-- <el-collapse-item class="acc-li" name="CS" v-show="template.CS.length > 0">
					<template slot="title">
						<i class="acc-font CS"> 田间信息 </i>
					</template>
					<el-row class="acc-row factory-info" v-for="(item, index) in template.CS" :key="index">
						<el-col :span="12"><div class="left ellipsis">{{Object.keys(item)[0]}}</div></el-col>
						<el-col :span="12"><div class="right ellipsis">{{item[Object.keys(item)[0]]}}</div></el-col>
                	</el-row>
				</el-collapse-item> -->
				<!-- 采收管理  -->
				<to-base :toData="{name:'采收', class: 'CS', data: template.CS}"></to-base>
				<!-- 初加工  -->
				<to-base :toData="{name:'初加工', class: 'CJG', data: template.CJG}"></to-base>
				<!-- 深加工  -->
				<to-base :toData="{name:'深加工', class: 'SJG', data: template.SJG}"></to-base>
				<!-- 包装信息 -->
				<to-base :toData="{name:'包装', class: 'BZ', data: template.BZ}"></to-base>
				<!-- 仓储信息  -->
				<to-base :toData="{name:'原料仓储', class: 'YCC', data: template.YCC}"></to-base>
				<to-base :toData="{name:'成品仓储', class: 'CCC', data: template.CCC}"></to-base>
				<!-- 质检信息  -->
				<!-- <el-collapse-item class="acc-li" name="ZJ" v-show="template.ZJ.length > 0">
					<template slot="title">
						<i class="acc-font ZJ"> 质检信息 </i>
					</template>
					<el-row class="acc-row factory-info" v-for="(item, index) in template.ZJ" :key="index">
						<el-col :span="12"><div class="left ellipsis">{{Object.keys(item)[0]}}</div></el-col>
						<el-col :span="12"><div class="right ellipsis">{{item[Object.keys(item)[0]]}}</div></el-col>
                	</el-row>
				</el-collapse-item> -->
			</el-collapse>
        </div>
    </div>
</template>

<script>
	import fetch from '@/config/fetch'
	import { isImg } from '@/config/mUtils'
	import toBase from '@/components/base'

    export default {
        data() {
            return {
				factoryIsShow: false,
				factoryIsShow2: false,
				paramsCode: 'LL-20180627-000006', //location.search.split('&')[0].split('=')[1],
				resumeList: [],  //履历基本信息
				template: {
				/* 基本内容*/		JB: { authenticationBasicInfoList:[], generalEntityList:[] },
				/* 企业信息*/		QY: { environmentList: [], generalEntityList: [] },
				/* 种植信息*/		ZZ: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 田间管理*/		TJ: [],
				/* 采收信息*/		CS: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 初加工信息*/		CJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 深加工信息*/		SJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 包装信息*/	    BZ: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 原料仓储信息*/	 YCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 成品仓储*/		CCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 质检信息*/		ZJ: [],
				},
				activeNames: [],
                name: '山药',
				code: '1231232131231231',
            }
		},
		components: {
			toBase
		},
		mounted: function(){
			var that = this;
			fetch('/getDetail/' + this.paramsCode ,{}).then(function(data){
				// 失败 跳转 404 页面
				if( data.code != '0000' ) that.$router.push('/Unfind');

				var list = data.data.resumeList;
				list.forEach(function(val, index, arr){
					Object.keys(val).forEach(function(val2, index2){
						 //  数组处理
						if ( Array.isArray( val[val2] ) ){
							 for(var i = 0; i < val[val2].length; i++) {
								 if( !val[val2][i] ){
									 delete val[val2][i];
								 }else{
									 for(var key in val[val2][i]){
										 if( val[val2][i][key].length == 0 || !val[val2][i][key] ) {
											 delete val[val2][i][key];
											 continue;
										 }
										 var imgsArr = [];
										 if( !Array.isArray(val[val2][i][key]) ) continue;
										 for( var j = val[val2][i][key].length - 1; j >= 0; j--){
											 var val3 = val[val2][i][key][j];
											 //  key 或 value 为空 就删除这条记录
											 // TODO:  这里范围太大 对象没 key  就删掉一个 是错误的
											 if( !val3.key  || !val3.value ){
												 val[val2][i][key].splice(j, 1);
											 }
											 if( isImg (val3.value) ){
												var deleteArr = val[val2][i][key].splice(j, 1);
												imgsArr = deleteArr[0].value.split(',');
											 }
										 }
										 // 去重
										 imgsArr = imgsArr.filter(function(val0,index0,arr0){
											return arr0.indexOf(val0) == index0;
										 })
										 // 循环结束 unshift 图片
										 for( let z = imgsArr.length - 1; z >= 0 ; z-- ){
											val[val2][i][key].unshift({key:'IMG', value: imgsArr[z]});
										 }
									 }
								 }
							 }
						}
						// 对象处理
						if( Object.prototype.toString.call( val[val2] ) == '[object Object]' ){
							for( var key in val[val2] ) {
								if( !val[val2][key] || val[val2][key].length == 0 ){
									delete val[val2][key]
									continue;
								}
								var imgsArr = [];
								if( !Array.isArray(val[val2][key]) ) continue;
								for( var j = val[val2][key].length - 1; j >= 0; j--){
									var val3 = val[val2][key][j];
									// 履历外链接 单独处理
									if( key == 'externalResumeQuoteDtoList' || key == 'insideResumeQuoteDtoList'){
										if( !val3.resumeName  || !val3.resumeURL ){
											val[val2][key].splice(j, 1);
										}
										//  key 或 value 为空 就删除这条记录
									}else if( !val3.key || !val3.value ){
										val[val2][key].splice(j, 1);
									}
									if( isImg (val3.value) ){
										var deleteArr = val[val2][key].splice(j, 1);
										imgsArr = deleteArr[0].value.split(',');
									}
								}
								// 去重
								imgsArr = imgsArr.filter(function(val0,index0,arr0){
									return arr0.indexOf(val0) == index0;
								})
								// 循环结束 unshift 图片
								for( let z = imgsArr.length - 1; z >= 0 ; z-- ){
									val[val2][key].unshift({key:'IMG', value: imgsArr[z]});
								}
							}
						}
						// data 赋值
						that.template[val2] = val[val2];
						console.dir(val[val2])
					})

				})
			})
			// .catch(function(data){
			// 	// 失败 跳转 404 页面
			// 	if( data.code != '0000' ) that.$router.push('/Unfind');
			// })
		},
        computed: {
			QYA: function() {
				return {
					animation: this.activeNames.includes('QY')
				}
			}
        },
        methods: {
			handleChange(val) {
				this.activeNames = val;
			}
		}
    }
</script>

<style lang="scss">
    @import '../assets/style/mixin';
	// 1rem = 100px  设计稿为 375px

	// @function px2Rem($px){
    //     @return $px/100px * 1rem
    // }
	.animation {
		transform: translate(1.06rem, 0);
	}
    .code {
        @include wh(100%, .69rem);
        position: relative;
        @include bis('~@/assets/images/bg-code.png');
        .code-font{
            @include center();
            @include wh(100%, .69rem);
            line-height: .69rem;
            font-size: .17rem;
            text-align: center;
        }
    }
    .container {
		/* element-ui 样式修改 begin */
		.el-collapse {
			border: 0;
		}
		.el-collapse-item__header {
			height: .48rem;
			line-height: .48rem;
			font-size: .16rem;
		}
		.el-collapse-item__arrow {
			line-height: .48rem;
		}
		.el-popover {
			height: .2rem;
			line-height: .2rem;
			font-size: .14rem;
			background: #ededed;
			@include bR(4px);
		}
		.el-button--success.is-plain {
			border-color: rgba(86, 190, 158, .54);
			background-color: rgba(88, 191, 159,.05);
		}
		/* element-ui 样式修改 end */
        padding: 20px 0;
        background: $color;
        .intro {
            margin: 0 auto;
            @include wh(3.46rem, .7rem);
            @include bR(9px);
			@include bis('~@/assets/images/bg-name.png');
			background-color: #fff;
			background-size: 80%;
			background-position: center center;
            position: relative;
            .intro-name {
                font-size: .24rem;
                @include center();
                color: $color;
                font-weight: bold;
            }
        }
        .bg-connect {
			div{
				position: absolute;
				top: -0.28rem;
				@include wh(.06rem, .4rem);
				@include bis('~@/assets/images/connect.png');
				background-size: .06rem .4rem;
			}
            .bg-connect-left{
				left: 20px;
			}
			.bg-connect-right{
				right: 20px;
            }
        }
        .intro-content {
			margin: 20px auto;
			width: 3.46rem;
            background-color: #fff;
            padding: .2rem;
            @include bR(9px);
            position: relative;

		}
		.icon-info {
			font-size: .14rem;
			margin-bottom: .2rem;
			button span {
				padding-left: .22rem;
				@include bis('~@/assets/images/factory-2.png');
				background-size: .16rem .18rem;
				height: .2rem;
				font-size: .14rem;
			}
		}
		.factory-info {
			font-size: .16rem;
			padding: .2rem 0;
			//height: .6rem;
			line-height: .2rem;
			border-bottom: 1px dashed $color;
		}
		.accordion-list {
			font-size: .18rem;
			width: 3.46rem;
			margin: 0 auto;
			.acc-li{
				margin: 10px 0;
				padding: 0 .2rem;
				background-color: #fff;
				@include bR(9px);
				.QY {
					@include bis('~@/assets/images/factory.png');
				}
				.CJG {
					@include bis('~@/assets/images/process.png');
				}
				.SJG {
					@include bis('~@/assets/images/process.png');
				}
				.TJ {
					@include bis('~@/assets/images/farm.png');
				}
				.ZJ {
					@include bis('~@/assets/images/quality.png');
				}
				.ZZ {
					@include bis('~@/assets/images/plant.png');
				}
				.CCC {
					@include bis('~@/assets/images/ware.png');
				}
				.YCC {
					@include bis('~@/assets/images/ware.png');
				}
				.CS {
					@include bis('~@/assets/images/reward.png');
				}
				.BZ {
					@include bis('~@/assets/images/package.png');
				}

			}
			.acc-font{
				display: inline-block;
				position: relative;
				padding-left:.3rem;
				background-size: .2rem .2rem!important;
				background-position: left center;
				transition: transform .5s;
			}
			.acc-row .t {
				width: 100%;
				text-align: right;
			}
			.env-info {
				text-align: center;
				height: .3rem;
				line-height: .3rem;
				margin: .3rem 0;
				.env-info-pointer {
					border: .036rem solid $color;
					display: inline-block;
				}
				.env-info-line {
					width: .3rem;
					height: .02rem;
					position: relative;
					bottom:.028rem;
					background: $color;
					display:inline-block;
				}
				.env-info-font {
					font-size: .18rem;
					display: inline-block;
					margin: 0 .2rem;
				}
			}
		}
		.acc-img {
			width:100%;
			margin-bottom: 20px;
		}
		.LL-button {
			width: 1.04rem;
			height: .3rem;
			line-height: .3rem;
			font-size: .14rem;
			padding: 0 0 0 .22rem;
			@include bis('~@/assets/images/tag.png');
			background-size: .14rem .14rem;
			background-position: .06rem center;
			margin: 0 20px 20px 0;
			span {
				color: $color;
			}
		}
		.LL-href {
			width: 100%;
			height: .3rem;
			display: inline-block;
		}
    }
</style>