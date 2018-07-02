<template>
  <div class="box">
    <img src="@/assets/images/404.png" alt="">
    <div class="landscape">
    </div>
  </div>
</template>
<style lang="scss">
  .box{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right: 0;
    img{
      width:3.46rem;
      display: block;
      margin: 0 auto;
    }
  }
</style>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    document.title = '履历溯源'
  }
}
</script>
