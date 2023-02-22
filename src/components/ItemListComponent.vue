<template>
  <section :aria-label="name">
    <div role="feed" aria-busy="true">
      <ul>
        <li>
          <a rel="noopener noreferrer" href="/products/54" target="_blank">
            <div class="item">
              <div class="item-image">
                <img
                  src="https://gabiaoffice.hiworks.com/gabia.com/common/profile/me"
                  alt
                  loading="lazy"
                />
              </div>
              <p class="item-title">아이템 타이틀</p>
              <div class="item-sale-info">
                <div aria-hidden="true" class="item-buy">
                  <div aria-hidden="true" class="item-buy__icon">
                    <mdicon name="heart" />
                  </div>
                  <div class="item-buy__count">14</div>
                </div>
                <div aria-hidden="true" class="item-price">
                  <div aria-hidden="true" class="item-price__icon">
                    <mdicon name="currency-krw" />
                  </div>
                  <div class="item-price__count">12000</div>
                </div>
              </div>
            </div>
          </a>
        </li>

        <li>
          <a rel="noopener noreferrer" href="/products/54" target="_blank">
            <div class="item">
              <div class="item-image">
                <img
                  src="https://gabiaoffice.hiworks.com/gabia.com/common/profile/me"
                  alt
                  loading="lazy"
                />
              </div>
              <p class="item-title">아이템 타이틀</p>
              <div class="item-sale-info">
                <div aria-hidden="true" class="item-buy">
                  <div aria-hidden="true" class="item-buy__icon">
                    <mdicon name="heart" />
                  </div>
                  <div class="item-buy__count">17</div>
                </div>
                <div aria-hidden="true" class="item-price">
                  <div aria-hidden="true" class="item-price__icon">
                    <mdicon name="currency-krw" />
                  </div>
                  <div class="item-price__count">12000</div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ItemListComponent',
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    margin: 0px auto;
    width: 100%;
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      li {
        width: max-content;
        margin: 0px auto;
        a {
          &:hover {
            text-decoration: underline;
          }
          .item {
            display: flex;
            flex-direction: column;
            -webkit-box-pack: justify;
            justify-content: space-between;
            gap: 1rem;
            border-radius: 0.375rem;
            padding: 1rem;
            min-width: 13rem;
            width: 19rem;
            animation: 500ms ease 0s 1 normal none running fade-in-0;
            .item-image {
              width: 100%;
              aspect-ratio: 1 / 1;
              overflow: hidden;
              border: 1px solid rgb(207, 207, 207);
              background-color: rgb(255, 255, 255);
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
            .item-title {
              line-height: 1.3;
              font-weight: 500;
              font-size: 1rem;
            }
            .item-sale-info {
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              .item-buy {
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                .item-buy__icon {
                  width: 14px;
                  height: 14px;
                  margin-right: 0.5rem;
                  display: flex;
                  align-items: center;
                  color: rgb(246, 190, 190);
                }
                .item-buy-count {
                  font-size: 16px;
                }
              }
              .item-price {
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                gap: 0.5rem;
                .item-price__icon {
                  width: 14px;
                  height: 14px;
                  margin-right: 0.5rem;
                  display: flex;
                  align-items: center;
                  color: $gray-400;
                }
                .item-price__count {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
