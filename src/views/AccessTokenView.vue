<template>
  <main>
    <div class="card m-4">
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
