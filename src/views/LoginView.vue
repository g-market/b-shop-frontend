<template>
  <img
    src="https://play-lh.googleusercontent.com/vtlk86Aif2oq7KVaxGRqlYnbku90pfXAHv8xXR-WIrfvVrOfhJSJwVbzB3kxMIyYmgyl=s48-rw"
    @click="gitHubLogin"
  />
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {}
  },
  methods: {
    gitHubLogin: function () {
      window.location.href =
        'https://api.hiworks.com/open/auth/authform?client_id=g9weeb6q1rsgirhtgcxsmyj4wt7ktcer6045c8d8d357e7.34276869.open.apps&access_type=offline'
    }
  }
}
</script>

<style lang="scss"></style>
