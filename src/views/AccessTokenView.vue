<template>
  <main>
    <div class="card">
      {{ token }}
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('member', ['token']),
  },
}
</script>
