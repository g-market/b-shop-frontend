import { instance as images } from '@/api/index'

function uploadImage(formData) {
  return images.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export { uploadImage }
