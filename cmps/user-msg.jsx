const { useState, useEffect, useRef } = React

import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeOutIdRef = useRef(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            if (timeOutIdRef.current) {
                clearTimeout(timeOutIdRef.current)
                timeOutIdRef.current = null
            }

            timeOutIdRef.current = setTimeout(closeMsg, 3000)
        })

        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }
    if (!msg) return <span></span>
    return <h3 className="user-msg">{msg}</h3>
}