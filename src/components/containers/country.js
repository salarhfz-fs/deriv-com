import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { isEuCountry } from 'common/country-base'
import { BinarySocketBase } from 'common/websocket/socket_base'

const handleEu = (setVisible, to) => is_eu_country => {
    switch (to) {
        case 'eu':
            setVisible(is_eu_country)
            break
        case 'non-eu':
            setVisible(!is_eu_country)
            break
        default:
            break
    }
}

const Country = ({ children, to }) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (!to) return

        const clients_country = Cookies.get('clients_country')
        const showEu = handleEu(setVisible, to)
        if (clients_country) {
            showEu(isEuCountry(clients_country))
        } else {
            BinarySocketBase.wait('website_status').then(response => {
                showEu(isEuCountry(response.website_status.clients_country))

                /* country_code cookies will be valid for 1 month */
                Cookies.set(
                    'clients_country',
                    response.website_status.clients_country,
                    { expires: 30 },
                )
            })
        }
    })
    return visible ? <>{children}</> : null
}

Country.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    to: PropTypes.oneOf(['eu', 'non-eu']),
}

export default Country
