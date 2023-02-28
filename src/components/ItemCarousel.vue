<template>
  <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(itemImage, index) in item.itemImageDtoList"
        :key="index"
        type="button"
        data-bs-target="#myCarousel"
        :data-bs-slide-to="index"
        :class="{ active: isFirst(index) }"
      />
    </div>
    <div class="carousel-inner">
      <div
        v-for="(itemImage, index) in item.itemImageDtoList"
        :key="itemImage.id"
        :class="isFirst(index) ? 'carousel-item active' : 'carousel-item'"
      >
        <img
          :src="itemImage.url"
          class="img-fluid item-image"
          alt="아이템 이미지"
          loading="lazy"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="prev"
    >
      <span
        class="carousel-control-prev-icon prev-next"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden text-black">Next</span>
    </button>
  </div>
</template>

<script>
import 'bootstrap'
import { mapState } from 'vuex'

export default {
  name: 'ItemCarousel',
  computed: {
    ...mapState('item', ['item']),
  },
  methods: {
    isFirst(index) {
      if (index === 0) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
button {
  color: $primary-btn;
}

.item-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid rgb(207, 207, 207);
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
