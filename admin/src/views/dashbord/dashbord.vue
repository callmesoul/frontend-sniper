<template>
    <div class="dashboard">
        <div class="header flex">
            <div class="header-item">
                <div class="headline">项目</div>
                <div class="large">12</div>
            </div>
            <div class="header-item">
                <div class="headline">新错误</div>
                <div class="large">12</div>
            </div>
        </div>

        <div class="new-error-list">
            <div class="new-error-item">
                <div class="top flex">
                    <span class="title flex1">Permissions</span> <span class="time">2019-08-09</span>
                </div>
                <div class="cont flex">
                    <div class="play-video flex flex-align-center flex-pack-center">
                        <a>+</a>
                    </div>
                    <div class="msg">
                        <div class="msg-item flex flex-align-center">
                            <div class="key">所属项目：</div>
                            <div class="value flex1"></div>
                        </div>
                        <div class="msg-item flex flex-align-center">
                            <div class="key">页面地址：</div>
                            <div class="value flex1"></div>
                        </div>
                        <div class="msg-item flex flex-align-center">
                            <div class="key">所在行数：</div>
                            <div class="value flex1"></div>
                        </div>
                        <div class="msg-item flex flex-align-center">
                            <div class="key">所在列数：</div>
                            <div class="value flex1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped lang="scss" src="./dashbord.scss"></style>