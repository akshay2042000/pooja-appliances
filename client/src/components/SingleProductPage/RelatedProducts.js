import { Box, Typography } from '@mui/material'
import React from 'react'
import ProductsGrid from '../Products/ProductsGrid'
import ProductsSkeleton from '../Skeletons/ProductsSkeleton'

const RelatedProducts = ({ products }) => {
    return (
        <div>
            {
                !products ?
                    (<ProductsSkeleton products={4} />)
                    :
                    (<Box sx={{ py: 8, px: 0 }}>
                        <Typography mb={2} textAlign='center' variant="h2" fontWeight='bold' color="initial">Related Products</Typography>
                        <Box sx={{ py: 4 }}>
                            <ProductsGrid products={products} />
                        </Box>


                    </Box>)
            }


        </div >
    )
}

export default RelatedProducts
