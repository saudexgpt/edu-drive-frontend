<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">

    <div
      :class="classObj"
      class="vx-navbar-wrapper"
    >

      <vs-navbar
        :color="navbarColorLocal"
        :class="textColor"
        class="vx-navbar navbar-custom navbar-skelton"
      >

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <!-- <search-bar /> -->
        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->

        <vs-spacer />

        <!-- <i18n /> -->

        <cart-drop-down />

        <notification-drop-down />

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>

<script>
// import Bookmarks from './components/Bookmarks.vue'
// import I18n from './components/I18n.vue'
// import SearchBar from './components/SearchBar.vue'
import CartDropDown from './components/CartDropDown.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'

export default {
  name: 'TheNavbarVertical',
  components: {
    // Bookmarks,
    // I18n,
    // SearchBar,
    CartDropDown,
    NotificationDropDown,
    ProfileDropDown,
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff',
    },
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return { 'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark') }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    // eslint-disable-next-line vue/return-in-computed-property
    classObj() {
      if (this.verticalNavMenuWidth === 'default') {
        return 'navbar-default'
      } if (this.verticalNavMenuWidth === 'reduced') {
        return 'navbar-reduced'
      } if (this.verticalNavMenuWidth) {
        return 'navbar-full'
      }
      return 'navbar-default'
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    },
  },
}
</script>
