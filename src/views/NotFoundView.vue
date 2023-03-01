<template>
  <main class="container">
    <div class="container-fluid">
      <!-- 404 Error Text -->
      <div class="text-center position-relative">
        <div class="error mx-auto" data-text="404">404</div>
        <p class="lead text-gray-800 mb-5">Page Not Found</p>
        <p class="text-gray-500 mb-0">
          유효하지 않는 경로로 접근하였습니다 ...
        </p>
        <RouterLink to="/" class="text-primary">← 홈화면으로 이동</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error {
  color: #5a5c69;
  font-size: 7rem;
  position: relative;
  line-height: 1;
  width: 12.5rem;
  &:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 #e74a3b;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear alternate-reverse;
  }
  &:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 #4e73df;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }
}
</style>
