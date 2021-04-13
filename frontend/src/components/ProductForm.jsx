import React, { useState } from 'react'
import {Button,Form} from 'react-bootstrap'
import Counter from './Counter'



const ProductForm = ({ addToCartHandler, product }) => {
    const [qty, setQty] = useState(1)
    const [vegan, setVegan] = useState(false)
    const [gfree, setGfree] = useState(false)
    const [request, setRequest] = useState('')

    // const dispatch = useDispatch()

    

    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    
    
   
    return (
        <>
            <Form>
                    <Form.Group className='mb-1'>
                      <Form.Label>Quantity: </Form.Label>
                      <Counter
                        min='1'
                        max={product.category === 'Cake' ? '6' : '24'}
                        handleQuantity={(nbr) => setQty(nbr)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-1'>
                      {product.veganOpt && (
                        <div className='d-inline-block mr-3'>
                          <label>Vegan:</label>
                          <input
                            className='mx-2'
                            type='checkbox'
                            value={vegan}
                            onChange={() => setVegan(!vegan)}
                          ></input>
                        </div>
                      )}
                      {product.glutenFreeOpt && (
                        <div className='d-inline-block mr-3'>
                          <label>Gluten Free:</label>
                          <input
                            className='mx-2'
                            type='checkbox'
                            value={gfree}
                            onChange={() => setGfree(!gfree)}
                          ></input>
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className='mb-1'>
                      <Form.Label>Special requests:</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                
                <div className='product-price'>
                  <h3 className='text-right'>
                    Price:
                    <strong> {qty * product.price} ILS </strong>
                  </h3>
                  <Button
                    onClick={()=>addToCartHandler(qty, vegan, gfree)}
                    className='btn float-right'
                    type='button'
                    disabled={!product.inStock}
                  >
                    Add To Cart
                  </Button>
                </div>
        </>
    )
}

export default ProductForm
