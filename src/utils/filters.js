// 필터 관련 함수가 존재하는 파일
export function formatDate(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : `0${month}`
  let day = date.getDate()
  day = day > 9 ? day : `0${day}`
  let hours = date.getHours()
  hours = hours > 9 ? hours : `0${hours}`
  const minutes = date.getMinutes()
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function formatSimpleDate(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : `0${month}`
  let day = date.getDate()
  day = day > 9 ? day : `0${day}`
  return `${year}-${month}-${day}`
}

export function formatCurrency(value) {
  return value.toLocaleString('ko-KR') + '원'
}

export function changeKoreanItemStatus(itemStatus) {
  switch (itemStatus) {
    case 'RESERVED':
      return '예약 상품'
    case 'PRIVATE':
      return '비공개'
  }
}

export function changeKoreanOrderStatus(orderStatus) {
  switch (orderStatus) {
    case 'ACCEPTED':
      return '신청'
    case 'COMPLETED':
      return '비공개'
    case 'CANCELLED':
      return '취소'
  }
}
