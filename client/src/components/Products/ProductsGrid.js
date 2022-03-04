import { Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'
import Masonry from 'react-masonry-css'


const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
};


const ProductsGrid = ({ products }) => {

    return (
        <>

            <Grid padding={2} container spacing={3}>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {
                        products.map(product => {
                            return (
                                <ProductCard product={product} key={product._id} />
                            )
                        })
                    }
                </Masonry>
            </Grid>
        </>
    )
}

export default ProductsGrid
