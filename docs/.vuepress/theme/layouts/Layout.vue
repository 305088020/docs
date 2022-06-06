<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Sidebar from "../components/Sidebar.vue";
import Page from "../components/Page.vue";
</script>

<template>
    <div class="container is-fullhd">
        <div class="header">
            <Header />
        </div>
        <div class="sidebar">
            <Sidebar />
        </div>
        <div class="main">
            <img src="https://random.imagecdn.app/1600/300">
            <Page />
        </div>
    </div>
</template>

<style lang="scss">
.main {
    padding-top: var(--navbar-height);
    padding-left: var(--sidebar-width);
}
.sidebar{
    background-color: #fff;
    font-size: 16px;
    width: var(--sidebar-width);
    position: fixed;
    z-index: 10;
    margin: 0;
    top: var(--navbar-height);
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
}
</style>