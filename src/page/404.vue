<template>
  <div class="box">
    <img src="@/assets/images/404.png" alt="">
    <div class="landscape">
    </div>
  </div>
</template>
<style lang="scss">
  @function pxToRem($px) {
    @return $px/37.5px*1rem
  }
  .box{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right: 0;
    img{
      width:pxToRem(346px);
      height:pxToRem(326px);
      display: block;
      position: absolute;
      left:50%;
      top:50%;
      margin-left:pxToRem(-173px);
      margin-top:pxToRem(-163px);
    }
    /* 请将屏幕竖向浏览样式 */
    .landscape {
      display: none;
      height: 100%;
    }
    @media screen and (orientation: landscape){
      .landscape{
        width:100%;
        height:100%;
        display:block;
        background-color:#f5f5f5;
        position:absolute;
        top:0;
        left:0;
        z-index:999999;
      }
      .landscape .iphone{
        /*background-image:url(../../images/iphone.png);*/
        /*background-repeat:no-repeat;*/
        width:73px;
        height:109px;
        position:absolute;
        left:50%;
        top:50%;
        margin-top:-54px;
        margin-left:-36px;
        background-size:73px 109px;
        animation:zhuan 1.5s;
        -moz-animation:zhuan 1.5s;
        -webkit-animation:zhuan 1.5s;
        -o-animation:zhuan 1.5s;
        -webkit-animation-iteration-count:infinite;
        -webkit-animation-delay:0.3s
      }
      .landscape .iphone_text{
        width:100%;
        height:1rem;
        text-align:center;
        position:absolute;
        left:0;
        top:45%;
        /*margin-top:71px;*/
        color:#666;
        font-size:pxToRem(15px);
      }
      .content{
        display:none
      }
    }

    @-webkit-keyframes zhuan{
      0%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg);
      }

      50%{
        -webkit-transform:rotate(-90deg);
        transform:rotate(-90deg);
      }

      100%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg);
      }
    }
    @-moz-keyframes zhuan{
      0%{
        -moz-transform:rotate(0deg);
        transform:rotate(0deg);
      }

      50%{
        -moz-transform:rotate(-90deg);
        transform:rotate(-90deg);
      }

      100%{
        -moz-transform:rotate(0deg);
        transform:rotate(0deg);
      }
    }
    @-ms-keyframes zhuan{
      0%{
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
      }

      50%{
        -ms-transform:rotate(-90deg);
        transform:rotate(-90deg);
      }

      100%{
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
      }
    }
    @keyframes zhuan{
      0%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg);
      }

      50%{
        -webkit-transform:rotate(-90deg);
        transform:rotate(-90deg);
      }

      100%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg);
      }
    }
  }
</style>
<script>
export default {
  data () {
    return {
      //bg: {background: 'url(' + require('../../static/image/icon/icon_menu_bg.png') + ') repeat', backgroundSize: '100%'}
    }
  },
  mounted () {
    document.title = '履历溯源'
  }
}
</script>
