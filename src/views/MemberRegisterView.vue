<template>
  <main aria-label="회원가입 페이지" class="container-xl px-5 mt-4">
    <h1 class="h3 mb-4 text-muted">회원가입</h1>

    <div class="row">
      <div class="col-4">
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">프로필 사진</div>
          <div class="card-body text-center member-image position-relative">
            <img
              class="img-account-profile rounded-circle mb-2"
              :src="this.profileImageUrl"
              alt=""
            />
            <div class="new-profile d-flex align-items-center mt-5 w-auto">
              <label class="custom-file-label" for="customFile"
                ><mdicon name="face-man-profile" class="d-flex" />
              </label>
              <input
                class="ms-3 form-control"
                id="customFile"
                accept="image/*"
                ref="profileRef"
                type="file"
                @change="handleProfileChange"
              />
            </div>
            <div class="small font-italic text-muted mt-2 mb-4">
              이미지 최대 크기 2 MB
            </div>
            <div
              class="btn btn-secondary btn-sm"
              @click="handleDefaultProfileImage"
            >
              기본 이미지로 변경
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">사용자 정보</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <!-- Form Group (username)-->
              <div class="mb-3 d-flex align-items-center">
                <label class="small me-4" for="inputUsername"
                  ><mdicon name="account" class="d-flex"
                /></label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter your username"
                  :value="member.name"
                  disabled
                />
              </div>
              <div class="mb-3 d-flex align-items-center">
                <label class="small me-4" for="inputUsername"
                  ><mdicon name="email-multiple-outline" class="d-flex"
                /></label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter your username"
                  :value="member.email"
                  disabled
                />
              </div>
              <div class="mb-3 d-flex align-items-center">
                <label class="small me-4" for="inputUsername"
                  ><mdicon name="cellphone-sound" class="d-flex"
                /></label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="휴대전화번호를 기입해주세요."
                  v-model="this.phoneNumber"
                  @input="checkPhoneNumber($event)"
                  ref="phoneNumberInput"
                />
                <div
                  id="validationServer03Feedback"
                  class="ms-2 invalid-feedback"
                >
                  올바른 휴대전화번호가 아닙니다. (010XXXXXXXX)
                </div>
              </div>
              <div class="d-grid d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="submit">회원가입</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MemberRegisterView',
  data() {
    return {
      phoneNumber: '',
      profileImageUrl: '',
      phoneRule: /^010(\d){4}(\d){4}$/,
    }
  },
  computed: {
    ...mapState('member', ['member']),
  },
  created() {
    this.phoneNumber = this.member.phoneNumber
    this.profileImageUrl = this.member.profileImageUrl
  },
  methods: {
    async submitForm() {
      if (!this.phoneRule.test(this.phoneNumber)) {
        alert('휴대전화 번호를 올바르게 기입해주세요.')
        return
      }
      const data = {
        phoneNumber: this.phoneNumber,
        profileImageUrl: this.profileImageUrl,
      }
      await this.$store.dispatch('member/UPDATE_MEMBER', data)
      alert('회원가입이 성공적으로 진행되었습니다.')
      this.$router.push('/')
    },
    async handleProfileChange(event) {
      this.fileName = event.target.files[0].name
      const formData = new FormData()
      for (const file of event.target.files) {
        formData.append('fileList', file)
      }
      console.log(event.target.files[0])
      const data = await this.$store.dispatch(
        'member/UPDATE_PROFILE_IMAGE_URL',
        formData,
      )
      this.profileImageUrl = data[0].url
    },
    handleDefaultProfileImage() {
      this.$store.commit(
        'member/setProfileImageUrl',
        import.meta.env.VITE_PROFILE_IMAGE_URL,
      )
      this.profileImageUrl = import.meta.env.VITE_PROFILE_IMAGE_URL
      this.$refs.profileRef.value = ''
    },
    checkPhoneNumber($event) {
      const isValid = this.phoneRule.test(this.phoneNumber)
      if (isValid) {
        $event.target.classList.remove('is-invalid')
        $event.target.classList.add('is-valid')
        return
      }
      $event.target.classList.remove('is-valid')
      $event.target.classList.add('is-invalid')
    },
  },
}
</script>

<style lang="scss" scoped>
.member-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid rgb(207, 207, 207);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50%;
    height: 50%;
    object-fit: contain;
  }
}
</style>
