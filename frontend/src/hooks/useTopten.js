import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions.js'

const useTopten = () => {
  const topProductList = useSelector((state) => state.topProductList)
  //   const { loading, error, topProducts } = topProductList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  return topProductList
}

export default useTopten
