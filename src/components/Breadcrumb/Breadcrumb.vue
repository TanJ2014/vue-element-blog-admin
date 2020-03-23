<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadList" :key="index" :to="{path:item.path}">
      {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {
        breadList: [] // 路由集合
      };
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    methods: {
      isHome(route) {
        return route.name === "homepage";
      },
      getBreadcrumb() {
        let matched = this.$route.matched;
        //如果不是首页
        if (!this.isHome(matched[0])) {
          matched = [{ path: "/homepage", meta: { title: "首页" } }].concat(matched);
        }
        this.breadList = matched;
      }
    },
    created() {
      this.getBreadcrumb();
    }
  };
</script>

<style>
.breadcrumb{
  padding: 15px 0;
}
</style>
