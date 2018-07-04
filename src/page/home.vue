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
						:style="template.JB.authenticationBasicInfoList.length == 2 ? (index==1 ?'left:60%;':''): (template.JB.authenticationBasicInfoList.length == 3 ? (index==1 ?'left:44%;':(index==2 ?'left:80%;':'')): '')"></div>
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
								@click="ZJactive = index">{{item.activeName}}
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
	import { isImg, getParams, getType, throttle, getModuleType } from '@/config/mUtils'
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
				resumeCode: 'LL-20180703-000002', // 默认码
				templateCode:'RM-20180629-000001',
				baseInfo: [],    //履历基本信息
				activeNames: [],   // 手风琴 展开项
				isClick: false,     // 滑动判断的条件
				moreScrollTop: 0,   // 点击更多获取 滑动距离
				floatInfo:[         // 根据接口动态删除
					{key: 'QY', nameMap: '企业信息', value: '企业信息', isShow: true}, // isShow 其实可以不要
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
				/* 田间管理*/		TJ: { fieldManageFarmingList: [{generalEntityList:[]}],generalEntityList: [], tjArr:[]},
				/* 采收信息*/		CS: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 初加工信息*/		CJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 深加工信息*/		SJG: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 包装信息*/	    BZ: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 原料仓储信息*/	YCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 成品仓储*/		CCC: { generalEntityList: [], insideResumeQuoteDtoList: [], externalResumeQuoteDtoList: [] },
				/* 质检信息*/		ZJ: [{generalEntityList: [], activeName: ''}],
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
			window.addEventListener('scroll', throttle(that.handleScroll, 300, 500));
			//获取 url 参数
			const params = getParams(window.location.hash.split('?')[1]);
			var promiseAll = null;
			//   真正上线 打开这个
			if( JSON.stringify(params) == '{}' ){
				//	关闭加载中
				setTimeout( () => {
					that.loading.close();
					that.$router.push('/Unfind');
				}, 10);
				return;
			}
			that.resumeCode = params.resumeCode;
			// params.resumeCode = params.resumeCode == undefined ? that.resumeCode : params.resumeCode;
			// params.templateCode = params.templateCode == undefined ? that.templateCode : params.templateCode;
			if( params.templateCode ){ // 预览
				if( params.resumeCode == 'xxxxxxxxxxxxxxxxxxxx' || !params.resumeCode ) {
					promiseAll = () => {
						return	Promise.all( [ 'x', fetch('/getTemplateDetail/' + params.templateCode,{}) ] );
					}
				}else {
					promiseAll = () => {
						return	Promise.all( [ fetch('/getDetail/' + params.resumeCode ,{}), fetch('/getTemplateDetail/' + params.templateCode,{}) ] );
					}
				}
			}else { // 扫码
				promiseAll = () => {
					return	Promise.all( [ fetch('/getDetail/' + params.resumeCode ,{}) ] );
				}
			}
			promiseAll().then( (datas) => {
				var data = datas[0];
				// 如果为空或者20个 x  则使用固定数据;
				if( data == 'x' ) {
					data = '{"code":"0000","message":"访问成功","data":{"resumeList":[{"JB":{"generalEntityList":[{"key":"产品名称","value":"111222","type":1},{"key":"基原名称","value":"","type":1},{"key":"部位","value":"","type":1},{"key":"规格","value":"","type":1},{"key":"生产模式","value":"","type":7},{"key":"生产标准","value":"","type":1},{"key":"简要介绍","value":"","type":1},{"key":"选择企业","value":"QY-20180702-000006","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180611/152871984691041ebb.jpg","type":1}],"authenticationBasicInfoList":[],"enterpriseInfoCode":"QY-20180702-000006","enterpriseName":"上药华宇（平邑）中药资源有限公司"}},{"QY":{"generalEntityList":[{"key":"企业名称","value":"上药华宇（平邑）中药资源有限公司","type":1},{"key":"企业位置","value":"山东临沂市平邑县","type":1},{"key":"统一社会信用代码","value":"91110117696389412O","type":1},{"key":"负责人","value":"谈景福","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/153050147042089c9c.jpg,http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/1530501493021273c9.jpg","type":1},{"key":"企业logo","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/1530499683909bcad7.png","type":1}],"environmentList":[{"key":"使用水源","value":"池塘水,农业设施用水,自然降雨","type":1},{"key":"地形","value":"丘陵","type":1},{"key":"海拔","value":"100M","type":1},{"key":"土壤类型","value":"沙壤土","type":1},{"key":"土壤酸碱度","value":"弱碱性","type":1},{"key":"气候类型","value":"亚热带季风气候","type":1},{"key":"年降雨量","value":"1111mm","type":1},{"key":"年平均温度","value":"20℃","type":1}]}},{"TJ":{"generalEntityList":[{"key":"农事展示时段","value":"2018-06-07,2018-07-26","type":5},{"key":"种植批次号","value":"ZZ-20180702-000008","type":1}],"fieldManageFarmingList":[{"generalEntityList":[{"key":"农事类型","value":"cs农事类型","type":1},{"key":"操作时间","value":"2018-07-02","type":4},{"key":"投入品","value":"cs投入品","type":1},{"key":"投入设备","value":"cs投入设备","type":1},{"key":"农事内容","value":"cs农事内容","type":1},{"key":"负责人","value":"cs负责人","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/1530511231809c2a9c.png","type":1}]}]}},{"ZZ":{"generalEntityList":[{"key":"种植面积","value":"cs种植面积1234305 m","type":1},{"key":"种植批次号","value":"zz20180702001","type":1},{"key":"地块编号","value":"DK20180702001","type":1},{"key":"生产时间","value":"2018-07-02","type":4},{"key":"种植标准","value":"CS种植标准","type":1},{"key":"负责人","value":"cs负责人","type":1}],"insideResumeQuoteDtoList":[{"resumeCode":"LL-20180702-000004","resumeType":1,"resumeName":"铁棍山药1","resumeURL":""},{"resumeCode":"LL-20180702-000006","resumeType":1,"resumeName":"测试——产品名称","resumeURL":""}],"externalResumeQuoteDtoList":[]}},{"CS":{"generalEntityList":[{"key":"采收批次号","value":"CS20180702002","type":1},{"key":"种植批次号","value":"ZZ-20180702-000008","type":1},{"key":"采收数量","value":"cs采收数量","type":2},{"key":"采收时间","value":"2018-07-02","type":4},{"key":"采收方式","value":"cs采收方式","type":1},{"key":"负责人","value":"cs负责人","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/153051138563362999.png","type":1}],"insideResumeQuoteDtoList":[{"resumeCode":"LL-20180702-000006","resumeType":1,"resumeName":"测试——产品名称","resumeURL":""}],"externalResumeQuoteDtoList":[],"correspondingCode":"ZZ-20180702-000008"}},{"SJG":{"generalEntityList":[{"key":"加工批次号","value":"JG20180702003","type":1},{"key":"对应批次号","value":"CS-20180702-000007","type":1},{"key":"加工类型","value":"2","type":1},{"key":"加工数量","value":"CS加工数量","type":2},{"key":"加工工艺","value":"CS加工数量","type":1},{"key":"操作时间","value":"2018-07-02","type":4},{"key":"负责人","value":"CS负责人","type":1},{"key":"辅料信息","value":"CS辅料信息","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/1530511665038b70c0.png","type":1}],"insideResumeQuoteDtoList":[],"externalResumeQuoteDtoList":[],"correspondingCode":"CS-20180702-000007"}},{"BZ":{"generalEntityList":[{"key":"包装批次号","value":"BZ201807020006","type":1},{"key":"对应批次号","value":"SJG-20180702-000004","type":1},{"key":"包装方式","value":"cs.   包 装方. 式","type":1},{"key":"包装日期","value":"2018-07-02 14:09,2018-07-02 14:09","type":6},{"key":"包装数量","value":"cs包装数量","type":2},{"key":"负责人","value":"cs负责人","type":1},{"key":"包装规格","value":"cs包装规格","type":1},{"key":"图片","value":"http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180702/15305118258871e17b.png","type":1}],"insideResumeQuoteDtoList":[],"externalResumeQuoteDtoList":[],"correspondingCode":"SJG-20180702-000004"}}],"resumeTemplateDetailList":null}}';
					data = JSON.parse( data );
				}
				var data2 = null;
				if( params.templateCode ) {
					data2 = (datas[1] && datas[1].data) || null;
				}else {
					data2 = (datas[0] && datas[0].data.resumeTemplateDetailList) || null;
				}
				console.dir(data);
				console.dir(data2);
				if( !data || data.code != '0000' ) {
					that.loading.close();
					that.$router.push('/Unfind');
				}

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
											 // 构造质检信息 Tab
											 if(val2 == 'ZJ' && val3.key == '检测产品批次'){
												 val[val2][i]['activeName'] = getModuleType(val3.value);
											 }
											 // val3.key == 被删除数组 就删掉
											if( that.moduleDelete[val2] && that.moduleDelete[val2].includes(val3.key) ){
												val[val2][i][key].splice(j, 1);
												continue;
											}
											 //  key 或 value 为空 就删除这条记录
											 // TODO:
											 if( (val3.hasOwnProperty('key') && !val3.key) || (val3.hasOwnProperty('value') && !val3.value ) ){
												 val[val2][i][key].splice(j, 1);
												 continue;
											 }else if( val3.hasOwnProperty('key') && (val3.key.indexOf('时间') != -1 || val3.key.indexOf('日期') != -1 ) ){
												if ( val3.value.indexOf(',') != -1 ){
													val3.value = val3.value.split(',').join(' ~ ');
												}
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
									if( val2 == 'JB' &&  val3.key == '产品名称' ){
										that.name = val3.value || '';
									}
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
													}else if( val3.hasOwnProperty('key') && (val3.key.indexOf('时间') != -1 || val3.key.indexOf('日期') != -1 ) ){
														if ( val3.value.indexOf(',') != -1 ){
															val3.value = val3.value.split(',').join(' ~ ');
														}
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
													farm.generalEntityList.unshift({key:'IMG', value: imgsArr[z]});
												}
											}
										}
										continue;
									// 删除字段
									}else if( that.moduleDelete[val2] && that.moduleDelete[val2].includes(val3.key) ){
										val[val2][key].splice(j, 1);
										continue;
									// key 或 value 为空 就删除这条记录
									}else if( (val3.hasOwnProperty('key') && !val3.key) || (val3.hasOwnProperty('value') && !val3.value ) ){
										val[val2][key].splice(j, 1);
										continue;
									}else if( val3.hasOwnProperty('key') && (val3.key.indexOf('时间') != -1 || val3.key.indexOf('日期') != -1 ) ){
										if ( val3.value.indexOf(',') != -1 ){
											val3.value = val3.value.split(',').join(' ~ ');
										}
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
								if( key != 'fieldManageFarmingList' ) {
									for( let z = imgsArr.length - 1; z >= 0 ; z-- ){
										val[val2][key].unshift({key:'IMG', value: imgsArr[z]});
									}
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
				that.$router.push('/Unfind');
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
				document.documentElement.scrollTop = 0;
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
			//顶部浮窗点击
			offsetPosition(id, index) {
				this.isClick = true;
				this.active = id;
				var target = document.querySelector('#' + id);
				if( !target ||  !target.offsetTop ) return;
				let offsetT = target.offsetTop - 60;
				if(document.documentElement.scrollTop != offsetT) document.documentElement.scrollTop = offsetT;
				setTimeout( () => {
					this.isClick = false;
				}, 600)
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
								if( !topTarget ) return;
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
			}

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
			button.ellipsis {
				width: 100%;
			}
			button.ellipsis span {
				padding-left: .20rem;
				background-size: .16rem .18rem;
				height: .2rem;
				line-height: .19rem;
				font-size: .14rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width:100%;
				display: inline-block;
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