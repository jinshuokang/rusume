<template>
    <div id="home" :style="type=='pc'?'maxWidth:375px':''">
		<!-- 顶部图片  -->
        <div class="head-img" v-show="!moreIsShow">
			<img :src="logo" alt="">
            <el-row :class="item.key == 'IMG' ? '' : 'factory-info'"
				v-if="item.key == 'IMG'"
				:span="24"
				v-for="(item, index) in template.JB.generalEntityList"
				:key="index">
				<el-col v-if="item.key == 'IMG'" :span="24" :style="{height: '2rem', marginBottom:'10px'}">
					<img :src="item.value" class="acc-img" style="height:100%;">
				</el-col>
			</el-row>
        </div>
        <div class="code" v-show="!moreIsShow">
            <div class="code-font">溯源码 &nbsp;&nbsp;&nbsp;  {{resumeCode}}</div>
        </div>
		<!-- 内容区域 -->
        <div class="container clearfix" v-show="!moreIsShow">
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
                <el-row :gutter="20" class="icon-info" v-if="template.JB.authenticationBasicInfoList.length > 0">
                    <el-col
						:span="24 / template.JB.authenticationBasicInfoList.length"
						v-for="(item, index) in template.JB.authenticationBasicInfoList"
						:key="index">
						<el-button
						type="text"
						class="ellipsis"
						:class="'factory' + index"
						@click="thirdActive = index">{{item.authenticationName}}</el-button>
					</el-col>
                </el-row>
				<el-row class="icon-info" v-if="template.JB.authenticationBasicInfoList.length > 0">
					<el-col
						class="factory-intro"
						v-show="thirdActive == index"
						:span="24"
						v-for="(item, index) in template.JB.authenticationBasicInfoList"
						:key="index">
						{{item.companyName}}
						<div class="factory-intro-top"
						:style="template.JB.authenticationBasicInfoList.length == 2 ? (index==1 ?'left:60%;':''): (template.JB.authenticationBasicInfoList.length == 3 ? (index==1 ?'left:40%;':(index==2 ?'left:70%;':'')): '')"></div>
					</el-col>
				</el-row>
				<!-- 基本信息 -->
				<el-row :class="item.key == 'IMG' ? '' : 'factory-info'"
					v-show="template.JB.generalEntityList.length > 0 "
					:span="24"
					v-for="(item, index) in template.JB.generalEntityList"
					:key="index">
					<!-- <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col> -->
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
					id="QY"
					v-show="template.QY.generalEntityList > 0 || template.QY.environmentList.length > 0"
					>
					<template slot="title">
						<i class="acc-font QY" :class="activeNames.includes('QY')? 'animation': ''"> 企业信息 </i>
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
				<to-base :toData="{name:'种植信息', class: 'ZZ', activeNames: activeNames, data: template.ZZ}"></to-base>
				<!-- 田间信息  -->
				<to-farm :toData="{data:template.TJ.fieldManageFarmingList, data2:template.TJ.tjArr, activeNames: activeNames}" @viewMore="viewMore"></to-farm>
				<!-- 采收管理  -->
				<to-base :toData="{name:'采收信息', activeNames: activeNames, class: 'CS', data: template.CS}"></to-base>
				<!-- 初加工  -->
				<to-base :toData="{name:'初加工信息', activeNames: activeNames, class: 'CJG', data: template.CJG}"></to-base>
				<!-- 深加工  -->
				<to-base :toData="{name:'深加工信息', activeNames: activeNames, class: 'SJG', data: template.SJG}"></to-base>
				<!-- 包装信息 -->
				<to-base :toData="{name:'包装信息', activeNames: activeNames, class: 'BZ', data: template.BZ}"></to-base>
				<!-- 仓储信息  -->
				<to-base :toData="{name:'原料仓储', activeNames: activeNames, class: 'YCC', data: template.YCC}"></to-base>
				<to-base :toData="{name:'成品仓储', activeNames: activeNames, class: 'CCC', data: template.CCC}"></to-base>
				<!-- 质检信息  -->
				<el-collapse-item
					class="acc-li"
					name="ZJ"
					id="ZJ"
					v-show="template.ZJ[0].generalEntityList.length > 0">
					<template slot="title">
						<i class="acc-font ZJ" :class="activeNames.includes('ZJ')? 'animation': ''"> 质检信息 </i>
					</template>
					<el-row :gutter="20" style="margin-bottom: 20px;">
						<el-col :span="8"
							v-for="(item, index) in template.ZJ"
							:key="index"
						>
						<div
							class="zj-button"
							:class="{ZJactive: index == ZJactive}"
							@click="ZJactive = index"
						>{{111}}
						</div>
						</el-col>
					</el-row>
					<to-zj :toData="{data: template.ZJ[ZJactive]}"></to-zj>
				</el-collapse-item>
			</el-collapse>
        </div>
		<!-- 顶部浮窗 -->
		<div id="float_window" ref="floatDom" v-show="topFloat && !moreIsShow" :style="type=='pc'?'maxWidth:375px':''">
			<ul class="window-content" :style="'width:'+ ( floatInfo.length * (clientW / 4) + 10 ) +'px;'">
				<li
					v-for="(item,index) in floatInfo"
					:key="index"
					ref="topScroll"
					@click="offsetPosition(item.key, index)"
				>
					<span :class="{active: item.key == active}">{{item.value}}</span>
				</li>
			</ul>
		</div>
		<!-- 树更多弹出 -->
		<to-more
			:toData="{data: moreData, show: moreIsShow}"
			@closeMore="closeMore">
		</to-more>
    </div>
