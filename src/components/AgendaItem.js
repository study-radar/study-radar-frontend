import React from 'react'

export default function AgendaItem(props) {
    // Props should have date_time
    // Props should have name
    return (
        <div>
            <p>{props.date_time}</p>
            <p>{props.name}</p>
        </div>
    )
}
