<template>
  <cv-header aria-label="Carbon header">
    <cv-header-name href="javascript:void(0)" style="font-size:18px;" prefix="Path Finder">[Admin]</cv-header-name>
    <template slot="header-global">
      <!-- 留言通知 -->
      <cv-header-global-action aria-label="Notifications" aria-controls="notifications-panel">
        <Notification20 />
      </cv-header-global-action>

      <cv-header-panel id="notifications-panel">
        <cv-switcher>
          <cv-switcher-item>
            <!-- <cv-switcher-item-link href="javascript:void(0)">Jump user page</cv-switcher-item-link> -->
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>

      <!-- 用户头像 -->
      <!-- <cv-header-global-action aria-label="User avatar" aria-controls>
        <UserAvatar20 />
      </cv-header-global-action>-->

      <!-- 菜单 -->
      <cv-header-global-action aria-label="App switcher" aria-controls="switcher-panel">
        <AppSwitcher20 />
      </cv-header-global-action>
    </template>

    <cv-header-panel id="switcher-panel">
      <cv-switcher>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">Jump Home Page</cv-switcher-item-link>
          <cv-switcher-item-link href="javascript:void(0)">Logout</cv-switcher-item-link>
        </cv-switcher-item>
      </cv-switcher>
    </cv-header-panel>
  </cv-header>
  
</template>

<script>
import Notification20 from "@carbon/icons-vue/es/notification/20";
import UserAvatar20 from "@carbon/icons-vue/es/user--avatar/20";
import AppSwitcher20 from "@carbon/icons-vue/es/app-switcher/20";
export default {
  components: {
    UserAvatar20,
    AppSwitcher20,
    Notification20
  }
};
</script>

<style scoped>

</style>




