<template>
  <div id="app">
    <div id="nav">
      <router-view/>
    </div>
  </div>
</template>

<style>
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Monaco, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* 字体自定义修改 */
.el-input__inner,.el-select-dropdown {
  font-family: Monaco, Avenir, Helvetica, Arial, sans-serif;
}
</style>
