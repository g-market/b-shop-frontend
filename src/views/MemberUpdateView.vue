<template>
  <main aria-label="내 정보 수정 페이지" class="container">
    <div class="title">
      <h3>회원 정보 수정</h3>
    </div>
    <div class="member-info">
      <div class="member-box">
        <form @submit.prevent="submitForm">
          <div class="form-wrapper">
            <table aria-label="회원 정보">
              <colgroup>
                <col style="width: 20px" />
                <col style="width: 180px" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th><mdicon name="account" class="icon" /></th>
                  <th>이름</th>
                  <td>
                    <p>{{ member.name }}</p>
                  </td>
                </tr>
                <tr>
                  <th><mdicon name="email-multiple-outline" class="icon" /></th>
                  <th>이메일</th>
                  <td>
                    <p>{{ member.email }}</p>
                  </td>
                </tr>
                <tr>
                  <th><mdicon name="cellphone-sound" class="icon" /></th>
                  <th><label for="cellPhone">휴대전화</label></th>
                  <td>
                    <input
                      id="cellPhone"
                      type="text"
                      name="cell"
                      v-model="phoneNumber"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btn-left">
              <button type="submit" class="btn btn-primary">저장</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MemberUpdateView',
  data() {
    return {
      phoneNumber: '',
    }
  },
  computed: {
    ...mapState('member', ['member']),
  },
  created() {
    this.phoneNumber = this.member.phoneNumber
  },
  methods: {
    async submitForm() {
      const data = {
        phoneNumber: this.phoneNumber,
      }
      await this.$store.dispatch('member/UPDATE_MEMBER', data)
      alert('회원정보가 변경되었습니다.')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px 25px 0 23px;
  min-width: 733px;
  height: 40px;
  border-bottom: 1px solid #f2f4f3;
  margin-top: 3rem;
  h3 {
    font-size: 22px;
  }
}

.member-info {
  margin-top: 3rem;
}

.member-box {
  min-height: 400px;
  min-width: 500px;
  width: 100%;
  .form-wrapper {
    padding: 30px 25px 0;
    table {
      width: 100%;
      border-collapse: collapse;
      colgroup {
        display: table-column-group;
      }
      col {
        display: table-column;
      }
      tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
        th {
          padding-top: 10px;
          text-align: left;
          vertical-align: top;
          font-weight: 400;
        }
        tr {
          display: table-row;
          vertical-align: inherit;
          border-color: inherit;
          td {
            height: 30px;
            padding: 10px 0;
            vertical-align: top;
          }
        }
      }
    }
  }
}
.btn-left {
  width: 100%;
  padding: 50px 0px;
  text-align: left;
}

.icon {
  margin-right: 15px;
}
td input {
  font-size: 0.8rem;
  display: block;
  width: 30%;
  height: 1.5rem;
  padding: 15px 0px;
}
</style>
