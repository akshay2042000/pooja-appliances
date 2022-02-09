import { Box, Typography } from '@mui/material'
import React from 'react'
import ProductsGrid from './ProductsGrid'
import LoadingComponent from './Skeletons/LoadingComponent'

const RelatedProducts = ({ products }) => {
    return (
        <div>
            {
                !products ?
                    (<LoadingComponent />)
                    :
                    (<Box sx={{ py: 8, px: 5 }}>
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
