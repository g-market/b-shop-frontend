import { instanceWithAuth as categories } from '@/api/index'

function fetchCategories() {
  return categories.get('/category-names')
}

export { fetchCategories }
