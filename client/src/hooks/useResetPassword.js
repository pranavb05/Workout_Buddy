import {useState} from "react"

export const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [success, setSuccess] = useState(null)

    const resetPassword = async (token, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, password})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            setSuccess(true)
        }
    }
    return {resetPassword, isLoading, error, success}
}