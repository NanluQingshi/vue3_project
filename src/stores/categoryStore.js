/*
 * @Author: nlqs
 * @Date: 2024-04-07 12:35:24
 * @Description: 管理分类列表数据
 */
import { defineStore } from "pinia"
import { ref } from 'vue'
import { getCategoryListAPI } from '@/api/layout'

export const useCategoryStore = defineStore('category', () => {
  // state - 导航分类列表数据（包含商品）
  const categoryList = ref([])
  // actions - 获取分类列表函数
  const getCategoryList  = async () => {
    const { result } = await getCategoryListAPI()
    // console.log(result)
    categoryList.value = result
  }

  // 返回
  return {
    categoryList,
    getCategoryList
  }
})