import React from 'react'
import Typography from '@mui/material/Typography'


const FooterLogoComponent = ({ appliances }) => {
    return (
        <>
            {
                appliances === 'creative' ?
                    (
                        <>
                            <Typography variant='h5' mb={3}>Creative Appliances</Typography>
                            <Typography variant="body1" mb={3}>Dealing in wide range of varities in kitchen and home appliances.
                                All the products are available for bulk orders only. Authorized distributors to various brands such as Varmora, Pearlpet, Sunflame, Plata, Signoraware, etc.
                                Winning hearts of our retailers since 2005.</Typography>
                            <Typography variant="caption" >© 2022 Creative Appliances  All Rights Reserved</Typography>
                        </>

                    )
                    :
                    (
                        <>
                            <Typography variant='h5' mb={3}>Pooja Appliances</Typography>
                            <Typography variant="body1" mb={3}>Dealing in wide range of varities in kitchen and home appliances.
                                All the products are available for bulk orders only. Authorized distributors to various brands such as Varmora, Pearlpet, Sunflame, Plata, Signoraware, etc.
                                Winning hearts of our retailers since 2005.</Typography>
                            <Typography variant="caption" >© 2022 Pooja Appliances  All Rights Reserved</Typography>
                        </>

                    )
            }
        </>
    )
}

export default FooterLogoComponent