</template>

<script>
	import fetch from '@/config/fetch'
	import { isImg, getParams, getType } from '@/config/mUtils'
	//import BScroll from 'better-scroll'
	import toBase from '@/components/common/base'
	import toFarm from '@/components/common/farm'
	import toZj from '@/components/common/zj'
	import toMore from '@/components/common/more'

    export default {
        data() {
            return {
				type:'', // PC or Mobile
				loading: '',    // 加载中......
				logo: '',
				code: '*********', // 溯源码
                name: '山药',       // 名称
				thirdActive: 0, // 第三方显示
				ZJactive: 0,    // 质检信息选中状态
				active: 'QY',   // 顶部浮窗选中状态
				moreIsShow: false, // 树点击判断页面是否显示
				moreData: [],      //跳转到更多传参
				topFloat: false,   // 顶部浮窗何时出现
				resumeCode: 'LL-20180628-000003', //location.search.split('&')[0].split('=')[1],
				templateCode:'RM-20180629-000001',
				baseInfo: [],    //履历基本信息
				activeNames: [],   // 手风琴 展开项
				isClick: false,     // 滑动判断的条件
				moreScrollTop: 0,   // 点击更多获取 滑动距离
				floatInfo:[         // 根据接口动态删除
					{key: 'QY', nameMap: '企业信息', value: '企业信息', isShow: true},
					{key: 'ZZ', nameMap: '种植信息', value: '种植信息', isShow: true},
					{key: 'TJ', nameMap: '田间管理', value: '田间管理', isShow: true},
					{key: 'CS', nameMap: '采收信息', value: '采收信息', isShow: true},
					{key: 'CJG', nameMap: '加工信息', value: '初加工信息', isShow: true},
					{key: 'SJG', nameMap: '加工信息', value: '深加工信息', isShow: true},
					{key: 'BZ', nameMap: '包装信息', value: '包装信息', isShow: true},
					{key: 'YCC', nameMap: '仓储信息', value: '原料仓储', isShow: true},
					{key: 'CCC', nameMap: '仓储信息', value: '成品仓储', isShow: true},
					{key: 'ZJ', nameMap: '质检信息', value:'质检信息', isShow: true}
				],
				moduleDelete: { // 待删除的 key
					'QY': [],
					'ZZ': [],
					'TJ': [],
					'CS': [],
					'CJG': ['加工类型'],
					'SJG': ['加工类型'],
					'BZ': [],
					'YCC': ['仓储内容'],
					'CCC': ['仓储内容'],
					'ZJ': [],
					'JB': ['产品名称','选择企业']
				},
				template: { // lenght == 11  多一个 JB
				/* 基本内容*/		JB: { authenticationBasicInfoList:[], generalEntityList:[] },
				/* 企业信息*/		QY: { environmentList: [], generalEntityList: [] },
				/* 种植信息*/		ZZ: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 田间管理*/		TJ: { fieldManageFarmingList: [],generalEntityList: [], tjArr:[]},
				/* 采收信息*/		CS: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 初加工信息*/		CJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 深加工信息*/		SJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 包装信息*/	    BZ: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 原料仓储信息*/	YCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 成品仓储*/		CCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 质检信息*/		ZJ: [{generalEntityList: []}],
				},
            }
		},
		components: {
			toBase, toFarm, toZj, toMore
		},
		created() {
			this.loading = this.$loading({text:'拼命加载中...'});
			this.type = getType();
		},
		mounted() {
			var that = this;
			window.addEventListener('scroll', that.handleScroll);
			//获取 url 参数
			const params = getParams(window.location.hash.split('?')[1]);
			console.log(params)
			var promiseAll = null;
			// if( JSON.stringify(params) == '{}' ){
			// 	//	关闭加载中
			// 	setTimeout( () => {
			// 		that.loading.close();
			// 	}, 10);
			// 	return;
			// }
			params.resumeCode = params.resumeCode == undefined ? that.resumeCode : params.resumeCode;
			params.templateCode = params.templateCode == undefined ? that.templateCode : params.templateCode;
			if( params.templateCode ){
				promiseAll = () => {
					return	Promise.all( [ fetch('/getDetail/' + params.resumeCode ,{}), fetch('/getTemplateDetail/' + params.templateCode,{}) ] );
				}
			}else{
				promiseAll = () => {
					return	Promise.all( [ fetch('/getDetail/' + params.resumeCode ,{}) ] );
				}
			}
			promiseAll().then( (datas) => {
				var data = datas[0];
				var data2 = datas[1].data || datas[0].data.resumeTemplateDetailList || null;
				console.dir(data)
				console.dir(data2)
				if( data.code != '0000' ) that.$router.push('/Unfind');

				var moduleMap = {};
				// 首先 过滤出所有 type 为2的 key 放入 moduleDelete
				if( data2 != null && JSON.stringify(data2) != '{}' ){
					moduleMap = {
						// moduleFields: 'ALL',
						enterpriseInfoDataDto: 'QY', environmentDataDto: 'QY',
						fieldManageDataDto: 'TJ',
						packingInfoDataDto: 'BZ',
						plantDataDto: 'ZZ',
						processInfoDataDto: 'CJG,SJG',
						qualityInfoDataDto: 'ZJ',
						recoveryInfoDataDto: 'CS',
						warehouseInfoDataDto: 'YCC,CCC',
						basicDataDto:'JB'
					};
					// 大的模块显不显示 floatInfo.isShow
					if ( data2['moduleFields'] && data2['moduleFields'].length > 0 ){
						data2['moduleFields'].forEach( (val, index) => {
							if( val.value == 2) {
								for( let i = 0; i < that.floatInfo.length; i++ ){
									var val2 = that.floatInfo[i];
									if( val.key == val2.nameMap ) {
										that.floatInfo.splice(i, 1);
										i--;
									}
								}
							}
						})
					}
					// 	此处 企业的环境信息 与 企业信息 都放入 QY 的 moduleDelete 中
					//  确保这二者中不能有重复的 key 如果有 这里就要改
					for(var key in data2){
						if ( !data2[key] || data2[key].length == 0 || !Array.isArray(data2[key])) continue;
						data2[key].forEach( (val, index) => {
							if( val.value == 2 && moduleMap[key]){
								var modules = moduleMap[key].split(','); // QY BZ 等等
								that.moduleDelete[modules[0]].push(val.key);
								if( modules[1] ){
									that.moduleDelete[modules[1]].push(val.key)
								}
							}
						} )
					}
				}
				//  ----------    这里已经处理好模块的显示与否 floatInfo 中     ------------------------------
				var list = data.data.resumeList || [];
				list.forEach( (val, index, arr) => {
					Object.keys(val).forEach( (val2, index2) => {
						 //  数组处理
						if ( Array.isArray( val[val2] ) ){
							 for(var i = 0; i < val[val2].length; i++) {
								 if( !val[val2][i] ){
									 val[val2].splice(i, 1);
									 i--;
								 }else{
									 for(var key in val[val2][i]){
										 if( !val[val2][i][key] ) {
											 delete val[val2][i][key];
											 continue;
										 }
										// 如果 '展示引用履历' 为真 则删掉 externalResumeQuoteDtoList && insideResumeQuoteDtoList
										 if( that.moduleDelete[val2] && that.moduleDelete[val2].includes('展示引用履历') ){
											if( key == 'externalResumeQuoteDtoList' ) {
												delete val[val2][i][key];
												continue;
											}
											if( key == 'insideResumeQuoteDtoList') {
												delete val[val2][i][key];
												continue;
											}
										}
										 var imgsArr = [];
										 if( !Array.isArray(val[val2][i][key]) ) continue;
										 for( var j = val[val2][i][key].length - 1; j >= 0; j--){
											 var val3 = val[val2][i][key][j];
											 // val3.key == 被删除数组 就删掉
											if( that.moduleDelete[val2] && that.moduleDelete[val2].includes(val3.key) ){
												val[val2][i][key].splice(j, 1);
												continue;
											}
											 //  key 或 value 为空 就删除这条记录
											 // TODO:
											 if( (val3.hasOwnProperty(key) && !val3.key) || (val3.hasOwnProperty(key) && !val3.value ) ){
												 val[val2][i][key].splice(j, 1);
												 continue;
											 }
											 if( isImg (val3.value) ){
												var deleteArr = val[val2][i][key].splice(j, 1);
												var imgsOne = deleteArr[0].value.split(',');
												imgsArr = imgsArr.concat(imgsOne);
											 }
										 }
										 // 去重
										 imgsArr = imgsArr.filter( (val0,index0,arr0) => {
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
								if( !Array.isArray(val[val2][key]) ) continue;
								var imgsArr = [];
								// JB 基本信息在这里删除 TODO:
								if(val2 == 'JB'){
									if( key == 'authenticationBasicInfoList' &&  that.moduleDelete[val2] && that.moduleDelete[val2].includes('第三方认证') ){
										delete val[val2][key];
										continue;
									}
								}
								// 如果 '展示引用履历' 为真 则删掉 externalResumeQuoteDtoList && insideResumeQuoteDtoList
								if( that.moduleDelete[val2] && that.moduleDelete[val2].includes('展示引用履历') ){
									if( key == 'externalResumeQuoteDtoList' ) {
										delete val[val2][key];
										continue;
									}
									if( key == 'insideResumeQuoteDtoList') {
										delete val[val2][key];
										continue;
									}
								}
								for( var j = val[val2][key].length - 1; j >= 0; j--){
									var val3 = val[val2][key][j];
									// 履历外链接 单独处理
									if( key == 'externalResumeQuoteDtoList' || key == 'insideResumeQuoteDtoList'){
										if( !val3.resumeName  || !val3.resumeURL ){
											val[val2][key].splice(j, 1);
											continue;
										}
										// 田间管理单独处理
									}else if( key == 'fieldManageFarmingList'){
										that.template.TJ.tjArr = JSON.parse(JSON.stringify(val[val2][key]));
										for( var x = 0; x < val[val2][key].length; x++) {
											var farm = val[val2][key][x];
											if( farm.generalEntityList && Array.isArray( farm.generalEntityList )){
												var imgsArr = [];
												for(var y = farm.generalEntityList.length - 1; y >= 0 ; y--){
													var val4 = farm.generalEntityList[y];
													if(!val4.key || !val4.value){
														farm.generalEntityList.splice(y, 1);
														continue;
													}
													if( isImg (val4.value) ){
														var deleteArr = farm.generalEntityList.splice(y, 1);
														var imgsOne = deleteArr[0].value.split(',');
														imgsArr = imgsArr.concat(imgsOne);
													}
												}
												// 去重
												imgsArr = imgsArr.filter( (val0,index0,arr0) => {
													return arr0.indexOf(val0) == index0;
												})
												// 循环结束 unshift 图片
												for( let z = imgsArr.length - 1; z >= 0 ; z-- ){
													val[val2][key].unshift({key:'IMG', value: imgsArr[z]});
												}
											}
										}
										continue;
									// 删除之前 拿到想要的数据
									}else if( val2 == 'JB' &&  val3.key == '产品名称' ){
										that.name = val3.value || '';
									// val3.key == 被删除字段
									}else if( that.moduleDelete[val2] && that.moduleDelete[val2].includes(val3.key) ){
										val[val2][key].splice(j, 1);
										continue;
									// key 或 value 为空 就删除这条记录
									}else if( (val3.hasOwnProperty(key) && !val3.key) || (val3.hasOwnProperty(key) && !val3.value ) ){
										val[val2][key].splice(j, 1);
										continue;
									}
									if( isImg (val3.value) ){
										var deleteArr = val[val2][key].splice(j, 1);
										if( val3.key == '企业logo' ){
											that.logo = val3.value;
										}else{
											var imgsOne = deleteArr[0].value.split(',');
											imgsArr = imgsArr.concat(imgsOne);
										}
									}
								}
								// 去重
								imgsArr = imgsArr.filter( (val0,index0,arr0) => {
									return arr0.indexOf(val0) == index0;
								})
								// 循环结束 unshift 图片     企业 logo 单独处理
								for( let z = imgsArr.length - 1; z >= 0 ; z-- ){
									val[val2][key].unshift({key:'IMG', value: imgsArr[z]});
								}
							}
						}
						// data 赋值
						//that.template[val2] = val[val2];
						Object.assign( that.template[val2], val[val2] );
					})
				})
				// 这里判断 template 如果内容 就 将 floatInfo 中的 删掉
				for(var i = 0; i < that.floatInfo.length; i++){
					var val = that.floatInfo[i];
					// 企业 特殊处理
					if( val.key == 'QY' ){
						if( that.template.QY.environmentList.length == 0 && that.template.QY.generalEntityList == 0 ){
							that.floatInfo.splice(i, 1);
							i--;
						}
					// 田间 特殊处理
					}else if( val.key == 'TJ' ){
						if ( that.template.TJ.fieldManageFarmingList.length == 0 || that.template.TJ.fieldManageFarmingList[0].generalEntityList.length == 0 ){
							that.floatInfo.splice(i, 1);
							i--;
						}
					// 质检 特殊处理
					}else if( val.key == 'ZJ' ){
						if( that.template.ZJ[0].generalEntityList.length == 0 ) {
							that.floatInfo.splice(i, 1);
							i--;
						}
					// 其他公共模块
					}else {
						if( that.template[val.key].generalEntityList.length == 0 ){
							that.floatInfo.splice(i, 1);
							i--;
						}
					}
				}

				//关闭加载中
				setTimeout( () => {
					that.loading.close();
				},10);
			}).catch( (res) => {
				//	关闭加载中
				console.log(res);
				setTimeout( () => {
					that.loading.close();
				},10);
				//that.$router.push('/Unfind');
			})
		},
        computed: {
			clientW: function() {
				return this.type == 'pc' ? 375 : document.documentElement.clientWidth;
			}
        },
        methods: {
			// 树苗更多点击
			viewMore(index){
				this.moreScrollTop = document.documentElement.scrollTop;
				this.moreIsShow = true;
				this.moreData = this.template.TJ.fieldManageFarmingList[index];
			},
			// 关闭更多
			closeMore() {
				this.moreIsShow = false;
				this.$nextTick( () => {
					document.documentElement.scrollTop = this.moreScrollTop;
				})
			},
			// 中间模块下拉点击
			handleChange(val) {
				this.isClick = true;
				this.activeNames = val;
				// 下拉动画完成后 放开限制
				setTimeout( () => {
					this.isClick = false;
				}, 600)
			},
			// 滑动监听
			handleScroll(e){
				if (this.isClick) return;
				// 页面滑动距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				// 元素距离顶部距离
				let offsetTop = document.querySelector('#QY').offsetTop;
				// 页面可视区域高度
				var clientHeight = document.documentElement.clientHeight;
				if (scrollTop + (clientHeight / 2) > offsetTop) this.topFloat = true;
				else this.topFloat = false;
				if( this.topFloat ) {
					this.floatInfo.forEach( (val, index) => {
						var ele = document.querySelector('#' + val.key);
						if( ele ){
							// 元素高度
							var eleHeight = ele.offsetHeight;
							// 元素距离顶部距离 根据父元素
							var eleOffset = ele.offsetTop;
							// 浮窗元素 选中状态
							if( eleOffset + eleHeight > scrollTop &&  eleOffset <= (clientHeight/2 + scrollTop) ){
								this.active = val.key;
								var oneWidth = this.clientW / 4;
								var topTarget = this.$refs.topScroll[index];
								var offsetL = topTarget.offsetLeft;
								if( offsetL > this.clientW / 4 * 2 + 10 ) {
									this.$refs.floatDom.scrollLeft = offsetL - ( this.clientW / 4 * 2 );
								}else if( offsetL < this.clientW * 4 ){
									this.$refs.floatDom.scrollLeft = 0;
								}
							}
						}
					})
				}
			},
			//顶部浮窗点击
			offsetPosition(id, index) {
				this.isClick = true;
				this.active = id;
				var target = document.querySelector('#' + id);
				if( !target ||  !target.offsetTop ) return;
				let offsetT = target.offsetTop - 60;
				document.documentElement.scrollTop = offsetT;
				this.isClick = false;
			}
			// offsetPosition(id) {
			// 	this.isClick = true;
			// 	this.active = id;
			// 	let offset = document.querySelector('#' + id).offsetTop - 100;
			// 	var gap = Math.abs( document.documentElement.scrollTop - offset);
			// 	var one = gap / 100;
			// 	var timer = setInterval(function(){
			// 		if ( document.documentElement.scrollTop > offset ) {
			// 			var pice = document.documentElement.scrollTop - one;
			// 			document.documentElement.scrollTop = pice;
			// 			console.log(one)
			// 			console.log(document.documentElement.scrollTop)
			// 		}else if(document.documentElement.scrollTop < offset){
			// 			document.documentElement.scrollTop += one;
			// 			console.log(one)
			// 			console.log(document.documentElement.scrollTop)
			// 		}else if(document.documentElement.scrollTop == offset){
			// 			this.isClick = false;
			// 			clearInterval(timer);
			// 		}
			// 	}, 16.7)
			// }
		},
		destroyed () {
			// 移除 window 事件
			window.removeEventListener('scroll', this.handleScroll)
		}
    }
</script>

<style lang="scss">
    @import '../assets/style/mixin';
	// 1rem = 100px  设计稿为 375px

	// @function px2Rem($px){
    //     @return $px/100px * 1rem
	// }
	#home {
		margin: 0 auto;
	}
	.head-img {
		width:3.75rem;
		position: relative;
		>img {
			position: absolute;
			top: .2rem;
			left: .2rem;
			width: .5rem;
			z-index:999;
		}
	}
	#float_window {
		background: #FFF;
		position: fixed;
		top: 0;
		height: .5rem;
		width: 100%;
		z-index:99999;
		overflow-x: scroll;
		white-space: nowrap;
		.window-content {
			//width: 400%;
			height: .5rem;
			white-space: nowrap;
			li {
				float: left;
				margin: .16rem 0;
				width: .94rem;
				line-height: .2rem;
				font-size: .14rem;
				text-align: center;
			}
			.active {
				color: $color;
				border-bottom: 2px solid $color;
			}
		}
	}
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
		.el-button {
			padding-top: .12rem;
			padding-bottom: .12rem;
		}
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
			@include bis('~@/assets/images/tag.png');
			background-size: .14rem .14rem;
			background-position: .06rem center;
		}
		/* elkement-ui 样式修改 end */
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
			button.factory0 span{
				@include bis('~@/assets/images/factory-1.png');
			}
			button.factory1 span{
				@include bis('~@/assets/images/factory-2.png');
			}
			button.factory2 span{
				@include bis('~@/assets/images/factory-3.png');
			}
			button.ellipsis span {
				padding-left: .22rem;
				background-size: .16rem .18rem;
				height: .2rem;
				font-size: .14rem;
			}
			.factory-intro {
				width: 100%;
				background-color: #ededed;
				color:#666;
				text-align: left;
				@include bR(4px);
				padding: .05rem 10px;
				position: relative;
				.factory-intro-top {
					position: absolute;
					width:15px;
					height:7px;
					top: -7px;
					left: 8%;
					@include bis('~@/assets/images/cart.png');
				}
				.factory-intro-top2{
					left: 20px;
				}
			}
		}
		.LL-button {
			width: 1.04rem;
			height: .3rem;
			line-height: .3rem;
			font-size: .14rem;
			padding: 0 0 0 .22rem;
			// @include bis('~@/assets/images/tag.png');
			// background-size: .14rem .14rem;
			// background-position: .06rem center;
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
		.zj-button {
			text-align: center;
			height: .34rem;
			line-height: .34rem;
			color: #54be9d;
			background-color: rgba(86,190,159,0.12);
			font-size: .16rem;
			margin-bottom:16px;
		}
		div.ZJactive {
			color:#FFF;
			background-color: #56be9f;
		}
	}
	.factory-info {
		font-size: .16rem;
		padding: .2rem 0;
		//height: .6rem;
		line-height: .2rem;
		border-bottom: 1px dashed $color2;
	}
	.accordion-list {
		font-size: .18rem;
		width: 3.46rem;
		margin: 0 auto;
		.acc-li{
			margin: .08rem 0;
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
			transition: transform .4s;
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
		margin-bottom: 10px;
	}
</style>